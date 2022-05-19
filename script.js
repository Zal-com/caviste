const apiURL = 'https://cruth.phpnet.org/epfc/caviste/public/index.php/api/';
const flagsAPI = 'https://countryflagsapi.com/png/'
const flagsList = [
    {"name": "Afghanistan", "code": "AF"},
    {"name": "Åland Islands", "code": "AX"},
    {"name": "Albania", "code": "AL"},
    {"name": "Algeria", "code": "DZ"},
    {"name": "American Samoa", "code": "AS"},
    {"name": "Andorra", "code": "AD"},
    {"name": "Angola", "code": "AO"},
    {"name": "Anguilla", "code": "AI"},
    {"name": "Antarctica", "code": "AQ"},
    {"name": "Antigua and Barbuda", "code": "AG"},
    {"name": "Argentina", "code": "AR"},
    {"name": "Armenia", "code": "AM"},
    {"name": "Aruba", "code": "AW"},
    {"name": "Australia", "code": "AU"},
    {"name": "Austria", "code": "AT"},
    {"name": "Azerbaijan", "code": "AZ"},
    {"name": "Bahamas", "code": "BS"},
    {"name": "Bahrain", "code": "BH"},
    {"name": "Bangladesh", "code": "BD"},
    {"name": "Barbados", "code": "BB"},
    {"name": "Belarus", "code": "BY"},
    {"name": "Belgium", "code": "BE"},
    {"name": "Belize", "code": "BZ"},
    {"name": "Benin", "code": "BJ"},
    {"name": "Bermuda", "code": "BM"},
    {"name": "Bhutan", "code": "BT"},
    {"name": "Bolivia", "code": "BO"},
    {"name": "Bosnia and Herzegovina", "code": "BA"},
    {"name": "Botswana", "code": "BW"},
    {"name": "Bouvet Island", "code": "BV"},
    {"name": "Brazil", "code": "BR"},
    {"name": "British Indian Ocean Territory", "code": "IO"},
    {"name": "Brunei Darussalam", "code": "BN"},
    {"name": "Bulgaria", "code": "BG"},
    {"name": "Burkina Faso", "code": "BF"},
    {"name": "Burundi", "code": "BI"},
    {"name": "Cambodia", "code": "KH"},
    {"name": "Cameroon", "code": "CM"},
    {"name": "Canada", "code": "CA"},
    {"name": "Cape Verde", "code": "CV"},
    {"name": "Cayman Islands", "code": "KY"},
    {"name": "Central African Republic", "code": "CF"},
    {"name": "Chad", "code": "TD"},
    {"name": "Chile", "code": "CL"},
    {"name": "China", "code": "CN"},
    {"name": "Christmas Island", "code": "CX"},
    {"name": "Cocos (Keeling) Islands", "code": "CC"},
    {"name": "Colombia", "code": "CO"},
    {"name": "Comoros", "code": "KM"},
    {"name": "Congo", "code": "CG"},
    {"name": "Congo, The Democratic Republic of the", "code": "CD"},
    {"name": "Cook Islands", "code": "CK"},
    {"name": "Costa Rica", "code": "CR"},
    {"name": "Cote D\"Ivoire", "code": "CI"},
    {"name": "Croatia", "code": "HR"},
    {"name": "Cuba", "code": "CU"},
    {"name": "Cyprus", "code": "CY"},
    {"name": "Czech Republic", "code": "CZ"},
    {"name": "Denmark", "code": "DK"},
    {"name": "Djibouti", "code": "DJ"},
    {"name": "Dominica", "code": "DM"},
    {"name": "Dominican Republic", "code": "DO"},
    {"name": "Ecuador", "code": "EC"},
    {"name": "Egypt", "code": "EG"},
    {"name": "El Salvador", "code": "SV"},
    {"name": "Equatorial Guinea", "code": "GQ"},
    {"name": "Eritrea", "code": "ER"},
    {"name": "Estonia", "code": "EE"},
    {"name": "Ethiopia", "code": "ET"},
    {"name": "Falkland Islands (Malvinas)", "code": "FK"},
    {"name": "Faroe Islands", "code": "FO"},
    {"name": "Fiji", "code": "FJ"},
    {"name": "Finland", "code": "FI"},
    {"name": "France", "code": "FR"},
    {"name": "French Guiana", "code": "GF"},
    {"name": "French Polynesia", "code": "PF"},
    {"name": "French Southern Territories", "code": "TF"},
    {"name": "Gabon", "code": "GA"},
    {"name": "Gambia", "code": "GM"},
    {"name": "Georgia", "code": "GE"},
    {"name": "Germany", "code": "DE"},
    {"name": "Ghana", "code": "GH"},
    {"name": "Gibraltar", "code": "GI"},
    {"name": "Greece", "code": "GR"},
    {"name": "Greenland", "code": "GL"},
    {"name": "Grenada", "code": "GD"},
    {"name": "Guadeloupe", "code": "GP"},
    {"name": "Guam", "code": "GU"},
    {"name": "Guatemala", "code": "GT"},
    {"name": "Guernsey", "code": "GG"},
    {"name": "Guinea", "code": "GN"},
    {"name": "Guinea-Bissau", "code": "GW"},
    {"name": "Guyana", "code": "GY"},
    {"name": "Haiti", "code": "HT"},
    {"name": "Heard Island and Mcdonald Islands", "code": "HM"},
    {"name": "Holy See (Vatican City State)", "code": "VA"},
    {"name": "Honduras", "code": "HN"},
    {"name": "Hong Kong", "code": "HK"},
    {"name": "Hungary", "code": "HU"},
    {"name": "Iceland", "code": "IS"},
    {"name": "India", "code": "IN"},
    {"name": "Indonesia", "code": "ID"},
    {"name": "Iran, Islamic Republic Of", "code": "IR"},
    {"name": "Iraq", "code": "IQ"},
    {"name": "Ireland", "code": "IE"},
    {"name": "Isle of Man", "code": "IM"},
    {"name": "Israel", "code": "IL"},
    {"name": "Italy", "code": "IT"},
    {"name": "Jamaica", "code": "JM"},
    {"name": "Japan", "code": "JP"},
    {"name": "Jersey", "code": "JE"},
    {"name": "Jordan", "code": "JO"},
    {"name": "Kazakhstan", "code": "KZ"},
    {"name": "Kenya", "code": "KE"},
    {"name": "Kiribati", "code": "KI"},
    {"name": "Korea, Democratic People\"S Republic of", "code": "KP"},
    {"name": "Korea, Republic of", "code": "KR"},
    {"name": "Kuwait", "code": "KW"},
    {"name": "Kyrgyzstan", "code": "KG"},
    {"name": "Lao People\"S Democratic Republic", "code": "LA"},
    {"name": "Latvia", "code": "LV"},
    {"name": "Lebanon", "code": "LB"},
    {"name": "Lesotho", "code": "LS"},
    {"name": "Liberia", "code": "LR"},
    {"name": "Libyan Arab Jamahiriya", "code": "LY"},
    {"name": "Liechtenstein", "code": "LI"},
    {"name": "Lithuania", "code": "LT"},
    {"name": "Luxembourg", "code": "LU"},
    {"name": "Macao", "code": "MO"},
    {"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"},
    {"name": "Madagascar", "code": "MG"},
    {"name": "Malawi", "code": "MW"},
    {"name": "Malaysia", "code": "MY"},
    {"name": "Maldives", "code": "MV"},
    {"name": "Mali", "code": "ML"},
    {"name": "Malta", "code": "MT"},
    {"name": "Marshall Islands", "code": "MH"},
    {"name": "Martinique", "code": "MQ"},
    {"name": "Mauritania", "code": "MR"},
    {"name": "Mauritius", "code": "MU"},
    {"name": "Mayotte", "code": "YT"},
    {"name": "Mexico", "code": "MX"},
    {"name": "Micronesia, Federated States of", "code": "FM"},
    {"name": "Moldova, Republic of", "code": "MD"},
    {"name": "Monaco", "code": "MC"},
    {"name": "Mongolia", "code": "MN"},
    {"name": "Montserrat", "code": "MS"},
    {"name": "Morocco", "code": "MA"},
    {"name": "Mozambique", "code": "MZ"},
    {"name": "Myanmar", "code": "MM"},
    {"name": "Namibia", "code": "NA"},
    {"name": "Nauru", "code": "NR"},
    {"name": "Nepal", "code": "NP"},
    {"name": "Netherlands", "code": "NL"},
    {"name": "Netherlands Antilles", "code": "AN"},
    {"name": "New Caledonia", "code": "NC"},
    {"name": "New Zealand", "code": "NZ"},
    {"name": "Nicaragua", "code": "NI"},
    {"name": "Niger", "code": "NE"},
    {"name": "Nigeria", "code": "NG"},
    {"name": "Niue", "code": "NU"},
    {"name": "Norfolk Island", "code": "NF"},
    {"name": "Northern Mariana Islands", "code": "MP"},
    {"name": "Norway", "code": "NO"},
    {"name": "Oman", "code": "OM"},
    {"name": "Pakistan", "code": "PK"},
    {"name": "Palau", "code": "PW"},
    {"name": "Palestinian Territory, Occupied", "code": "PS"},
    {"name": "Panama", "code": "PA"},
    {"name": "Papua New Guinea", "code": "PG"},
    {"name": "Paraguay", "code": "PY"},
    {"name": "Peru", "code": "PE"},
    {"name": "Philippines", "code": "PH"},
    {"name": "Pitcairn", "code": "PN"},
    {"name": "Poland", "code": "PL"},
    {"name": "Portugal", "code": "PT"},
    {"name": "Puerto Rico", "code": "PR"},
    {"name": "Qatar", "code": "QA"},
    {"name": "Reunion", "code": "RE"},
    {"name": "Romania", "code": "RO"},
    {"name": "Russian Federation", "code": "RU"},
    {"name": "RWANDA", "code": "RW"},
    {"name": "Saint Helena", "code": "SH"},
    {"name": "Saint Kitts and Nevis", "code": "KN"},
    {"name": "Saint Lucia", "code": "LC"},
    {"name": "Saint Pierre and Miquelon", "code": "PM"},
    {"name": "Saint Vincent and the Grenadines", "code": "VC"},
    {"name": "Samoa", "code": "WS"},
    {"name": "San Marino", "code": "SM"},
    {"name": "Sao Tome and Principe", "code": "ST"},
    {"name": "Saudi Arabia", "code": "SA"},
    {"name": "Senegal", "code": "SN"},
    {"name": "Serbia and Montenegro", "code": "CS"},
    {"name": "Seychelles", "code": "SC"},
    {"name": "Sierra Leone", "code": "SL"},
    {"name": "Singapore", "code": "SG"},
    {"name": "Slovakia", "code": "SK"},
    {"name": "Slovenia", "code": "SI"},
    {"name": "Solomon Islands", "code": "SB"},
    {"name": "Somalia", "code": "SO"},
    {"name": "South Africa", "code": "ZA"},
    {"name": "South Georgia and the South Sandwich Islands", "code": "GS"},
    {"name": "Spain", "code": "ES"},
    {"name": "Sri Lanka", "code": "LK"},
    {"name": "Sudan", "code": "SD"},
    {"name": "Suriname", "code": "SR"},
    {"name": "Svalbard and Jan Mayen", "code": "SJ"},
    {"name": "Swaziland", "code": "SZ"},
    {"name": "Sweden", "code": "SE"},
    {"name": "Switzerland", "code": "CH"},
    {"name": "Syrian Arab Republic", "code": "SY"},
    {"name": "Taiwan, Province of China", "code": "TW"},
    {"name": "Tajikistan", "code": "TJ"},
    {"name": "Tanzania, United Republic of", "code": "TZ"},
    {"name": "Thailand", "code": "TH"},
    {"name": "Timor-Leste", "code": "TL"},
    {"name": "Togo", "code": "TG"},
    {"name": "Tokelau", "code": "TK"},
    {"name": "Tonga", "code": "TO"},
    {"name": "Trinidad and Tobago", "code": "TT"},
    {"name": "Tunisia", "code": "TN"},
    {"name": "Turkey", "code": "TR"},
    {"name": "Turkmenistan", "code": "TM"},
    {"name": "Turks and Caicos Islands", "code": "TC"},
    {"name": "Tuvalu", "code": "TV"},
    {"name": "Uganda", "code": "UG"},
    {"name": "Ukraine", "code": "UA"},
    {"name": "United Arab Emirates", "code": "AE"},
    {"name": "United Kingdom", "code": "GB"},
    {"name": "USA", "code": "US"},
    {"name": "United States Minor Outlying Islands", "code": "UM"},
    {"name": "Uruguay", "code": "UY"},
    {"name": "Uzbekistan", "code": "UZ"},
    {"name": "Vanuatu", "code": "VU"},
    {"name": "Venezuela", "code": "VE"},
    {"name": "Viet Nam", "code": "VN"},
    {"name": "Virgin Islands, British", "code": "VG"},
    {"name": "Virgin Islands, U.S.", "code": "VI"},
    {"name": "Wallis and Futuna", "code": "WF"},
    {"name": "Western Sahara", "code": "EH"},
    {"name": "Yemen", "code": "YE"},
    {"name": "Zambia", "code": "ZM"},
    {"name": "Zimbabwe", "code": "ZW"}
];
const winesList = document.getElementById('wines-list');
const formSearch = document.getElementById('formSearch');
const formLogin = document.getElementById('formLogin');
const formFilter = document.getElementById('formFilter');
const noteForm = document.getElementById('noteForm');
const commentForm = document.getElementById('commentForm');
const resetFilterBtn = document.getElementById('filterReset');
let winesListElements = [];
// array comme ça easier to modifier
let winesLiked = [];

const countriesAvailable = [];

/*************************************************** MAIN *************************************************/
window.addEventListener('load', () => {
    // get all wines
    getWines(true);

    /* Interval reload sessionStorage */
    setInterval(() => {
        getWines(false)
    }, 20000);

    /* Recherche vins */
    formSearch.addEventListener('submit', (event) => {
        searchWines(formSearch, event);
    })
    /* filtre des vins */
    formFilter.addEventListener('submit', (event) => {
       filterWineByCountry(formFilter, event);
    });
    /* Login */
    formLogin.addEventListener('submit', (e) =>{
        login(formLogin, e)
    } );
    resetFilterBtn.addEventListener('click', () => {
        displayAllWines();
    })

    // close pop ups escape key
    window.addEventListener('keyup', (event) => {
        if (event.key === "Escape") {
            document.querySelectorAll('.popup').forEach(popup => {
                popup.style.display = 'none';
            })
        }
    })

    if(!getCookie('username')){
        $('#login').text('Connexion')
    } else {
        $('#login').text(getCookie('username'));}
});

/*********************************************** WINE FUNCTIONS *********************************************/

function getWines(hasToDisplay)
{
    fetch(apiURL + 'wines')
        .then(response => response.json())
        .then(json => {
            for (const wine of json) {
                sessionStorage.setItem(wine.id, JSON.stringify(wine))
            }
            if (hasToDisplay) displayAllWines();

            // get countries having a wine
            getCountries();
        });
}

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

/* Tous les vins */
function displayAllWines() {
    let html = '';

    for (let i = 0; i < sessionStorage.length ; i++) {
        let wine = JSON.parse(sessionStorage[i+1]);
        html += '<li class="btn" id="wine-' + wine.id + '">' + wine.name.toUpperCase() + '</li>';

    }

    winesList.innerHTML = html;

    // get all li's of list of wine
    winesListElements = document.querySelectorAll('#wines-list li');


    // click listner of li's
    winesListClickListener();

    //Set focus on first element of list
    setElementFocus('#wines-list li:first-child');
    $('#loader').hide();
}

/* Wines list click */
function winesListClickListener()
{
    winesListElements.forEach(element => {
        element.addEventListener('click', () => {
            // remove active class to all li's
            removeActiveClass(winesListElements);
            // add active class to li
            element.classList.add('active');
            // fetch wine data based on id
            let buttonId = element.id;
            let wineId = buttonId.match(/\d+/gm)[0];
            // tabs
            setElementFocus('#ui-id-1');
            // wine data
            getWineData(wineId);
            getWineComments(wineId);
        });
    });
}
//ui-tabs-tab ui-corner-top ui-state-default ui-tab ui-tabs-active ui-state-active -> tab actif
//ui-tabs-tab ui-corner-top ui-state-default ui-tab --> tab inactif

function createWinesListElements(name, id)
{
    let li = document.createElement('li');
    li.innerText = name;
    li.id = 'wine-' + id;
    li.className = 'btn'; // bootstrap classes
    winesList.appendChild(li);
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

    // get all li's of list of wines
    winesListElements = document.querySelectorAll('#wines-list li');

    // get data
    winesListClickListener();
}

function getWineData(id) {

    let wine = JSON.parse(sessionStorage[id]);
    let flagCode = '';
    for (const flag of flagsList) {
        if(flag.name===wine.country){
            flagCode = flag.code;
        }
    }

    //Afficher image
    $('#vin-img img').attr("src", "https://cruth.phpnet.org/epfc/caviste/public/pics/" + wine.picture).addClass("slick");

    //Afficher Data
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


    // display likes in button
    displayLikes(id);

    //Tabs
    $('#tabs-1').text(wine.description);

    //Getting Comments
    getWineComments(id);

    //get personal note of current wine
    getPersonalNote(id);

    //Pop-ups opening
    popupDisplayer(document.getElementById('addNote'), document.getElementById('noteContainer'), document.getElementById('noteCross'));
    popupDisplayer(document.getElementById('login'), document.getElementById('loginContainer'), document.getElementById('loginCross'));
    popupDisplayer(document.getElementById('addImage'), document.getElementById('uploadContainer'), document.getElementById('uploadCross'));

    //Add like on a wine
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

function getWineComments(id)
{
    fetch(apiURL + 'wines/' + id + '/comments')
        .then(response => response.json())
        .then(json => {
            let commentsHTML = '<button class="btn btn-dark" id="addComment">Ajouter/retirer commentaire</button><hr>';
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

function showEmptyListMsg()
{
    let li = document.createElement('li');
    let h3 = document.createElement('h3');
    h3.innerText = 'Pas de vins trouvés.';
    li.className = 'center-fix';
    li.appendChild(h3);
    winesList.appendChild(li);
}

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
                let btnDeleteComment = document.getElementById('resetComment');
                btnDeleteComment.addEventListener('click', () => {
                    deleteComment(getCookie('userid'), document.getElementById('comment-wine-id').innerText);
                })
                break;
        }

        characterCount();

        close.addEventListener('click', () => {
            container.style.display = 'none';
        })
    });
}


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

function characterCount()
{
    let textarea = document.getElementById('textarea');

    textarea.addEventListener('input', () => {
        let maxChar = textarea.maxLength;
        let textareaId = textarea.id;
        let writtenChar = textarea.value.length;
        let counter = document.getElementById(textareaId + 'Counter');
        counter.innerText = (maxChar - writtenChar).toString();
    });

}

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

function getPersonalNote(wineId){

    let credentials = getCookie('username') + ':123';

    const options = {
        'method': 'GET',
        'mode': 'cors',
        'headers': {
            'content-type': 'application/json; charset=utf-8',
            'Authorization': 'Basic ' + btoa(credentials)	//Try with other credentials (login:password)
        }
    }

    fetch(apiURL + 'wines/' + wineId + '/notes', options)
        .then(response => response.json())
        .then(data => {
            $('#tabs-3').text(data.note);
        })
}

function addNote(form, event){

    event.preventDefault();
    let credentials = getCookie('username') + ':123';
    const formData = new FormData(form);
    let content = formData.get('note')

    const options = {
        'method': 'PUT',
        'body': JSON.stringify({"note": content }),
        'mode': 'cors',
        'headers': {
            'content-type': 'application/json; charset=utf-8',
            'Authorization': 'Basic ' + btoa(credentials)
        }
    }

    let wineId = $('#note-wine-id').text();
    const fetchURL = 'wines/' + wineId + '/notes';

    fetch(apiURL + fetchURL, options)
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

function addComment(form, event)
{
    event.preventDefault();

    let credentials = getCookie('username') + ':123';
    const formData = new FormData(form);
    let content = formData.get('comment')

    const options = {
        'method': 'PUT',
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

function deleteComment(userId, wineId)
{
    console.log(userId, wineId);

    // fetch DELETE
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

/********************************************** CASUAL FUNCTIONS ******************************************************/

function setElementFocus(element)
{
    // sets focus to Description tab
    $(element).click();
}

function removeActiveClass(list)
{
    list.forEach(element => {
        if(element.classList.contains('active')) element.classList.remove('active');
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

function getCookie(cookieName) {
    if(cookieName!='') {
        let allCookies = decodeURIComponent(document.cookie);
        let tab = allCookies.split(cookieName+'=');
        if(tab.length>1) {
            let limite = tab[1].indexOf(';');
            if(limite!=-1) {
                return tab[1].substring(0,limite);
            } else {
                return tab[1].substring(0);
            }
        }
    }
    return false;
}
