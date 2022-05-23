window.addEventListener('load', () => {
    // get all wines
    getWines(true);

    /* Interval reload sessionStorage */
    setInterval(() => {
        getWines(false)
    }, 20000);

    /* wines search */
    formSearch.addEventListener('submit', (event) => {
        searchWines(formSearch, event);
    })
    /* wines filter */
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

    /* Escape key press closes pop-ups*/
    window.addEventListener('keyup', (event) => {
        if (event.key === "Escape") {
            document.querySelectorAll('.popup').forEach(popup => {
                popup.style.display = 'none';
            })
        }
    })

    /* Opening image upload pop-up */
    formUpload.addEventListener('submit', e => {
        uploadImage(formUpload, e);
    })

    if(!getCookie('username')){
        $('#login').text('Connexion')
    } else {
        $('#login').text(getCookie('username'));
    }
});