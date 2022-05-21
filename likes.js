/**
 * It takes a wineId and a username, and if the user is liking the wine, it sends a PUT request to the API with the body {
 * "like" : true }. If the user is disliking the wine, it sends a PUT request with the body { "like" : false }
 * @param wineId - The id of the wine you want to like/dislike
 * @param username - The username of the user who is liking the wine.
 */
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

/**
 * It takes a userId as an argument, and then uses the fetch API to make a GET request to the API endpoint that returns all
 * the wines that the user has liked. It then loops through the response and pushes each wine's id to the winesLiked array
 * @param userId - the id of the user
 */
function getUserLikes(userId){

    fetch(apiURL + 'users/' + userId + '/likes/wines')
        .then(response => response.json())
        .then(data => {
            for (const wine of data){
                winesLiked.push(wine.id);
            }
        });
}

/**
 * The function `resetLikes()` resets the `winesLiked` array to an empty array.
 */
function resetLikes()
{
    winesLiked = [];
}

/**
 * When the user clicks the heart icon, add the wine ID to the winesLiked array and update the heart icon to show that the
 * user has liked the wine.
 * @param wineId - The id of the wine that was liked.
 */
function likeWine(wineId)
{
    winesLiked.push(wineId);
    $('#likes i').removeClass('fa-heart-o');
    $('#likes i').addClass('fa-heart');

    $('#likes i').text(' ' + (parseInt($('#likes i').text()) + 1))
}

/**
 * It removes the wine from the list of liked wines and updates the UI
 * @param wineId - The id of the wine you want to like/dislike
 */
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