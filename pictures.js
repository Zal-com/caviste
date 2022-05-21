/**
 * It takes a form, validates it, and if it's valid, it sends the image to the server
 * @param form - the form that contains the file input
 * @param event - The event object
 */
function uploadImage(form, event){

    let f = $(form);
    f.parsley().validate()

    if(f.parsley().isValid()){

        const credentials = getCookie('username') + ':123';
        const data = new FormData(form);
        let image = data.get('uploadImage');

        const options = {
            'method': 'POST',
            'body': JSON.stringify(image),
            'mode': 'cors',
            'headers': {
                'content-type': 'application/json; charset=utf-8',
                'Authorization': 'Basic '+btoa(credentials)
            }
        };

        let wineId = $('#image-wine-id').text();
        const fetchURL = 'wines/' + wineId + '/pictures';

        fetch(apiURL + fetchURL, options)
            .then(function(response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        if (!data.success) {
                            $('#login-error').text('Impossible d\'envoyer l\'image');
                        }
                        else{
                            $('#uploadCross').click();
                        }
                    })
                }
            });

    }

    event.preventDefault();

}

/**
 * It fetches the pictures of a wine from the API and displays them in the DOM
 * @param wineId - the id of the wine you want to get the pictures from
 */
function getWinePictures(wineId){

    const credentials = getCookie('username') + ':123';

    const options = {
        'method': 'GET',
        'mode': 'cors',
        'headers': {
            'content-type': 'application/json; charset=utf-8',
            'Authorization': 'Basic '+btoa(credentials)	//Try with other credentials (login:password)
        }
    };

    const fetchURL = 'wines/' + wineId + '/pictures';

    fetch(apiURL + fetchURL, options)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function (data) {
                    for(img of data) {
                        $('#vin-img').append('<img src="https://cruth.phpnet.org/epfc/caviste/public/uploads/' + img.url + '">');
                    }
                    let nbreImages = document.querySelectorAll('#vin-img img')
                    $('#addImage').text('Add a picture (' + nbreImages.length + '/3)');
                });
            }
        });
}