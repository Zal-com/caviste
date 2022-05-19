function popupDisplayer(open, container, close)
{
    open.addEventListener('click', () => {
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
                /*
                let btnDeleteComment = document.getElementById('resetComment');
                btnDeleteComment.addEventListener('click', () => {
                    deleteComment(getCookie('userid'), document.getElementById('comment-wine-id').innerText);
                })
                 */
                break;
        }

        characterCount();

        close.addEventListener('click', () => {
            container.style.display = 'none';
        })
    });
}

function searchWines(form, event)
{
    event.preventDefault();

    let keyword = form.search.value;
    let wines = [];

    for (let i = 0; i < sessionStorage.length ; i++) {
        let wine = JSON.parse(sessionStorage[i+1]);
        if (wine.name.includes(keyword)) {
            wines.push([wine.name.toUpperCase(), wine.id]);
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

function login(form, event){

    event.preventDefault();

    const credentials= form.username.value + ':' + form.pwd.value;
    const options = {
        'method': 'GET',
        //'body': JSON.stringify({ "like" : true }),	//Try with true or false
        'mode': 'cors',
        'headers': {
            'content-type': 'application/json; charset=utf-8',
            'Authorization': 'Basic '+btoa(credentials)	//Try with other credentials (login:password)
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
                    }
                })
            }
            //FIXME Besoin d'un mesage d'erreur
            else alert("NO");
        });
}

//////// FILTER RESET

function updateClearFilterBtnStatus()
{
    isFilterActive ? $('#filterReset').css('display', 'block') : $('#filterReset').css('display', 'none');
}

//////// GET ALL COUNTRIES WITH WINES

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

//////// CHARACTER COUNTER IN FORM

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

//////// SET DATA IN FORM

function setNoteFormData()
{
    $('#wine-name-note').html($('#wine-name').text() + ', n°<span id="note-wine-id">' + $('#wine-id').text().substring(1) + '</span>');
    setElementFocus('#ui-id-3');
    $('#noteContainer textarea').text($('#tabs-3').text());
}

function setUploadFormData()
{
    $('#wine-name-image').html($('#wine-name').text() + ', n°<span id="image-wine-id">' + $('#wine-id').text().substring(1) + '</span>');
}

function setCommentFormData()
{
    $('#wine-name-comment').html($('#wine-name').text() + ', n°<span id="comment-wine-id">' + $('#wine-id').text().substring(1) + '</span>');
}