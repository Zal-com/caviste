/**
 * It takes the form data, sends it to the API, and then updates the page with the new comment
 * @param form - the form that was submitted
 * @param event - the event that triggered the function
 */
function addComment(form, event)
{
    event.preventDefault();

    let credentials = getCookie('username') + ':123';
    const formData = new FormData(form);
    let content = formData.get('comment')

    const options = {
        'method': 'POST',
        'body': JSON.stringify({"content": content }),
        'mode': 'cors',
        'headers': {
            'content-type': 'application/json; charset=utf-8',
            'Authorization': 'Basic ' + btoa(credentials)
        }
    }

    let wineId = $('#comment-wine-id').text();

    fetch(apiURL + 'wines/' + wineId + '/comments', options)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data){
                    getWineData(wineId);
                    $('.popup').css("display", "none");
                });
            } else {
                console.log('API error !');
            }
        });
}

/**
 * It fetches the comments of a wine, then displays them in the comments tab
 * @param id - the id of the wine
 */
function getWineComments(id)
{
    fetch(apiURL + 'wines/' + id + '/comments')
        .then(response => response.json())
        .then(json => {
            let commentsHTML = '<button class="btn btn-dark" id="addComment">Ajouter commentaire</button><span class="ml-form-el">Pour modifier ou supprimer un ancien commentaire il vous suffit de cliquer deux fois dessus</span><hr>';
            for (const comment of json) {
                commentsHTML += `<p class="editable`;
                if (getCookie('userid') && getCookie('userid') === comment.user_id) {
                    commentsHTML += ` myComment`;
                }
                commentsHTML += `"`;
                commentsHTML +=  ` data-comment-id="${comment.id}" data-user-id="${comment.user_id}" data-wine-id="${comment.wine_id}">${comment.content}</p><hr>`
            }
            /*
            if(json === '' ){
                commentsHTML = '<p class="no-comment">Pas de commentaires</p>'
            }
            */
            $('#tabs-2').html(commentsHTML);

            let editables = document.querySelectorAll('.editable');

            transformCommentToEdit(editables);

            popupDisplayer(document.getElementById('addComment'), document.getElementById('commentContainer'), document.getElementById('commentCross'));
        })
}

/**
 * It transforms a comment into an editable form when double clicked
 * @param editables - the comments that can be edited
 */
function transformCommentToEdit(editables)
{
    let save, cancel, destroy;
    editables.forEach(comment => {
        comment.addEventListener('dblclick', () => {
            if (!isEditingComment) {
                let $comment = $(comment);
                let $commentStartingValue = $comment.text();
                let $commentId = $comment.attr('data-comment-id')
                let $commentUserId = $comment.attr('data-user-id')
                let $commentWineId = $comment.attr('data-wine-id')
                if ($commentUserId === getCookie('userid')) { // checks if it's our comment
                    isEditingComment = true;
                    $comment.html(
                            `<form id="editCommentForm" action="#" method="post">
                                    <textarea name="editedComment" id="editedComment">${$commentStartingValue}</textarea>
                                    <button type="button" id="saveCommentEdit" class="btn btn-dark">Enregistrer modification</button>
                                    <button type="button" class="btn btn-light" id="cancelCommentEdit">Annuler modification</button>
                                    <button type="button" id="deleteComment" class="btn btn-danger">Supprimer</button>
                                    </form>                             
                            `);
                    save = document.getElementById('saveCommentEdit');
                    cancel = document.getElementById('cancelCommentEdit');
                    destroy = document.getElementById('deleteComment');
                    // listen to save
                    save.addEventListener('click', () => {
                        editComments(document.getElementById('editCommentForm'), $commentId, $commentWineId);
                    });
                    // listen to cancel
                    cancel.addEventListener('click', () => {
                        resetCommentAppearance($comment, $commentStartingValue, $commentId, $commentWineId, $commentUserId);
                    });
                    // listen to delete
                    destroy.addEventListener('click', () => {
                        deleteComment($commentId, $commentWineId);
                    });
                }
            }
        });
    })
}

/**
 * It takes the form, the comment id and the wine id, gets the content of the comment, sends a PUT request to the API with
 * the new content and then calls the getWineData function to refresh the page
 * @param form - the form that contains the comment to be edited
 * @param $commentId - the id of the comment to be edited
 * @param $commentWineId - the id of the wine the comment is attached to
 */
function editComments(form, $commentId, $commentWineId)
{
    isEditingComment = false;

    let credentials = getCookie('username') + ':123';
    const formData = new FormData(form);
    let content = formData.get('editedComment')

    const options = {
        'method': 'PUT',
        'body': JSON.stringify({"content": content }),
        'mode': 'cors',
        'headers': {
            'content-type': 'application/json; charset=utf-8',
            'Authorization': 'Basic ' + btoa(credentials)
        }
    }
    fetch(apiURL + 'wines/' + $commentWineId + '/comments/' + $commentId, options)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data){
                    getWineData($commentWineId);
                });
            } else {
                console.log('API error !');
            }
        });
}

/**
 * It deletes a comment from the database
 * @param $commentId - the id of the comment to be deleted
 * @param $commentWineId - the id of the wine that the comment belongs to
 */
function deleteComment($commentId, $commentWineId)
{
    isEditingComment = false;

    let credentials = getCookie('username') + ':123';

    const options = {
        'method': 'DELETE',
        'mode': 'cors',
        'headers': {
            'Authorization': 'Basic ' + btoa(credentials)
        }
    }

    fetch(apiURL + 'wines/' + $commentWineId + '/comments/' + $commentId, options)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data){
                    getWineData($commentWineId);
                });
            } else {
                console.log('API error !');
            }
        });

}

/**
 * This function resets the appearance of a comment to its original state.
 * @param $comment - the comment element that is being edited
 * @param $commentStartingValue - The original value of the comment before it was edited.
 * @param $commentId - The id of the comment that is being edited
 * @param $commentUserId - The user id of the user who wrote the comment
 * @param $commentWineId - The id of the wine that the comment is for
 */
function resetCommentAppearance($comment, $commentStartingValue, $commentId, $commentUserId, $commentWineId)
{
    isEditingComment = false;
    $comment.html(`<p class="editable" data-comment-id="${$commentId}" data-user-id="${$commentUserId}" data-wine-id="${$commentWineId}">${$commentStartingValue}</p>`)
}