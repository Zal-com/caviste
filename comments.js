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

function deleteComment(userId, wineId, commentId)
{
    // faut trouver le moyen de get le commentId
}

function getWineComments(id)
{
    fetch(apiURL + 'wines/' + id + '/comments')
        .then(response => response.json())
        .then(json => {
            let commentsHTML = '<button class="btn btn-dark" id="addComment">Ajouter commentaire</button><hr>';
            for (const comment of json) {
                commentsHTML += `<p>${comment.content}</p><hr>`
            }
            if(commentsHTML === ''){
                commentsHTML = '<p class="no-comment">Pas de commentaires</p>'
            }
            $('#tabs-2').html(commentsHTML);

            popupDisplayer(document.getElementById('addComment'), document.getElementById('commentContainer'), document.getElementById('commentCross'));
        })
}