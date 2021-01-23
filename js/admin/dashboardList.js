import "@babel/polyfill";
import loader from "./loader";
import axios from "axios";

exports.setDash = (tag, color, url, page = "") => {
  return setList(tag, color, url, (page = ""));
};
const setList = async (tag, color, url, page = "") => {
  const tabContent = $("#tab-content");
  // Home
  var html = ` <div class="mb-2">
            <div class="card ${color} shadow h-100 py-2">
              <div class="row px-3 no-gutters align-items-center">
                <div class="col">
                  <div
                    class="text-xs font-weight-bold text-success text-uppercase mb-1"
                  >
                    ${tag}
                  </div>
                </div>
              </div>
            </div>
          </div>`;

  try {
    const res = await axios({
      method: "GET",
      url: url + "/" + page,
    });

    if (res.data.status == "success") {
      res.data.data.data.forEach((el) => {
        if (el.active) {
          el.active = "checked";
        } else {
          el.active = "";
        }
        html += `<div class="px-3">
          <!-- content tab start -->
          <div class="content-tab px-2" id="content-tab">
            <!-- content row start -->
            <div class="">
              <div class="row list-data-confirm ${color} align-items-center">
                <div class="col-md-6 py-2">
               
                  <div class="row align-items-center">
                    <div
                      class="col-12 text-left "
                      style="min-width: 71px"
                    >
                      <img
                        class="list-image"
                        src="/images/${el.image}"
                        alt="user"
                      />
                      <!-- </div>
                    <div class="col-10"> --> 
                      <a href="/faculty/${el.name}" target="_blank" rel="noopener noreferrer" style="color: rgba(102, 206, 119, 0.952); text-decoration: none;">
                      <h1 class="list-name d-inline ml-2 text-truncate">
                        ${el.name}
                      </h1> </a>
                    </div>
                  </div>
                 
                </div>
                <div class="col-md-6 list-action text-right">
                  <div class="switch d-inline py-2 mr-2">
                    <label class="switch user-status">
                      off
                      <input data-id="${el._id}" class="user-data-id" type="checkbox" ${el.active} />
                      <span class="slider round"></span>
                      on
                    </label>
                  </div>
                  <div class="d-inline">
                    <a
                      href="mailto:${el.email}"
                      class="py-2 my-2 px-3 mx-1 sb1 btn btn--green font-weight-lighter card-link"
                    >
                      Send Mail
                    </a>
                   
                    <button 
                      class="py-2 my-2 px-3 mx-1 sb1 btn bg-danger text-white-50 font-weight-lighter card-link delete-user"
                      data-id="${el._id}"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- content row end -->
          </div>
        </div>`;
      });

      let pbtn = "";
      for (let i = 1; i <= res.data.data.pages; i++) {
        if (i == res.data.data.currentPage) {
          pbtn += `<button data-pageNumber = "${i}" disabled ="disabled" class="p-2 m-2 text btn text-white bg-danger text-center d-inline">${i}</button>`;
          continue;
        }
        pbtn += `<button data-url = "${url}" data-pagenumber = "${i}" data-group = "${tag},${color}" class="p-2 m-2 text btn text-white bg-success text-center d-inline page-btn">${i}</button>`;
      }
      html += `<div class="py-2 w-100 bg-white text-center border-cicle my-3">
                  <div class="text-center" id="page-btn-group">
                    ${pbtn}
                  </div>
                </div>`;
      tabContent.html(html);
      userStatus();
      updatingPage();
      updateDashboard();
      deleteItem(tag, color, url, page);
    }
  } catch (err) {
    if (err.response.data.Error.statusCode == 401) {
      const html =
        `<div id="content-c">  <div class="bg-danger text-white text-center py-3 px-5 ">
          <h5 class="font-weight-lighter text-white text-center">
            You are logged out
          </h5>
        </div>` +
        `<div class="my-4 text-white text-center py-2 px-5 ">
          <a href="/administrator/login" class="btn font-weight-lighter bg-success text-white text-center">
           Login Again
          </a>
        </div></div>`;
      $("#ovelay-content").html(html);
      overlayOn();
    }
  }
};
// ??? Funtions
//
const userStatus = () => {
  let userStatus = $(".user-data-id");
  if (userStatus) {
    userStatus.on("change", (event) => {
      // API
      const id = event.currentTarget.dataset.id;
      const active = event.currentTarget.checked;
      if (id) {
        updataUserStatus(id, active);
      } else {
      }
    });
  }
};
// Updating dashboard data
const updataUserStatus = async (id, active) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "/api/v0/admin/updateuserstatus",
      data: {
        id,
        active,
      },
    });
    if (res.data.status == "success") {
      updateDashboard();
      loader.updator("success", "Updated successfuly....");
      setTimeout(() => {
        loader.updator();
      }, 3000);
    }
  } catch (err) {
    loader.updator("error", "Status updating faield....");
    setTimeout(() => {
      loader.updator();
    }, 3000);
  }
};
// Updating dashboard
const updateDashboard = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v0/admin/dashboard",
    });
    if (res.data.status == "success") {
      $("#pending-registrations").html(res.data.data.pending);
      $("#confirmed-registrations").html(res.data.data.confirmed);
      $("#total-registrations").html(res.data.data.totalRegistrations);
      $("#new-registrations").html(res.data.data.newRegistrations);
    }
  } catch (err) {}
};

// updating page
const updatingPage = async () => {
  try {
    $("#page-btn-group button").click((event) => {
      const url = event.currentTarget.dataset.url;
      const page = event.currentTarget.dataset.pagenumber;
      const group = event.currentTarget.dataset.group.split(",");
      setList(group[0], group[1], url, page);
    });
  } catch (err) {}
};

// Delete item
const deleteItem = (tag, color, url, page) => {
  // Dialog Box Opening
  $(".delete-user").click((event) => {
    const id = event.currentTarget.dataset.id;
    $("#ovelay-content").html(`<div id="content-c">
          <div class="p-5 bg-white" style="border-radius: 100px 0">
            <div id="del-form" class="px-5">
              <h3 class="my-3 py-3 font-weight-light">
                Please Confirm the Password
              </h3>
              <div class="form-group my-3">
                <label for="delete-confirm font-weight-light"
                  >Password :
                </label>
                <input
                  id = "del-password"
                  class="btn py-2 bg-light text-dark"
                  id="delete-confirm"
                  type="password"
                  placeholder="•••••••••••"
                />
              </div>
              <input id="del-id" type="hidden" name="id" value="${id}" />
              <div id="error" class="my-3 text-danger text-center"></div>
              <div id="success" class="my-3 text-success text-center"></div>
              <div class="form-group text-center">
                <button 
                id="confirm"
                  class="btn d-inline my-2 py-2 px-3 mx-3 bg-danger text-white"
                >
                  CONFIRM
                </button>
                <button 
                  onclick="overlayOff()"
                  id = "cancel"
                  class="btn d-inline my-2 py-2 px-3 mx-3 bg-success text-white"
                >
                  Cancel
                </button>
              </div>
              
            </div>
          </div>
        </div>`);

    overlayOn();
    deleteUser(tag, color, url, page);
  });
};
const deleteUser = async (tag, color, url, page = "") => {
  $("#confirm").click(async () => {
    $("#error").html("Deleting....");
    const password = $("#del-password").val();
    const id = $("#del-id").val();

    if (!password || !id) {
      $("#error").html("Please provide us a valide data.");
      return true;
    }
    $("#del-password").attr("disabled", "disabled");
    $("#del-password").css("cursor", "no-drop");
    $("#confirm").attr("disabled", "disabled");
    $("#confirm").css("cursor", "no-drop");
    $("#cancel").attr("disabled", "disabled");
    $("#cancel").css("cursor", "no-drop");
    try {
      const res = await axios({
        method: "DELETE",
        url: "/api/v0/admin/deleteuser",
        data: {
          password,
          id,
        },
      });
      // console.log(res);
      if (res.data.status == "success") {
        $("#error").html(" ");
        // updatingPage();
        $("#success").html("Deleted succesfully...");
        console.log(tag, color, url, page);
        setList(tag, color, url, page);
        setTimeout(() => {
          overlayOff();
        }, 3000);
      }
    } catch (err) {
      $("#error").html(err.response.data.data.message);
      "#error".html(" ");
      $("#del-password").removeAttr("disabled");
      $("#del-password").css("cursor", "default");
      $("#confirm").removeAttr("disabled");
      $("#confirm").css("cursor", "default");
      $("#cancel").removeAttr("disabled");
      $("#cancel").css("cursor", "default");
      setTimeout(() => {
        $;
      }, 3000);
    }
  });
};
