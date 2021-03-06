/**
 * @authors Kestens Maxime, Stordeur Guillaume
 *
 */

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
function getWinePictures(wineId, winePicture){

    const credentials = getCookie('username') + ':123';

    const options = {
        'method': 'GET',
        'mode': 'cors',
        'headers': {
            'content-type': 'application/json; charset=utf-8',
            'Authorization': 'Basic '+btoa(credentials)
        }
    };

    const fetchURL = 'wines/' + wineId + '/pictures';

    fetch(apiURL + fetchURL, options)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function (data) {

                    let $slick = $('#vin-img');

                    if (data.length !== 0){

                        for(img of data) {
                            $slick.append('<img src="https://cruth.phpnet.org/epfc/caviste/public/uploads/' + img.url + '" alt="customPicture">');
                        }
                        $slick.slick({
                            dots: true,
                            infinite: true,
                            speed: 500,
                            fade: true,
                            cssEase: 'linear'
                        });
                    }
                    let nbreImages = document.querySelectorAll('#vin-img img:not(:first-child)')
                    $('#addImage').html('<i class="fa-solid fa-camera"></i> Add a picture (' + nbreImages.length + '/3)');

                    if(nbreImages.length == 3){
                        $('#addImage').attr("disabled", true);
                    }
                });
            }
        });
}