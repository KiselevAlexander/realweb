import $ from '../../node_modules/jquery';

$(() => {
    const $MENU = $('.main-menu');
    const $HAMBURGER = $('.hamburger');
    const $MOUSEDOWN = $('.mouse-down');
    const $SCROLLTOTOP = $('.scroll-to-top');

    $HAMBURGER.click((e) => {
        e.preventDefault();
        $MENU.toggleClass('-active');
        $HAMBURGER.toggleClass('is-active')
    });

    $MOUSEDOWN.click((e) => {
        e.preventDefault();
        const WH = window.innerHeight;

        $('html').animate({
            scrollTop: `${WH - 56}px`
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
        $MENU.toggleClass('-active');
        $HAMBURGER.toggleClass('is-active');

    })
});
