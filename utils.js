function setElementFocus(element)
{
    // sets focus to Description tab
    $(element).click();
}

function removeActiveClass(list)
{
    list.forEach(element => {
        if(element.classList.contains('active')) element.classList.remove('active');
    })
}

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