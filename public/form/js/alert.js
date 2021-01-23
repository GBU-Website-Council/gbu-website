exports.show = (type, msg, fl) => {
  this.hide();
  const child = `<div class="alert_tab text-center"> <div class="con ${type} mx-5 "> <img class="d-inline" src="/form/img/${type}.png" alt="lert"> <h5 class="d-inline ">${msg}</h5> </div> </div>`;
  const elId = document.getElementById(fl); //.insertAdjacentHTML('afterbegin', child);
  if (elId) {
    elId.insertAdjacentHTML("afterbegin", child);
  } else {
    fl = document.querySelector(fl);
    if (fl) {
      fl.insertAdjacentHTML("afterbegin", child);
    } else {
      fl = "." + fl;
      fl = document.querySelector(fl);
      if (fl) {
        fl.insertAdjacentHTML("afterbegin", child);
      }
    }
  }
};
exports.hide = () => {
  const el = document.querySelector(".alert_tab");
  if (el) {
    el.parentElement.removeChild(el);
  }
};
