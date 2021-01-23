import "@babel/polyfill";
import dsh from "./dashboardList";
import auth from "./auth";
import axios from "axios";

$(document).ready(() => {
  // Dashboard List ACTIONS
  $("#confirm-btn").click(() => {
    dsh.setDash(
      "Confirmed",
      "border-left-success",
      "/api/v0/admin/confirmList"
    );
  });
  $("#padding-btn").click(() => {
    dsh.setDash("Pending", "border-left-warning", "/api/v0/admin/pending");
  });
  $("#total-btn").click(() => {
    dsh.setDash(
      "TOTAL REGISTRATIONS",
      "border-left-info",
      "/api/v0/admin/allData"
    );
  });
  $("#newReg-btn").click(() => {
    dsh.setDash(
      "TOTAL REGISTRATIONS",
      "border-left-primary",
      "/api/v0/admin/newregistrations"
    );
  });
  // Admin Login
  $("#adminLogin").submit(async (event) => {
    event.preventDefault();
    auth.adminLogin();
  });
  // Log Out
  $("#logout").click(async (event) => {
    try {
      const res = await axios({
        method: "GET",
        url: "/api/v0/admin/logout",
      });
      if (res.data.status == "success") {
        $("#ovelay-content").html(
          `<div id="content-c">
          <div class="py-4 text-center bg-success text-white px-5">
            Loged out Successfully....
          </div></div>`
        );
        overlayOn();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (err) {
      $("#ovelay-content").html(
        `<div id="content-c">
          <div class="py-4 text-center bg-danger text-white px-5">
            Somthing went wrong....
          </div></div>`
      );
      overlayOn();
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  });

  // Document Ready funtion ended
});
