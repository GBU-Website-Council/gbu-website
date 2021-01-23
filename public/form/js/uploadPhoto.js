import Cropper from "./../cropperjs/dist/cropper";
import loader from "./loader";
import alert from "./alert";
import axios from "axios";
//
const currentPhoto = document.getElementById("currentInput");
const fileInput = document.getElementById("fileInput");
const photo = document.getElementById("ImageCrop");
const inputLable = document.getElementById("inputLable");
const slider = document.getElementById("cropperDeg");
const crop = document.getElementById("cropperDeg");
const profileImage = document.getElementById("profile-image");
const userNavimg = document.getElementById("user-nav-image");
const uploadImagePopup = document.getElementById("upload-image-from");
const uploadBtn = document.getElementById("Upload_photo");
var cropper;
//
exports.showPopu = () => {
  const imagePopup = document.getElementById("image-popup");
  if (imagePopup) {
    imagePopup.style.display = "block";
  }
};
const hidePopu = () => {
  const imagePopup = document.getElementById("image-popup");
  if (imagePopup) {
    imagePopup.style.display = "none";
  }
};
exports.hidePopu = () => {
  const imagePopup = document.getElementById("image-popup");
  if (imagePopup) {
    imagePopup.style.display = "none";
  }
  if (cropper) {
    cropper.destroy();
    shSelectBtn("show");
  }
};

exports.cropPhoto = () => {
  //Selecting current file for cropper
  if (currentPhoto) {
    currentPhoto.addEventListener(
      "click",
      () => {
        // Setting display
        shSelectBtn("hide");
        //setting file to cropper
        if (photo.src) {
          cropper = new Cropper(photo, {
            preview: "#divPreview",
            aspectRatio: 4 / 5,
          });
          // cropperRotate(cropper);
          var lastDeg = 180;
          crop.oninput = (el) => {
            // console.log(el.srcElement.valueAsNumber);
            if (el.srcElement.valueAsNumber > lastDeg) {
              var rotate = el.srcElement.valueAsNumber - lastDeg;
              cropper.rotate(rotate);
              lastDeg = el.srcElement.valueAsNumber;
            } else {
              var rotate = el.srcElement.valueAsNumber - lastDeg;
              cropper.rotate(rotate);
              lastDeg = el.srcElement.valueAsNumber;
            }
          };
        }
      },
      false
    );
  }
  //   selecting file for cropper from disk
  if (fileInput) {
    fileInput.addEventListener(
      "change",
      (event) => {
        const fileData = fileInput.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(fileData);
        reader.onload = () => {
          // Setting display
          shSelectBtn("hide");
          //setting file to cropper
          photo.src = reader.result;
          cropper = new Cropper(photo, {
            preview: "#divPreview",
            aspectRatio: 4 / 5,
          });
          // cropperRotate(cropper);
          var lastDeg = 180;
          crop.oninput = (el) => {
            // console.log(el.srcElement.valueAsNumber);
            if (el.srcElement.valueAsNumber > lastDeg) {
              var rotate = el.srcElement.valueAsNumber - lastDeg;
              cropper.rotate(rotate);
              lastDeg = el.srcElement.valueAsNumber;
            } else {
              var rotate = el.srcElement.valueAsNumber - lastDeg;
              cropper.rotate(rotate);
              lastDeg = el.srcElement.valueAsNumber;
            }
          };
        };
      },
      false
    );
  }
  //  Upload image

  uploadImagePopup.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      loader.showLoader("upload-image-from");
      console.log("hello");
      const canvas = cropper.getCroppedCanvas({
        width: 300,
        height: 375,
        minWidth: 200,
        minHeight: 250,
        maxWidth: 3200,
        maxHeight: 4000,
        fillColor: "#fff",
        imageSmoothingEnabled: true,
        imageSmoothingQuality: "high",
      });

      canvas.toBlob((blob) => {
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
          var base64data = reader.result;
          try {
            const res = await axios({
              method: "POST",
              url: "/api/v0/user/updatephoto",
              data: {
                image: base64data,
              },
            });
            if (res.data.status == "success") {
              cropper.destroy();
              if (profileImage) profileImage.src = base64data;
              if (userNavimg) userNavimg.src = base64data;
              photo.src = base64data;
              loader.hideLoder();
              alert.show("success", res.data.message, "upload-image-from");
              setTimeout(() => {
                shSelectBtn("show");
                alert.hide();
                hidePopu();
              }, 2000);
            }
          } catch (err) {
            loader.hideLoder();
            alert.show("error", err.response.data.message, "upload-image-from");
            setTimeout(() => {
              alert.hide();
              this.hidePopu();
            }, 2000);
          }
        };
      });
    },
    false
  );
};
// Setting file select btn
const shSelectBtn = (op) => {
  if (op == "hide") {
    slider.style.display = "block";
    uploadBtn.style.display = "initial";
    inputLable.style.display = "none";
    currentPhoto.style.display = "none";
  }
  if (op == "show") {
    slider.style.display = "none";
    uploadBtn.style.display = "none";
    inputLable.style.display = "inline-block";
    currentPhoto.style.display = "inline-block";
  }
};
