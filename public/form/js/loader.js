const loaderHtml = `<div class="lds-loader-main"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>`;
exports.showLoader = (element) => {
    let el = document.getElementById(element);
    if (!el) {
        el = document.querySelector('.' + element);
        if (el) {
            el.style.position = 'relative';
            el.insertAdjacentHTML('afterbegin', loaderHtml);
        }
    } else {
        el.style.position = 'relative';
        el.insertAdjacentHTML('afterbegin', loaderHtml);
    }
}
exports.hideLoder = () => {
    const el = document.querySelector('.lds-loader-main');
    if (el) {
        el.parentElement.removeChild(el);
    }
}
