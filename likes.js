function addLike(wineId, username){

    let isLikingWine = true;
    if (winesLiked.includes(wineId)) {
        isLikingWine = false;
    }

    const credentials = username + ':123';
    const options = {
        'method': 'PUT',
        'body': JSON.stringify({ "like" : isLikingWine }),	//Try with true or false
        'mode': 'cors',
        'headers': {
            'content-type': 'application/json; charset=utf-8',
            'Authorization': 'Basic '+btoa(credentials)	//FIXME
        }
    };

    const fetchURL = 'wines/'+wineId+'/like';

    fetch(apiURL + fetchURL, options).then(function(response) {
        if(response.ok) {
            response.json().then(function(data){
                isLikingWine ? likeWine(wineId) : dislikeWine(wineId);
                resetLikes();
                getUserLikes(getCookie('userid'));
            });
        }
    });
}

function getUserLikes(userId){

    fetch(apiURL + 'users/' + userId + '/likes/wines')
        .then(response => response.json())
        .then(data => {
            for (const wine of data){
                winesLiked.push(wine.id);
            }
        });
}

function resetLikes()
{
    winesLiked = [];
}

function likeWine(wineId)
{
    winesLiked.push(wineId);
    $('#likes i').removeClass('fa-heart-o');
    $('#likes i').addClass('fa-heart');

    $('#likes i').text(' ' + (parseInt($('#likes i').text()) + 1))
}

function dislikeWine(wineId)
{
    for (let i = 0; i < winesLiked.length; i++) {
        if (winesLiked[i] === wineId) winesLiked.splice(i);
    }

    $('#likes i').removeClass('fa-heart');
    $('#likes i').addClass('fa-heart-o');
    $('#likes i').text(' ' + (parseInt($('#likes i').text()) - 1))
}

function displayLikes(id)
{
    fetch(apiURL + 'wines/' + id + '/likes-count')
        .then(response => response.json())
        .then(json => {
            if (winesLiked.includes(id)) {
                $('#likes').html('<i class="fa fa-heart"> ' + json.total);
            } else {
                $('#likes').html('<i class="fa fa-heart-o"> ' + json.total);
            }
        })
}