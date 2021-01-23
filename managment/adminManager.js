const mongoose = require("mongoose");
const prompt = require("prompt");
const validator = require('validator')
const adminAuthController = require('./../controller/adminAuthController')
const User = require('./../models/adminModel')
const DB = "mongodb://localhost:27017/gbu_website";

const options = () => {
  console.log("                Please choose one of these following options");
  console.log(" ");
  console.log(">> Create Root user:             --create-root ");
  console.log(">> Change Root password:         --ch-pass-root ");
  console.log(">> Change Root email:            --ch-email-root ");
  console.log(">> Change Root Name:             --ch-name-root ");
  process.exit();
};

const root = [
  {
    name: "Name",
    validator: /^[a-zA-Z\s\-]+$/,
    warning: "Username must be only letters, spaces, or dashes",
  },
  {
    name: "Email",
  },
  {
    name: "Password",
    hidden: true,
  },
  {
    name: "PasswordConfirm",
    hidden: true,
  },
];

const dbConnection = async () => {
  try {
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

const action = async (action) => {
  try {
    await dbConnection();
     if (action == "--create-root") {
      prompt.get(root, async (err, result) => {
        if (err) {
          return console.log(err);
        }
        var oldUser;
        oldUser = await User.findOne({role : 'root'});
        if (oldUser) {
          console.log("\n>>> A root user alrady exist.\n>>> Only one root can exist.");
          console.log(">>> The root user's username is " + oldUser.email);
          process.exit(1)
        }
        oldUser = await User.findOne({email : result.Email});
        if (oldUser) {
          console.log("\n>>> This email id is used by another user.");
          console.log("\n>>> Please use diffrent email.");
          process.exit(1)
        }
        const newUser = await User.create({
          name: result.Name,
          email: result.Email,
          password: result.Password,
          role : 'root',
          passwordConfirm: result.PasswordConfirm,
        });
        // const done = await newUser.save();
        if (newUser) {
          console.log("\n>>> Root User Successfully created with the username: " + newUser.email);
          process.exit(0);
        }
      });
     }
     if (action == "--ch-pass-root") {
        var oldUser;
        oldUser = await User.findOne({role : 'root'});
        if (!oldUser) {
          console.log("\n>>> Root user not  found.");
          process.exit(1)
        }
        console.log("\n>> Root is " + oldUser.name + " username is " + oldUser.email);
        prompt.get([{name :'NewPassword'}, 'PasswordConfirm'], async (err,result) => {
          if (result.NewPassword !== result.PasswordConfirm) {
            console.log(">> Password are not same.");            
            process.exit(2)
          }
          oldUser.password = result.NewPassword;
          oldUser.passwordConfirm = result.PasswordConfirm;
          if(! await oldUser.save()){
            console.log(">> Password updation faield!.");
            process.exit(3);
          }     
          console.log(">> Password updated successfully.");
          process.exit(4);
        });
      }
     if (action == "--ch-email-root") {
        var oldUser;
        oldUser = await User.findOne({role : 'root'});
        if (!oldUser) {
          console.log("\n>>> Root user not  found.");
          process.exit(1)
        }
        console.log("\n>> Root is " + oldUser.name + " username is " + oldUser.email);
        prompt.get([{name :'email', validator : /^[a-zA-Z\s\@.]+$/}, 'confirm'], async (err,result) => {
          if (result.email !== result.confirm) {
            console.log(">> Email are not same.");            
            process.exit(2)
          }
          
          if (!result.email.includes('@') || !result.email.includes('.')) {
            console.log(">> Please provide a valide email id.");            
            process.exit(2)
          }

          oldUser.email = result.email;
          const update =  await oldUser.save({validateBeforeSave : false})
          if(!update){
            console.log(">> Email updation faield!.");
            process.exit(3);
          }     
          console.log(">> Email updated successfully, new username is '"+ update.email + "'.");
          process.exit(4);
        });
      }
     if (action == "--ch-name-root") {
        var oldUser;
        oldUser = await User.findOne({role : 'root'});
        if (!oldUser) {
          console.log("\n>>> Root user not  found.");
          process.exit(1)
        }
        console.log("\n>> Root is " + oldUser.name + " username is " + oldUser.email);
        prompt.get([{name :'name', validator : /^[a-zA-Z\s\_]+$/}], async (err,result) => {
          if (result.name.length < 4) {
            console.log(">> Name is too sort.");
            process.exit(3);
          }
          oldUser.name = result.name;
          const update =  await oldUser.save({validateBeforeSave : false})
          if(!update){
            console.log(">> Name updation faield!.");
            process.exit(3);
          }     
          console.log(">> Name updated successfully, new name is '"+ update.name + "'.");
          process.exit(4);
        });
      }
  } catch(err){
    console.log('Operation failed. Please try again.');
    process.exit(0)
  }
}


// RUNNIG TART FROM HERE
console.log("\nWE are proessing request. . . . . . . \n");
const arg = process.argv[2];
if (arg) {
  action(arg); 
  //   return console.log("DONE");
} else {
  options();
}

process.on("unhandledRejection", (err) => {});
process.on("uncaughtException", (err) => {});