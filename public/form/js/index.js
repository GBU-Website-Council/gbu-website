import "@babel/polyfill";
import axios from "axios";
import login from "./loginResistration";
import profile from "./profile";
import loader from "./loader";
import alert from "./alert";
import passReset from "./passwordReset";
import uploadPhoto from "./uploadPhoto";
import { contactFun, getSetData, postData } from "./inputFiel";

const mainfun = () => {
  //Gettin data from server
  const setFormFields = async (link) => {
    if (dataFiels) {
      dataFiels.style.display = "none";
      dataFiels.dataset.form = link;
      await axios
        .get("/api/v0/dataform/" + link)
        .then(function (response) {
          if (link == "contact") {
            // Setting html of contact page only
            dataFiels.innerHTML = contactFun(
              response.data.data,
              response.data.fields
            );
          } else {
            // setting html of all page except contact
            dataFiels.innerHTML = "";
            dataFiels.innerHTML = getSetData(
              response.data.data,
              response.data.fields
            );
            Object.keys(response.data.fields).forEach((el) => {
              CKEDITOR.replace(el);
            });
          }
        })
        .catch(function (error) {
          // handle error
          alert.show("error", err.response.data.message, "form-content");
          setTimeout(() => {
            alert.hide();
          }, 1000);
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
      CKEDITOR.formLink = link;
    }
    // setTimeout(() => {
    dataFiels.style.display = "block";
    loader.hideLoder();
    // }, 1000);
  };
  // Posting data to server
  const postForm = () => {
    // console.log(CKEDITOR.instances.academics.getData());
    if (CKEDITOR || CKEDITOR.formLink == "contact") {
      if (CKEDITOR.formLink == "contact") {
        const url = "/api/v0/dataform/" + CKEDITOR.formLink;
        const data = new Object();
        data.contact_information = document
          .getElementById("contact_information")
          .value.trim();
        data.office_number = document
          .getElementById("office_number")
          .value.trim();

        data.contact_phone_number = document.getElementById("contact_phone_number").value.trim();

        data.contact_email = document
          .getElementById("contact_email")
          .value.trim();

        data.correspondence_address = document
          .getElementById("correspondence_address")
          .value.trim();
          


        data.contact_phone_number_code = document
          .getElementById("contact_phone_number_code").value;
        data.correspondence_phone_number_code = document
          .getElementById("correspondence_phone_number_code").value;

          console.log(data.contact_phone_number_code);
          console.log(data.correspondence_phone_number_code);

        data.correspondence_phone_number = document.getElementById("correspondence_phone_number").value.trim();
        data.correspondence_email = document
          .getElementById("correspondence_email")
          .value.trim();


        if (data.contact_phone_number == data.correspondence_phone_number) {
          loader.hideLoder();
          alert.show(
            "error",
            "Phone number and corresponding number cannot be same.",
            "form-content"
          );
          setTimeout(() => {
            alert.hide();
          }, 3000);
          return 0;
        } else if (data.contact_email == data.correspondence_email) {
          loader.hideLoder();
          alert.show(
            "error",
            "Email and corresponding email cannot be same.",
            "form-content"
          );
          setTimeout(() => {
            alert.hide();
          }, 3000);
          return 0;
        } else {
          postData(data, url);
        }
      } else {
        const url = "/api/v0/dataform/" + CKEDITOR.formLink;
        const body = CKEDITOR.instances;
        const data = new Object();
        Object.keys(body).forEach((el) => {
          data[el] = body[el].getData().trim();
        });
        postData(data, url);
      }
    } else {
      console.log("somthing is wrong please reload the page");
    }
  };
  // FORM SUBMITTING
  const bio = document.getElementById("btnbio");
  const teaching = document.getElementById("btnteaching");
  const researchs = document.getElementById("btnresearchs");
  const publications = document.getElementById("btnpublications");
  const students = document.getElementById("btnstudents");
  const contact = document.getElementById("btncontact");

  const dataFiels = document.getElementById("data-field");
  const submit = document.getElementById("data-form-all");

  if (bio || teaching || researchs || publications || students || contact) {
    // GETTING DATA FROM SERVER
    bio.addEventListener(
      "click",
      async () => {
        loader.showLoader("form-content");
        setFormFields("bio");
      },
      false
    );
    teaching.addEventListener(
      "click",
      () => {
        loader.showLoader("form-content");
        setFormFields("teaching");
      },
      false
    );
    researchs.addEventListener(
      "click",
      () => {
        loader.showLoader("form-content");
        setFormFields("research");
      },
      false
    );
    publications.addEventListener(
      "click",
      () => {
        loader.showLoader("form-content");
        setFormFields("publications");
      },
      false
    );
    students.addEventListener(
      "click",
      () => {
        loader.showLoader("form-content");
        setFormFields("students");
      },
      false
    );
    contact.addEventListener(
      "click",
      () => {
        loader.showLoader("form-content");
        setFormFields("contact");
      },
      false
    );

    // SUBMITTING DATA TO SERVER
  }
  if (submit) {
    submit.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        loader.showLoader("form-content");
        postForm();
      },
      false
    );
  }

  // DEFAULT CALLING TO SET HTML AL LOADING
  if (dataFiels) {
    setFormFields("bio");
  }
  // FROM LOGIN PAGE ACTIVITY
  const loginBtn = document.getElementById("login_form");
  const resiterBtn = document.getElementById("resister_form");
  login.pageOpen();
  if (loginBtn) {
    login.login(loginBtn);
  }
  //RESISTRATION
  if (resiterBtn) {
    login.registration(resiterBtn);
  }
  // hide error
  login.error_hide();
  //
  //PROFILE PAGE UPDATION
  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    const name = document.getElementById("name");
    const position = document.getElementById("position");
    const school = document.getElementById("school");
    const qualification = document.getElementById("qualification");
    const field_of_teaching = document.getElementById("field_of_teaching");
    profileForm.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        loader.showLoader("form-content");
        const data = new Object();
        data.name = name.value.trim();
        data.position = position.value.trim();
        data.school = school.value.trim();
        data.qualification = qualification.value.trim();
        data.field_of_teaching = field_of_teaching.value.trim();
        profile.profileSubmit(data);
      },
      false
    );
  }

  // LOG OUT BUTTON
  const logOutbtn = document.getElementById("log-out");
  if (logOutbtn) {
    logOutbtn.addEventListener(
      "click",
      () => {
        const tf = () => {
          return confirm("Are you sure you want to logout ?");
        };
        if (tf()) {
          login.logOut();
        }
      },
      false
    );
  }
  //Updating password
  const updatePassword = document.getElementById("password-form");
  if (updatePassword) {
    updatePassword.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        loader.showLoader("password-form");
        login.savePassword();
      },
      false
    );
  }
  // Reset  tab setting
  const resetTabOpen = document.getElementById("rest-tab-link");
  const resetTabClose = document.getElementById("close-reset");
  const resetForm = document.getElementById("reset-form");
  if (resetTabOpen && resetTabClose && resetForm) {
    resetTabOpen.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        passReset.showHideResetTab();
      },
      false
    );
    resetTabClose.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        passReset.showHideResetTab();
      },
      false
    );
    resetForm.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        passReset.sendResetRequest();
      },
      false
    );
  }
  // SUBMIT RESET FORM PASWORD
  const forgotReset = document.getElementById("forgot-reset");
  if (forgotReset) {
    forgotReset.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        passReset.forgotPassReset();
      },
      false
    );
  }
  // Upload image
  const uploadImagePopup = document.getElementById("upload-image-from");
  const openPop = document.getElementById("l-photo");
  const closePop = document.getElementById("close_popup");
  if (uploadImagePopup && openPop && closePop) {
    uploadPhoto.cropPhoto();
    openPop.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        uploadPhoto.showPopu();
      },
      false
    );
    closePop.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        uploadPhoto.hidePopu();
      },
      false
    );
  }
  //  SHOWING AND HIDIG THE PASSWORD
  const showHide = document.getElementById("showHide");
  const password = document.querySelector("[type=password]");
  if (password) {
    password.style.padding = "1.5rem 3rem 1.5rem 1rem";
    let el = document.createElement("i");
    let parent = password.parentNode;
    parent.insertBefore(el, password);
    parent.style.position = "relative";
    el.style =
      "position: absolute;width: 30px;height: 50px;z-index: 100;visibility: visible;top: 0px;right: 10px;padding:1rem 0; border-radius:0 10rem 10rem 0";
    el.classList.add("fa");
    el.classList.add("fa-eye-slash");

    if (el) {
      el.addEventListener(
        "click",
        () => {
          if (password.type == "password") {
            password.type = "text";
            el.classList.remove("fa-eye-slash");
            el.classList.add("fa-eye");
            console.log("sadjfksd");
          } else {
            password.type = "password";
            el.classList.add("fa-eye-slash");
            el.classList.remove("fa-eye");
            console.log("Hello else");
          }
        },
        false
      );
    }
  }
  // VIEW ALL JS
  // CHANGING ACITIVE CLASS OFTAB
  $("#navbarNav .navbar-nav a").on("click", function () {
    $("#navbarNav .navbar-nav").find("li.active").removeClass("active");
    $(this).parent("li").addClass("active");
  });
};
document.docReady = (fn) => {
  // see if DOM is already available
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    // call on next available tick
    setTimeout(fn, 100);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
};
//On document ready
document.docReady(mainfun);
