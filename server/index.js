const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const server = require("http").Server(app);
const cors = require("cors")();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const Profile = require("./model/profile");
require("dotenv").config();
const port = process.env.PORT || 3030;

mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://localhost:27017/UPAPP");
mongoose.connect(process.env.DB_ROMTE);

mongoose.connection.on("connected", function() {
  console.log(
    "Mongoose default connection open to " + "mongodb://localhost:27017/UPAPP"
  );
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(cors);

const storage = multer.diskStorage({
  destination: __dirname + "/media/",
  filename(req, file, cb) {
    console.log("multer", file);
    cb(null, `${new Date()}-${file.originalname}`);
  }
});

const upload = multer({ storage });
const jpgextension = type => {
  if (type.substring(type.indexOf(".")) === ".jpg") {
    return type.substring(0, type.indexOf(".")) + ".jpeg";
  }
  return type;
};

/**
 * add middleware
 */
app.use(express.static(path.resolve(__dirname, "..", "client/build")));
app.use("/media", express.static(path.join(__dirname, "media")));
/**
 * get user list to home page
 * handles GET request
 * @param object req
 * @return json
 */
app.get("/getUsers", (req, res, next) => {
  Profile.find({}, (err, user) => {
    if (err) {
      return next(err);
    }
    res.json(user);
  });
});

/**
 * add new user
 * handles POST request
 * @param object req
 * @return json
 */
app.post("/addUser", upload.single("file"), (req, res) => {
  let newUser = new Profile({
    firstname: req.body.fname,
    lastname: req.body.lname,
    address: req.body.address,
    ccode: req.body.ccode,
    contact: req.body.contact,
    dob: req.body.dob,
    email: req.body.email,
    image: jpgextension(req.body.image)
  });
  newUser.save(function(err, user) {
    if (err) {
      console.log(err);
    }
    res.json(user);
  });
});

/**
 * upload image
 * handles POST request
 * @param object req
 * @return json
 */
app.post("/userfile", upload.single("file"), function(req, res) {
  let file =
    __dirname +
    "/media/" +
    req.body.filename +
    "." +
    req.file.mimetype.substring(6);
  fs.rename(req.file.path, file, function(err) {
    if (err) {
      res.send(500);
    } else {
      res.json({
        message: "File uploaded successfully",
        filename: req.file.filename
      });
    }
  });
});

/**
 * edit selected user details
 * handles PUT request
 * @param object req
 * @return json
 */
app.put("/editUser", (req, res, next) => {
  let user = {};

  for (var key in req.body) {
    if (req.body.hasOwnProperty(key) && req.body[key] !== undefined) {
      if(key=="image"){
        user[key] = jpgextension(req.body[key]);
      }else{
        user[key] = req.body[key];
      }
    }
  }

  Profile.findOneAndUpdate({ _id: req.body.id }, user, { new: true })
    .then(response => {
      res.json(response);
    })
    .then(err => next(err));
});

/**
 * delete selected user
 * handles DELETE request
 * @param object req
 * @return json
 */
app.delete("/deleteUser", (req, res, next) => {
  Profile.find({ _id: req.body.id })
    .remove()
    .exec((err, users) => {
      if (err) {
        return next(err);
      }
      res.json(users);
    });
});

/**
 * search user
 * handles GET request
 * @param object req
 * @return json
 */
app.get("/searchUser", (req, res) => {
  Profile.find({ firstname: req.query.fname }, (err, user) => {
    if (err) {
      console.log("Search user error: ", err);
    }
    res.json(user);
  });
});

app.get("", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client/build", "index.html"));
});

server.listen(port, () => {
  console.log("listening to on port : " + port);
});
