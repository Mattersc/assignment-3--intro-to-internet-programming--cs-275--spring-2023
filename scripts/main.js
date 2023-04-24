const menu = {
    toggleButton: document.getElementById(`menu`),
    dropdownButton: document.getElementById(`dropMenu`),
    nav: document.querySelector(`nav`),
    modal: document.getElementById(`modal`),
    modalPanel: document.querySelector(`.modal-panel`),
    modalPane: document.querySelector(`.modal-content-pane`),
    breakthrough: 736,
    isMenuOpen: false,
    isSideNavOpen: false
};

function windowSizeChange() {
    if (window.innerWidth > menu.breakthrough) {
        menu.dropdownButton.style.display = `flex`;
        menu.nav.style.margin = `0 auto`;
        menu.nav.style.transform = `translateY(0)`;
    } else {
        menu.dropdownButton.style.display = `grid`;
        menu.nav.style.margin = `0`;
        menu.nav.style.transform = `translateX(-150px)`;
    }
}

function menuButton() {
    if (window.innerWidth > menu.breakthrough && !menu.isMenuOpen) {
        menu.isMenuOpen = true;
        menu.nav.style.transform = `translateY(96px)`;
        menu.nav.style.visibility = `visible`;
    } else if (window.innerWidth > menu.breakthrough && menu.isMenuOpen) {
        menu.isMenuOpen = false;
        menu.nav.style.transform = `translateY(0)`;
        menu.nav.style.visibility = `hidden`;
    } else if (window.innerWidth <= menu.breakthrough && !menu.isSideNavOpen) {
        menu.isSideNavOpen = true;
        menu.nav.style.transform = `translateX(0)`;
        menu.nav.style.visibility = `visible`;
    } else {
        menu.isSideNavOpen = false;
        menu.nav.style.transform = `translateX(-150px)`;
        menu.nav.style.visibility = `hidden`;
    }
}

function handleModalClick() {
    menu.modalPanel.style.visibility = menu.modalPane.style.visibility = `visible`;
}

function handleModalPanelClick() {
    menu.modalPanel.style.visibility = menu.modalPane.style.visibility = `hidden`;
}

function handleEscape(event) {
    if (event.key === `Escape`) {
        menu.modalPanel.style.visibility = menu.modalPane.style.visibility = `hidden`;
    }
}

window.onload = function() {
    menu.nav.style.visibility = `hidden`;
    windowSizeChange();
};

window.onresize = function() {
    windowSizeChange();
};

menu.toggleButton.addEventListener(`click`, function() {
    menuButton();
});

menu.modal.addEventListener(`click`, function() {
    handleModalClick();
});

menu.modalPanel.addEventListener(`click`, function() {
    handleModalPanelClick();
});

document.addEventListener(`keydown`, function(event) {
    handleEscape(event);
});
