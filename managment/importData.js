const mongoose = require("mongoose");
const mysql = require("mysql");
const async = require("async");
const Faculty = require("../models/faculty");
const User = require("../models/userModel");
const { students } = require("../controller/formController");
const DB = "mongodb://localhost:27017/gbu_website";
var con;

const options = () => {
  console.log("                Please choose one of these following options");
  console.log("IMPORT :)");
  console.log(
    "   --import                : Import both USER and FACULTY DATA data."
  );
  // console.log(
  //   "   --import-user           : Import USER data. only. *NOTE it will require fill form data manualy."
  // );
  // console.log(
  //   "   --import-faculty        : Import Faculty data. only. *NOTE it will require fill form data manualy."
  // );
  console.log("\nCLEAR DB :)");
  console.log("   --delete-all            : Clear USER and FACULTY collection");
  process.exit();
};

const dbConnection = async () => {
  try {
    // MYSQL CONNETION
    con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Navidbpass#0000",
      database: "teacherdatabase",
    });
    await con.connect(function (err) {
      if (err) throw err;
      console.log("MYSQL DB Connected succesfully.......\n");
    });
    // MONGOOSE CONNEXTION
    await mongoose
      .connect(DB, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .then((con) => {
        console.log("\nMongoose Connected succesfully.......");
      });
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
};

// const userData = async () => {
//   let query = "SELECT * FROM users limit 1";
//   con.query(query, async (err, result) => {
//     try {
//       async.forEachOf(result, async (value, key, callback) => {
//         const data = Object.assign({}, value);
//         const user = new User();
//         for (var key in data) {
//           if (
//             data[key] == "" ||
//             data[key] == null ||
//             data[key] == undefined ||
//             data[key] == " " ||
//             key == "user_id" ||
//             key == "remember_me"
//           ) {
//             // Removing empty and unwanted fiels
//             delete data[key];
//           } else if (key == "password") {
//             // Password decoding
//             const pass = {
//               password: Buffer.from(data[key], "base64").toString(),
//               passwordConfirm: Buffer.from(data[key], "base64").toString(),
//             };
//             Object.assign(data, pass);
//             Object.assign(user, pass);
//           } else if (key == "username") {
//             // Username changing
//             Object.defineProperty(
//               data,
//               "email",
//               Object.getOwnPropertyDescriptor(data, key)
//             );
//             user["email"] = data[key];
//             delete data[key];
//           } else {
//             user[key] = data[key];
//           }
//         }
//         await user.save();
//       });
//     } catch (err) {
//       console.log(err);
//       process.exit();
//     }
//   });
//   console.log(
//     "Data imported successfully. . . . . . \nFor exit press : Ctrl+C "
//   );
//   process.exit();
// };

// const formData = async () => {
//   let query = "SELECT * FROM teacherdata limit 1";

//   con.query(query, async (err, result) => {
//     try {
//       async.forEachOf(result, async (value, key, callback) => {
//         const data = Object.assign({}, value);
//         const faculty = new Faculty();
//         for (var key in data) {
//           if (
//             data[key] == "" ||
//             data[key] == null ||
//             data[key] == undefined ||
//             data[key] == " "
//           )
//             delete data[key];
//           else {
//             faculty[key] = data[key];
//           }
//         }
//         await faculty.save();
//       });
//     } catch (err) {
//       console.log(err);
//       process.exit(0);
//     }
//   });
//   console.log(
//     "Data imported successfully. . . . . . \nFor exit press : Ctrl+C "
//   );
// };

const importUserFormData = async () => {
  try {
    await dbConnection().then(() => {
      let query = "SELECT * FROM users";
      con.query(query, async (err, result) => {
        try {
          async
            .forEachOf(result, async (value, key, callback) => {
              const data = Object.assign({}, value);
              const user = new User();
              for (var key in data) {
                if (
                  data[key] == "" ||
                  data[key] == null ||
                  data[key] == undefined ||
                  data[key] == " " ||
                  key == "user_id" ||
                  key == "remember_me"
                ) {
                  // Removing empty and unwanted fiels
                  delete data[key];
                } else if (key == "password") {
                  // Password decoding
                  const pass = {
                    password: Buffer.from(data[key], "base64").toString(),
                    passwordConfirm: Buffer.from(
                      data[key],
                      "base64"
                    ).toString(),
                  };
                  Object.assign(data, pass);
                  Object.assign(user, pass);
                } else if (key == "username") {
                  // Username changing
                  Object.defineProperty(
                    data,
                    "email",
                    Object.getOwnPropertyDescriptor(data, key)
                  );
                  user["email"] = data[key];
                  delete data[key];
                } else {
                  user[key] = data[key];
                }
              }
              await user.save().then(async (err) => {
                const userDoc = await Faculty.findOne({ userId: user._id });
                const fdQuery =
                  "SELECT * FROM teacherdata WHERE username = '" +
                  user.email +
                  "'";
                con.query(fdQuery, async (err, result) => {
                  try {
                    async.forEachOf(result, async (value, key, callback) => {
                      const data = Object.assign({}, value);
                      for (var key in data) {
                        if (
                          data[key] == "" ||
                          data[key] == null ||
                          data[key] == undefined ||
                          data[key] == " " ||
                          key == "id"
                        )
                          delete data[key];
                        else {
                          userDoc[key] = data[key];
                        }
                      }
                      await userDoc.save();
                    });
                  } catch (err) {
                    console.log(err);
                  }
                });
              });
              console.log({ name: user.name, email: user.email });
            })
            .then(() => { });
        } catch (err) {
          console.log(err);
          process.exit();
        }
      });
    });
  } catch (error) {
    console.log(error);
    process.exit();
  }
  console.log(
    "\nData imported successfully. . . . . . \nFor exit press : Ctrl+C "
  );
};

const deleteAll = async () => {
  try {
    await User.deleteMany().then(async () => {
      await Faculty.deleteMany().then(() => {
        console.log(
          "Data deleted Sucessfully. . . . . . .\nPress Ctrl+C TO exit"
        );
      });
    });
  } catch (error) {
    console.log(error);
    // process.exit(0);
  }
  process.exit();
};

// SET Empty image to default.jpg
const setImageDefault = async () => {
  try {
    const user = await Faculty.find({ image: null }).then(async (err, res) => {
      console.log(err.name);
      // if (err) return console.log(err);
      // res.image = 'default.jpg';
      // await res.save().then((err, res) => {
      //   console.log(res.name);
      // });
    });
    // console.log(user);
  } catch (err) {

  }
}

// RUNNIG TART FROM HERE
console.log("\nWE are proessing request. . . . . . . \n");
const action = process.argv[2];
if (action) {
  if (action == "--import") {
    importUserFormData();

    // } else if (action == "--import-user") {
    //   try {
    //     dbConnection().then((el) => {
    //       userData().then((el) =>
    //         console.log("User data imported successfully...")
    //       );
    //     });
    //   } catch (error) {
    //     console.log(error);
    //     process.exit(0);
    //   }
    // } else if (action == "--import-faculty") {
    //   try {
    //     formData().then((el) =>
    //       console.log("Form data imported successfully...")
    //     );
    //   } catch (error) {
    //     console.log(error);
    //     process.exit(0);
    //   }
    // } else if (action == "--delete-all") {
  } else if (action == "--delete-all") {
    dbConnection().then(async () => {
      deleteAll();
    });
  } else if (action == '--set-image-default') {
    dbConnection().then(async () => {
      setImageDefault();
    });
  } else {
    options();
  }
} else {
  options();
}

process.on("unhandledRejection", (err) => {});
process.on("uncaughtException", (err) => {});