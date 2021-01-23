import axios from "axios";
import alert from "./alert";
import loader from "./loader";
import inputField from "./inputFiel";

exports.pageOpen = () => {
  const resistrationTab = document.getElementById("resister_tab");
  const loginTab = document.getElementById("login_tab");
  const resetmailMain = document.getElementById("resetmail-main");
  const resPage = document.getElementById("resitration_container");
  const loginPage = document.getElementById("login_container");

  if (loginTab && resistrationTab) {
    loginTab.addEventListener(
      "click",
      () => {
        resetmailMain.style.display = "none";
        resPage.style.display = "none";
        loginPage.style.display = "block";
        loginTab.style.display = "none";
        resistrationTab.style.display = "block";
      },
      false
    );
    resistrationTab.addEventListener(
      "click",
      () => {
        resetmailMain.style.display = "none";
        loginPage.style.display = "none";
        resPage.style.display = "block";
        resistrationTab.style.display = "none";
        loginTab.style.display = "block";
      },
      false
    );
  }
};

exports.login = async (btn) => {
  btn.addEventListener(
    "submit",
    async (event) => {
      loader.showLoader("loginBox");
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      console.log("loggining");
      try {
        const res = await axios({
          method: "POST",
          url: "/api/v0/user/login",
          data: {
            email,
            password,
          },
        });
        if (res.data.status == "success") {
          loader.hideLoder();
          alert.show("success", "Successfully logedin....!", "loginBox");
          setTimeout(() => {
            location.reload();
          }, 3000);
        }
      } catch (err) {
        loader.hideLoder();
        alert.show("error", err.response.data.message, "loginBox");
        setTimeout(alert.hide, 4000);
      }
    },
    false
  );
};
exports.registration = async (btn) => {
  btn.addEventListener(
    "submit",
    async (event) => {
      loader.showLoader("resisterBox");
      event.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("remail").value;
      const password = document.getElementById("rpassword").value;
      const passwordConfirm = document.getElementById("rpasswordConfirm").value;
      if (email == null && password == null && passwordConfirm == null) {
        loader.hideLoder();
        alert.show("error", "All fields should not be empty!", "resisterBox");
        setTimeout(alert.hide, 4000);
        return 0;
      } else if (password !== passwordConfirm) {
        loader.hideLoder();
        alert.show("error", "Passwords are not same!", "resisterBox");
        setTimeout(alert.hide, 4000);
        return 0;
      } else {
        try {
          const res = await axios({
            method: "POST",
            url: "/api/v0/user/signup",
            data: {
              name,
              email,
              password,
              passwordConfirm,
            },
          });
          // console.log(res.data);
          if (res.data.status == "success") {
            loader.hideLoder();
            alert.show(
              "success",
              "You are successfully resistered...!",
              "resisterBox"
            );
            window.setTimeout(() => {
              location.assign("/facultyzone");
            }, 1500);
          }
        } catch (err) {
          // console.log(err.response.data);
          loader.hideLoder();
          alert.show("error", err.response.data.message, "resisterBox");
          setTimeout(alert.hide, 4000);
        }
      }
    },
    false
  );
};

exports.logOut = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v0/user/logout",
    });
    if (res.data.status == "success") {
      alert.show("success", "Logged out successfully.", "body");
      window.setTimeout(() => {
        location.reload();
      }, 3000);
    }
  } catch (err) {
    alert.show("error", err.response.data.message, "body");
    setTimeout(() => {
      alert.hide();
    }, 1500);
  }
};

exports.error_hide = () => {
  const el = document.getElementById("error_message");
  const elform = document.getElementById("loginBox");
  if (el && elform) {
    elform.addEventListener(
      "click",
      () => {
        el.style.visibility = "hidden";
      },
      false
    );
  }
};

exports.savePassword = async () => {
  const data = new Object();
  data.currentPassword = document.getElementById("current_password").value;
  data.password = document.getElementById("password").value;
  data.passwordConfirm = document.getElementById("passwordConfirm").value;
  if (data.password !== data.passwordConfirm) {
    loader.hideLoder();
    alert.show("error", "New passwords are not same!", "password-form");
    setTimeout(() => {
      alert.hide();
    }, 3000);
    return 0;
  }
  try {
    // console.log("Posting");
    const res = await axios({
      method: "POST",
      url: "/api/v0/user/updatepass",
      data,
    });
    if (res.data.status == "success") {
      document.getElementById("current_password").value = "";
      document.getElementById("password").value = "";
      document.getElementById("passwordConfirm").value = "";
      loader.hideLoder();
      alert.show("success", "Updated", "password-form");
      setTimeout(() => {
        alert.hide();
      }, 3000);
    }
  } catch (err) {
    loader.hideLoder();
    alert.show("error", err.response.data.message, "password-form");
    setTimeout(() => {
      alert.hide();
    }, 3000);
    // console.log(error);
  }
};
