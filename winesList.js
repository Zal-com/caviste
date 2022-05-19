/* Tous les vins */
function displayAllWines() {
    let html = '';

    for (let i = 0; i < sessionStorage.length ; i++) {
        let wine = JSON.parse(sessionStorage[i+1]);
        html += '<li class="btn" id="wine-' + wine.id + '">' + wine.name.toUpperCase() + '</li>';

    }

    winesList.innerHTML = html;

    // click listner of li's
    winesListClickListener();

    //Set focus on first element of list
    setElementFocus('#wines-list li:first-child');

    // hide loader on first time page loaded
    $('#loader').hide();
}

/* Wines list click */
function winesListClickListener()
{
    // get all li's of list of wine
    winesListElements = document.querySelectorAll('#wines-list li');

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

function createWinesListElements(name, id)
{
    let li = document.createElement('li');
    li.innerText = name;
    li.id = 'wine-' + id;
    li.className = 'btn'; // bootstrap classes
    winesList.appendChild(li);
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
