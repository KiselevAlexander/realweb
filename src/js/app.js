import $ from '../../node_modules/jquery';

const MENU_IS_ACTIVE_CLASS = '-active';

const $MENU = $('.main-menu');
const MENU_HEIGHT = 56;
const $HAMBURGER = $('.hamburger');
const $MOUSEDOWN = $('.mouse-down');
const $SCROLLTOTOP = $('.scroll-to-top');


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

});