/**
 * @authors Kestens Maxime, Stordeur Guillaume
 *
 */

/**
 * It takes the form data, sends it to the API, and then updates the page with the new data
 * @param form - the form that was submitted
 * @param event - the event that triggered the function
 */
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

/**
 * It gets the personal note for a wine from the API and displays it in the third tab
 * @param wineId - The id of the wine that we want to get the personal note for.
 */
function getPersonalNote(wineId){

    let credentials = getCookie('username') + ':123';

    const options = {
        'method': 'GET',
        'mode': 'cors',
        'headers': {
            'content-type': 'application/json; charset=utf-8',
            'Authorization': 'Basic ' + btoa(credentials)
        }
    }

    fetch(apiURL + 'wines/' + wineId + '/notes', options)
        .then(response => response.json())
        .then(data => {
            $('#tabs-3').text(data.note);
        })
}