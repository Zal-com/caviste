/* Recherche vins */
let formSearch = $('#formSearch');
formSearch.on('submit', (event) => {
    searchWines(this, event);
});

/* Tous les vins */
function getAllWines()
{
    fetch('https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines')
        .then(response => response.json())
        .then(json => console.log(json))
}

function searchWines(form, event)
{
    event.preventDefault();
    console.log(form);
    let keyword = form.search;
    let path = 'https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines/search?keyword=' + keyword;
    console.log(keyword);
    fetch(path)
        .then(response => response.json())
        .then(json => console.log(json))
}


/* Filtre */