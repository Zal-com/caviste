/**
 * @authors Kestens Maxime, Stordeur Guillaume
 *
 */

/**
 * It displays a popup when the user clicks on the button
 * @param open - the element that will open the popup
 * @param container - the div that contains the form
 * @param close - the close button
 */
function popupDisplayer(open, container, close)
{
    open.addEventListener('click', () => {
        if(!getCookie('username')){
            container = document.getElementById('loginContainer');
            close = document.getElementById('loginCross');
        }
        container.style.display = 'block';

        switch (container.id){
            case 'noteContainer' :
                setNoteFormData();
                break;
            case 'uploadContainer':
                setUploadFormData();
                break;
            case 'commentContainer' :
                setCommentFormData();
                break;
        }

        characterCount();

        close.addEventListener('click', () => {
            container.style.display = 'none';
        })
    });

}

/* A function that is called when the user clicks on the search button. It will search for the keyword in the name of the
wines and display the results. */
function searchWines(form, event)
{
    event.preventDefault();

    let keyword = form.search.value;
    let wines = [];

    for (let i = 0; i < sessionStorage.length ; i++) {
        let wine = JSON.parse(sessionStorage[i+1]);
        let wineName = wine.name.toUpperCase();
        if (wineName.includes(keyword.toUpperCase())) {
            wines.push([wineName, wine.id]);
        }
    }

    winesList.innerHTML = '';

    if (wines.length !== 0) {
        winesList.style.height = 'max-content';
        winesList.style.borderBottom = 'none';
        for (let i = 0; i < wines.length; i++) {
            createWinesListElements(wines[i][0], wines[i][1]);
        }
    } else {
        winesList.style.height = '457px';
        winesList.style.borderBottom = '1px solid lightgray';
        showEmptyListMsg();
    }

    // create btn listener
    winesListClickListener();
}

/* A function that is called when the user clicks on the search button. It will search for the keyword in the name of the
wines and display the results. */
function filterWineByCountry(form, event)
{
    event.preventDefault();

    let country = form.country.value;

    fetch(apiURL + 'wines?key=country&val=' + country + '&sort=year')
        .then(response => response.json())
        .then(json => {
            winesList.innerHTML = '';
            for(const wine of json) {
                createWinesListElements(wine.name.toUpperCase(), wine.id)
            }
            // get all li's of list of wines
            winesListElements = document.querySelectorAll('#wines-list li');
            // get data
            winesListClickListener();
            // Set focus on first element of list
            setElementFocus('#wines-list li:first-child');
        })
}

/**
 * It sends a request to the API with the user's credentials, and if the credentials are valid, it sets the user's
 * username, id and email in cookies
 * @param form - the form that was submitted
 * @param event - the event that triggered the function
 */
function login(form, event){

    event.preventDefault();

    const credentials= form.username.value + ':' + form.pwd.value;
    const options = {
        'method': 'GET',
        'mode': 'cors',
        'headers': {
            'content-type': 'application/json; charset=utf-8',
            'Authorization': 'Basic '+btoa(credentials)
        }
    };

    const fetchURL = 'users/authenticate';

    fetch(apiURL + fetchURL, options)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function (data) {
                    if (!data.success) {
                        $('#login-error').text('Identifiants de connexion invalides !');
                    } else {
                        document.cookie = "username=" + form.username.value;
                        document.cookie = "userid=" + data.id;
                        document.cookie = "usermail=" + data.email;

                        $('.popup').css("display", "none");
                        $('#login').text(form.username.value);
                        resetLikes();
                        getUserLikes(getCookie('userid'));

                        let liActive = document.querySelector('.active');
                        if (liActive !== null) {
                            setElementFocus('.active');
                        }

                    }
                })
            }
        });
}


/**
 * If the filter is active, show the clear filter button, otherwise hide it
 */
function updateClearFilterBtnStatus()
{
    isFilterActive ? $('#filterReset').css('display', 'block') : $('#filterReset').css('display', 'none');
}


/**
 * If the search is active, show the clear search button, otherwise hide it
 */
function updateClearSearchBtnStatus()
{
    if (isSearchActive) {
        $('#searchReset').css('display', 'block');
    } else {
        $('#searchReset').css('display', 'none');
        $('#formSearch input').val('');
    }
}


/**
 * It loops through the sessionStorage, gets the country of each wine, and adds it to the countriesAvailable array if it's
 * not already in there
 */
function getCountries()
{
    let wine, country;
    for (let i = 0; i < sessionStorage.length ; i++) {
        wine = JSON.parse(sessionStorage[i+1]);
        country = wine.country;

        if (!countriesAvailable.includes(country)) countriesAvailable.push(country);
    }

    let html = '';
    for (let i = 0; i < countriesAvailable.length; i++) {
        html += '<option value="' + countriesAvailable[i] + '">' + countriesAvailable[i] + '</option>';
    }

    $('#formFilterSelect').html(html);
}

/**
 * It adds an event listener to each textarea element that updates the text of the previous sibling element with the number
 * of characters remaining
 */
function characterCount()
{
    let textareas = document.getElementsByTagName('textarea');

    for (let textarea of textareas) {
        textarea.addEventListener('input', () => {
            let maxChar = textarea.maxLength;
            let textareaId = textarea.id;
            let writtenChar = textarea.value.length;
            let counter = textarea.previousElementSibling;
            counter.innerText = (maxChar - writtenChar).toString();
        });
    }
}

/**
 * It sets the note form data
 */
function setNoteFormData()
{
    $('#wine-name-note').html($('#wine-name').text() + ', n°<span id="note-wine-id">' + $('#wine-id').text().substring(1) + '</span>');
    setElementFocus('#ui-id-3');
    $('#noteContainer textarea').text($('#tabs-3').text());
}

/**
 * It sets the upload form data
 */
function setUploadFormData()
{
    $('#wine-name-image').html($('#wine-name').text() + ', n°<span id="image-wine-id">' + $('#wine-id').text().substring(1) + '</span>');
}

/**
 * It sets the wine name and id in the comment form
 */
function setCommentFormData()
{
    $('#wine-name-comment').html($('#wine-name').text() + ', n°<span id="comment-wine-id">' + $('#wine-id').text().substring(1) + '</span>');
}

var app = app || {};

// Utils
(function ($, app) {
    'use strict';

    app.utils = {};

    app.utils.formDataSuppoerted = (function () {
        return !!('FormData' in window);
    }());

}(jQuery, app));

// Parsley validators
(function ($, app) {
    'use strict';

    window.Parsley
        .addValidator('filemaxmegabytes', {
            requirementType: 'string',
            validateString: function (value, requirement, parsleyInstance) {

                if (!app.utils.formDataSuppoerted) {
                    return true;
                }

                var file = parsleyInstance.$element[0].files;
                var maxBytes = requirement * 1048576;

                if (file.length == 0) {
                    return true;
                }

                return file.length === 1 && file[0].size <= maxBytes;

            },
            messages: {
                en: 'File is too big'
            }
        })
        .addValidator('filemimetypes', {
            requirementType: 'string',
            validateString: function (value, requirement, parsleyInstance) {

                if (!app.utils.formDataSuppoerted) {
                    return true;
                }

                var file = parsleyInstance.$element[0].files;

                if (file.length == 0) {
                    return true;
                }

                var allowedMimeTypes = requirement.replace(/\s/g, "").split(',');
                return allowedMimeTypes.indexOf(file[0].type) !== -1;

            },
            messages: {
                en: 'File type not allowed'
            }
        });

}(jQuery, app));


// Parsley Init
(function ($, app) {
    'use strict';

    $('#uploadForm').parsley();

}(jQuery, app));