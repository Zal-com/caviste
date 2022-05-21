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
       isFilterActive = true;
       updateClearFilterBtnStatus();
    });
    /* Login */
    formLogin.addEventListener('submit', (e) =>{
        login(formLogin, e)
    } );
    // filter reset
    resetFilterBtn.addEventListener('click', () => {
        displayAllWines();
        isFilterActive = false;
        updateClearFilterBtnStatus()
    })

    // close pop ups escape key
    window.addEventListener('keyup', (event) => {
        if (event.key === "Escape") {
            document.querySelectorAll('.popup').forEach(popup => {
                popup.style.display = 'none';
            })
        }
    })

    //Ajout d'images
    formUpload.addEventListener('submit', e => {
        uploadImage(formUpload, e);
    })

    if(!getCookie('username')){
        $('#login').text('Connexion')
    } else {
        $('#login').text(getCookie('username'));
    }
});