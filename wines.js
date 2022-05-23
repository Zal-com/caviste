/**
 * It fetches the wines from the API, stores them in the session storage, and then displays them
 * @param hasToDisplay - a boolean that indicates whether the wines should be displayed or not.
 */
function getWines(hasToDisplay)
{
    fetch(apiURL + 'wines')
        .then(response => response.json())
        .then(json => {
            for (const wine of json) {
                sessionStorage.setItem(wine.id, JSON.stringify(wine))
            }
            if (hasToDisplay) displayAllWines();

            getCountries();
        });
}


/* Displaying the data of the wine with the given id. */
function getWineData(id) {

    let wine = JSON.parse(sessionStorage[id]);
    let flagCode = '';
    for (const flag of flagsList) {
        if(flag.name===wine.country){
            flagCode = flag.code;
        }
    }


    /* It empties the content of the element with the id 'vin-img'. */
    $('#vin-img').empty();

    /* Setting the source of the image to the picture of the wine. */
    $('#vin-img').append('<img src="https://cruth.phpnet.org/epfc/caviste/public/pics/' + wine.picture + '">');


    /* Displaying the data of the wine with the given id. */
    $('#vin-data').html(`<h2><span id="wine-id">#${wine.id}</span><span id="wine-name"> ${wine.name.toUpperCase()}</span></h2>
                                    <p><b>Grapes :</b> ${wine.grapes}</p>
                                    <p><b>Country :</b> ${wine.country} <img src="${flagsAPI + flagCode}" alt="${wine.country}" id="flag"></p>
                                    <p><b>Region :</b> ${wine.region}</p>
                                    <p><b>Year :</b> ${wine.year}</p>
                                    <p><b>Capacity :</b> ${wine.capacity} cl</p>
                                    <p><b>Color :</b> ${wine.color}</p>
                                    <p><b>Price :</b> ${wine.price} €</p>
                                    <button class="btn btn-light btn-sm" id="addImage"><i class="fa-solid fa-camera"></i> Add a picture</button>
                                    <button class="btn btn-light btn-sm" id="addNote"><i class="fa-solid fa-pen"></i> Add a note</button>
                                    <button id="likeBtn" class="btn btn-light btn-sm">
                                        <i class="fa-solid fa-heart"></i> Like this wine 
                                        <span id="likes" class="btn btn-danger btn-sm"></span>
                                    </button>`);



    displayLikes(id);

    $('#tabs-1').text(wine.description);

    getWineComments(id);

    if(getCookie('username')){
        getWinePictures(id)
    }

    getPersonalNote(id);

    popupDisplayer(document.getElementById('addNote'), document.getElementById('noteContainer'), document.getElementById('noteCross'));
    popupDisplayer(document.getElementById('login'), document.getElementById('loginContainer'), document.getElementById('loginCross'));
    popupDisplayer(document.getElementById('addImage'), document.getElementById('uploadContainer'), document.getElementById('uploadCross'));

    document.getElementById('likeBtn').addEventListener('click', e => {
        addLike(id, getCookie('username'));
    })

    noteForm.addEventListener('submit', e => {
        addNote(noteForm, e);
    })

    commentForm.addEventListener('submit', event => {
        addComment(commentForm, event);
    })
}