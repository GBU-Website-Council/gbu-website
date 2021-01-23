const loaderHtml = `<div class="lds-loader-main"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>`;
exports.showLoader = (element) => {
  let el = document.getElementById(element);
  if (!el) {
    el = document.querySelector("." + element);
    if (el) {
      el.style.position = "relative";
      el.insertAdjacentHTML("afterbegin", loaderHtml);
    }
  } else {
    el.style.position = "relative";
    el.insertAdjacentHTML("afterbegin", loaderHtml);
  }
};
exports.hideLoder = () => {
  const el = document.querySelector(".lds-loader-main");
  if (el) {
    el.parentElement.removeChild(el);
  }
};

exports.updator = (status = null, message = null) => {
  if (!status && !message) {
    const el = document.querySelector("#updator");
    if (el) {
      el.parentElement.removeChild(el);
    }
    return true;
  }
  if (status == "error") {
    var bg = "bg-danger";
  } else if (status == "success") {
    var bg = "bg-success";
  }
  let html = `<div id="updator" class="text-center mx-auto" style="z-index: 50; position: fixed;
    bottom: 5%;
    right: 50%;
    left: 50%;">
    <h3 class=" py-3 text-center px-5 ${bg} btn mx-auto text-white">
        ${message}
     </h3>
 </div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", html);
};
