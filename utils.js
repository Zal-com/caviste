/**
 * @authors Kestens Maxime, Stordeur Guillaume
 *
 */

/**
 * > Sets focus to the element passed as a parameter
 * @param element - the element to set focus to
 */
function setElementFocus(element)
{
    $(element).click();
}

/**
 * It removes the active class from all elements in a list
 * @param list - The list of elements you want to remove the active class from.
 */
function removeActiveClass(list)
{
    list.forEach(element => {
        if(element.classList.contains('active')) element.classList.remove('active');
    })
}

/**
 * It returns the value of the cookie whose name is passed as a parameter
 * @param cookieName - The name of the cookie you want to get.
 * @returns The value of the cookie.
 */
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