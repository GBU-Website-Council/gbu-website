import "@babel/polyfill";
import loader from "./loader";
import axios from "axios";

exports.adminLogin = async () => {
  $("#login").html("Logning....");
  try {
    const data = new Object();
    const email = $("#email").val();
    const password = $("#password").val();
    if (!email || !password) {
      $("#error").html("All fields are compulsory....");
      setTimeout(() => {
        $("#error").html(" ");
        $("#login").html("Logning....");
      }, 5000);
      return true;
    }
    if (password.length < 8) {
      $("#error").html("Password should be minmum 9 char....");
      setTimeout(() => {
        $("#error").html(" ");
        $("#login").html("Logning....");
      }, 5000);
      return true;
    }
    const res = await axios({
      method: "POST",
      url: "/api/v0/admin/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status == "success") {
      $("#login").html("Logedin");
      window.location.reload();
    }
  } catch (err) {
    $("#error").html(err.response.data.message);
    setTimeout(() => {
      $("#login").html("Login");
    }, 5000);
  }
};
