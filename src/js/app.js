import $ from '../../node_modules/jquery';

import tingle from "../../node_modules/tingle.js"

const MENU_IS_ACTIVE_CLASS = '-active';

const $MENU = $('.main-menu');
const MENU_HEIGHT = 56;
const $HAMBURGER = $('.hamburger');
const $MOUSEDOWN = $('.mouse-down');
const $SCROLLTOTOP = $('.scroll-to-top');

/**
 * Modals
 */
const MODAL = new tingle.modal({
    footer: false,
    closeMethods: ['overlay', 'button', 'escape'],
    cssClass: ['-modal'],
    closeLabel: '',
    onOpen: function() {
        console.log('modal open');
    },
    onClose: function() {
        console.log('modal closed');
    },
    beforeClose: function() {
        // here's goes some logic
        // e.g. save content before closing the modal
        return true; // close the modal
        return false; // nothing happens
    }
});

const $MODAL_INNER = $('<div class="-modal-inner"></div>');
const $MODAL_BOX_CONTENT = $('.tingle-modal-box__content');

$MODAL_BOX_CONTENT.append($('<button class="-modal-close"></button>'));
$MODAL_BOX_CONTENT.append($MODAL_INNER);
$MODAL_BOX_CONTENT.append($('<button class="-modal-close -footer"></button>'));


const openModal = (target) => {
    $MODAL_INNER.html(target.html());
    MODAL.open();
};

$('.-modal-close').click(() => {
    MODAL.close();
})

$('a').click((e) => {
    const {target} = e;
    const {hash} = target;

    if (hash && hash.startsWith('#open-')) {
        e.preventDefault();

        const $target = $(`#${hash.substr(6)}`);
        openModal($target);
    }

});


/**
 * / Modals
 */

$HAMBURGER.click((e) => {
    e.preventDefault();
    $MENU.toggleClass(MENU_IS_ACTIVE_CLASS);
    $HAMBURGER.toggleClass('is-active')
});

$MOUSEDOWN.click((e) => {
    e.preventDefault();
    const WH = window.innerHeight;

    $('html').animate({
        scrollTop: `${WH - MENU_HEIGHT}px`
    }, 400);
});

$SCROLLTOTOP.click((e) => {
    e.preventDefault();
    $('html').animate({
        scrollTop: 0
    }, 400);
});

$MENU.find('.scroll-to-top, a').click((e) => {
    e.preventDefault();

    if ($MENU.hasClass(MENU_IS_ACTIVE_CLASS)) {
        $MENU.toggleClass(MENU_IS_ACTIVE_CLASS);
        $HAMBURGER.toggleClass('is-active');
    }

    const {hash} = e.target;

    if (hash && hash.startsWith('#to-')) {
        const $target = $(`#${hash.substr(4)}`);
        $('html').stop().animate({
            scrollTop: $target.offset().top - MENU_HEIGHT
        }, 400);
    }

    if (hash && hash.startsWith('#open-')) {
        const $target = $(`#${hash.substr(6)}`);
        openModal($target);
    }

});
