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

function getWineComments(id)
{
    fetch(apiURL + 'wines/' + id + '/comments')
        .then(response => response.json())
        .then(json => {
            let commentsHTML = '<button class="btn btn-dark" id="addComment">Ajouter commentaire</button><span class="ml-form-el">Pour modifier ou supprimer un ancien commentaire il vous suffit de cliquer deux fois dessus</span><hr>';
            for (const comment of json) {
                commentsHTML += `<p class="editable" data-comment-id="${comment.id}" data-user-id="${comment.user_id}" data-wine-id="${comment.wine_id}">${comment.content}</p><hr>`
            }
            if(commentsHTML === ''){
                commentsHTML = '<p class="no-comment">Pas de commentaires</p>'
            }
            $('#tabs-2').html(commentsHTML);

            let editables = document.querySelectorAll('.editable');
            // double click to modify
            transformCommentToEdit(editables);
            // open comment box listener
            popupDisplayer(document.getElementById('addComment'), document.getElementById('commentContainer'), document.getElementById('commentCross'));
        })
}

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

function resetCommentAppearance($comment, $commentStartingValue, $commentId, $commentUserId, $commentWineId)
{
    isEditingComment = false;
    $comment.html(`<p class="editable" data-comment-id="${$commentId}" data-user-id="${$commentUserId}" data-wine-id="${$commentWineId}">${$commentStartingValue}</p>`)
}