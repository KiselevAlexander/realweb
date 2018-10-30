import $ from 'jquery';
import tingle from "tingle.js"
import Swiper from "../../node_modules/swiper"
// var Swiper = require('swiper');
// window.jQuery = window.$ = require("jquery");
// require('../../node_modules/owl.carousel');

const FORMS_URL_API = '/forms.php';

const MENU_IS_ACTIVE_CLASS = '-active';

const $MENU = $('.main-menu');
const MENU_HEIGHT = 56;
const MOBILE_BREAKPOINT = 768;
const $HAMBURGER = $('.hamburger');
const $MOUSEDOWN = $('.mouse-down');
const $SCROLLTOTOP = $('.scroll-to-top');
const $PRELOADER = $('.preloader');

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
        $('.-modal-inner').html('');
        $('.-modal-inner').html('');
        $('.-modal-close.-footer').removeClass('-hidden');
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
});

$('a').click((e) => {
    const {target} = e;
    const {hash} = target;

    if (hash && hash.startsWith('#open-')) {
        e.preventDefault();

        const $target = $(`#${hash.substr(6)}`);
        openModal($target);
    }

});

$('.open-video').click((e) => {
    e.preventDefault();

    const $VIDEO_MODAL = $('<div id="video"></div>');
    $VIDEO_MODAL.append('<div class="video-player">' +
        '<svg style="width: 100px;height: 100px;">\n' +
        '            <use xlink:href="#spinner"/>\n' +
        '        </svg>' +
        '</div>');

    const $this = $(e.target);
    const _videoLink = $this.data('video');
    if (!_videoLink) {
        console.error('Attr [data-video] is required');
    }
    const frame = `<iframe src="${_videoLink}?autoplay=1&rel=0&showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    $VIDEO_MODAL.find('.video-player').html(frame);
    $('.-modal-close.-footer').addClass('-hidden');
    openModal($VIDEO_MODAL);
});


$('.open-lot').click((e) => {
    e.preventDefault();

    const $LOT_MODAL = $('#lot');

    const $this = $(e.target);
    const _lotId = $this.data('lot');
    if (!_lotId) {
        console.error('Attr [data-lot] is required');
    }

    const lot = LOTS.find((i) => i.id === _lotId);

    if (!lot) {
        console.error(`Lot ${_lotId} is not defined`);
        return;
    }

    $LOT_MODAL.find('.lot-modal-image').html(`<img src="${lot.image}" alt="${lot.name}" />`);
    $LOT_MODAL.find('.lot-modal-name').html(lot.name);
    $LOT_MODAL.find('.lot-modal-description').html(lot.description);
    $LOT_MODAL.find('.lot-modal-text').html(lot.text);
    openModal($LOT_MODAL);
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

    $('html, body').animate({
        scrollTop: `${WH - MENU_HEIGHT}px`
    }, 400);
});

$SCROLLTOTOP.click((e) => {
    e.preventDefault();
    $('html, body').animate({
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
        $('html, body').stop().animate({
            scrollTop: $target.offset().top - MENU_HEIGHT
        }, 400);
    }

    if (hash && hash.startsWith('#open-')) {
        const $target = $(`#${hash.substr(6)}`);
        openModal($target);
    }

});


/**
 * Forms
 */

$(document).on('submit', 'form', (e) => {
    e.preventDefault();
    const $form = $(e.target);
    const $fields = $form.find('input');
    const $buttons = $form.find('button');
    const _errors = [];

    $fields.each((i, field) => {
        const $field = $(field);
        if ($field.data('required') && !$field.val()) {
            $field.parent().addClass('-error');
            _errors.push($field.attr('name'))
        }
    });

    if (!_errors.length) {
        $fields.attr('disabled', true);
        $buttons.attr('disabled', true);
        $.ajax({
            url: FORMS_URL_API,
            type: 'post',
            dataType: 'json',
            success: (data) => {
                $fields.removeAttr('disabled');
                $buttons.removeAttr('disabled');
                console.log(data);
            },
            error: () => {
                $fields.removeAttr('disabled');
                $buttons.removeAttr('disabled');
            }
        })
    }
});

$(document).on('keydown', 'input', (e) => {
    const $input = $(e.target);
    $input.parent().removeClass('-error');
});
/**
 * / Forms
 */

let WINDOW_WIDTH = window.innerWidth;


if (WINDOW_WIDTH > MOBILE_BREAKPOINT) {

    var mySwiper = new Swiper ('.swiper-container', {
        autoplay: {
            delay: 3000,
        },
        slidesPerView: 5,
        spaceBetween: 45,
        loop: true,
        centeredSlides: true,
        autoHeight: false,
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
        breakpoints: {
            // when window width is <= 480px
            575: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            // when window width is <= 640px
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            // when window width is <= 640px
            998: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });
} else {
    $('.partners .swiper-wrapper').removeClass('swiper-wrapper').addClass('row');
    $('.partners .swiper-slide').removeClass('swiper-slide').addClass('col-6 partner');
}

const CLASSES_MAP = {
    'm-slider': 'swiper-container',
    'm-slider-wrapper': 'swiper-wrapper',
    'm-slider-item': 'swiper-slide',
};

if (WINDOW_WIDTH < MOBILE_BREAKPOINT) {
    Object.keys(CLASSES_MAP).map((key) => {
        $(`.${key}`).each((i, item) => {
            const $this = $(item);
            const classes = $this.attr('class');
            $this.data('originClasses', classes);
            $this.attr('class', CLASSES_MAP[key]);

            const mobileSliderClass = $this.data('mobile-slider');
            if (mobileSliderClass) {
                $this.addClass(mobileSliderClass);
                $this.addClass('mobile-slider');
                $this.append('<div class="swiper-scrollbar"/>');
            }
        });
    });

    new Swiper ('.mobile-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        centeredSlides: true,
        scrollbar: {
            el: '.swiper-scrollbar',
        },
        autoHeight: true
    });

    new Swiper ('.chronology-mobile .swiper-container', {
        slidesPerView: 2,
        spaceBetween: 0,
        loop: false,
        freeMode: true,
        scrollbar: {
            el: '.swiper-scrollbar',
        }
    });


}

setTimeout(() => {
    $PRELOADER.addClass('-loaded');
    setTimeout(() => {
        $PRELOADER.hide();
    }, 400);
}, 400);