import loader from "./loader";
import alert from "./alert";
import axios from "axios";

exports.showHideResetTab = () => {
  const tab = document.getElementById("resetmail-main");
  const login_c = document.getElementById("login_container");
  if (tab && login_c) {
    if (tab.style.display == "none") {
      tab.style.display = "block";
      login_c.style.display = "none";
    } else {
      tab.style.display = "none";
      login_c.style.display = "block";
    }
  }
};
exports.sendResetRequest = async () => {
  loader.showLoader("resetmail-main");
  const emailInput = document.getElementById("reset-mail");
  const resetBtn = document.getElementById("reset-btn");
  if (email && resetBtn) {
    try {
      const res = await axios({
        method: "POST",
        url: "/api/v0/user/forgotepassword",
        data: {
          email: emailInput.value,
        },
      });
      if (res.data.status == "success") {
        loader.hideLoder();
        alert.show("success", res.data.message, "resetmail-main");
        setTimeout(() => {
          this.showHideResetTab();
          alert.hide();
        }, 7000);
      }
    } catch (err) {
      loader.hideLoder();
      alert.show("error", err.response.data.message, "resetmail-main");
      setTimeout(() => {
        alert.hide();
      }, 3000);
    }
  }
};
exports.forgotPassReset = async () => {
  loader.showLoader("login_container");
  const password = document.getElementById("reset-password").value;
  const passwordConfirm = document.getElementById("reset-password-confirm")
    .value;
  const token = document.getElementById("forgot-reset").dataset.token;
  if (password && passwordConfirm) {
    if (password !== passwordConfirm) {
      loader.hideLoder();
      alert.show(
        "error",
        "New passwords are not identical!",
        "login_container"
      );
      setTimeout(() => {
        alert.hide();
      }, 3000);
    } else {
      if (password.length < 8) {
        loader.hideLoder();
        alert.show(
          "error",
          "Password should have more then 8 char.",
          "login_container"
        );
        setTimeout(() => {
          alert.hide();
        }, 3000);
      } else {
        try {
          const res = await axios({
            method: "POST",
            url: "/api/v0/user/resetpassword/" + token,
            data: {
              password,
              passwordConfirm,
            },
          });
          if (res.data.status == "success") {
            loader.hideLoder();
            alert.show(
              "success",
              "Password updated successfully!",
              "login_container"
            );
            window.setTimeout(() => {
              location.assign("/facultyzone/");
            }, 3000);
          }
        } catch (err) {
          loader.hideLoder();
          alert.show("error", err.response.data.message, "login_container");
          setTimeout(() => {
            alert.hide();
          }, 3000);
        }
      }
    }
  }
};
