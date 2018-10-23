import $ from '../../node_modules/jquery';

import tingle from "../../node_modules/tingle.js"

const FORMS_URL_API = '/forms.php';

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
        $('.-modal-inner').html('');
        $('.-modal-inner').html('');
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

$('.open-video').click((e) => {
    e.preventDefault();

    const $VIDEO_MODAL = $('<div id="video"></div>');
    $VIDEO_MODAL.append('<div class="video-player"></div>');

    const $this = $(e.target);
    const _videoLink = $this.data('video');
    if (!_videoLink) {
        console.error('Attr [data-video] is required');
    }
    const frame = `<iframe width="100%" height="480" src="${_videoLink}?autoplay=1&rel=0&showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    $VIDEO_MODAL.find('.video-player').html(frame);
    openModal($VIDEO_MODAL);
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