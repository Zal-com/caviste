const winesList = document.getElementById('wines-list');
/* Recherche vins */
let formSearch = $('#formSearch');
formSearch.on('submit', (event) => {
    searchWines(this, event);
});

/* Tous les vins */
function getAllWines() {
    fetch('https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines')
        .then(response => response.json())
        .then(json => {

            let html = '<ul>';
            for (const wine of json) {
                html += '<li onclick="/* TODO */#">' + wine.name + '</li>';
            }
            html += '</ul>';
            //$('#vin-listing').html(html + '</ul>');
            document.querySelector('#vin-listing').innerHTML = html;
        });
}

function searchWines(form, event)
{
    let keyword = form.search.value;
    let path = 'https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines/search?keyword=' + keyword;
    fetch(path)
        .then(response => response.json())
        .then(json => {
                winesList.innerHTML = ''
                createWinesListElements(json)
            }
        );

    event.preventDefault();
}

function createWinesListElements(data)
{
    let li;
    for (let wines of data) {
        li = document.createElement('li');
        li.innerText = wines.name;
        li.className = 'btn btn-danger'; // bootstrap classes
        winesList.appendChild(li);
    }
}

/* Filtre */