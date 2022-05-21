/**
 * It loops through the sessionStorage and creates a list of wines
 */
function displayAllWines() {
    let html = '';

    for (let i = 0; i < sessionStorage.length ; i++) {
        let wine = JSON.parse(sessionStorage[i+1]);
        html += '<li class="btn" id="wine-' + wine.id + '">' + wine.name.toUpperCase() + '</li>';

    }

    winesList.innerHTML = html;

    winesListClickListener();

    setElementFocus('#wines-list li:first-child');

    $('#loader').hide();
}

/**
 * It adds a click event listener to each list item in the list of wines
 */
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

/**
 * It creates a new list item element, sets its text to the name of the wine, sets its id to the id of the wine, and adds
 * it to the wines list
 * @param name - the name of the wine
 * @param id - the id of the wine
 */
function createWinesListElements(name, id)
{
    let li = document.createElement('li');
    li.innerText = name;
    li.id = 'wine-' + id;
    li.className = 'btn'; // bootstrap classes
    winesList.appendChild(li);
}

/**
 * It creates an `li` element, adds a `h3` element to it, adds a class to the `li` element, and then adds the `li` element
 * to the `winesList` element
 */
function showEmptyListMsg()
{
    let li = document.createElement('li');
    let h3 = document.createElement('h3');
    h3.innerText = 'Pas de vins trouvés.';
    li.className = 'center-fix';
    li.appendChild(h3);
    winesList.appendChild(li);
}
