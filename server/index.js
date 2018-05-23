const express = require("express");
const app = express();
const path = require("path");
const server = require("http").Server(app);
const cors = require("cors")();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require('multer');
const Profile = require("./model/profile");
const port =  3030;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/UPAPP');

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + 'mongodb://localhost:27017/UPAPP');
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(cors);

// const storage = multer.diskStorage({
//   destination: __dirname +'/media/',
//   filename(req, file, cb) {
//     console.log(file);
//     cb(null, `${new Date()}-${file.originalname}`);
//   }
// });
//
// const upload = multer({ storage });

/**
 * get user list to home page
 * handles GET request
 * @param object req
 * @return json
 */
app.get("/getUsers", (req, res) => {
  Profile.find( {} , (err,user) => {
    if (err) { return next(err); }
    res.json(user);
  });
});

/**
 * add new user
 * handles POST request
 * @param object req
 * @return json
 */
app.post("/addUser", (req, res) => {
  console.log('asasas');
  let newUser = new Profile({
    firstname: req.body.fname,
    lastname: req.body.lname,
    address: req.body.address,
    contact: req.body.contact,
    dob: req.body.dob,
    email: req.body.email,
    image: req.body.image,
  });
  newUser.save(function(err, user) {
    if (err) { console.log(err); }
    res.json(user);
  });
});

/**
 * edit selected user details
 * handles PUT request
 * @param object req
 * @return json
 */
app.put("/editUser", (req, res) => {

  let user = {};

  for(var key in req.body) {
    if(req.body.hasOwnProperty(key) && req.body[key] !== undefined){
      user[key]=req.body[key];
    }
  }

  Profile.findOneAndUpdate({_id:req.body.id}, user,{ "new": true })
    .then((response) => {
      console.log('Edit user response ',response);
      res.json(response);
    })
    .then((err) => next(err));
});

/**
 * delete selected user
 * handles DELETE request
 * @param object req
 * @return json
 */
app.delete("/deleteUser", (req, res) => {
  Profile
    .find( {_id:req.body.id} )
    .remove()
    .exec((err,users) => {
        if (err) { console.log('Delete user error: ', err); }
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
  Profile.find( { firstname: req.query.fname } , (err,user) => {
    if (err) { console.log('Search user error: ', err); }
    res.json(user);
  });
});

server.listen(port, () => {
  console.log("listening to on port : " + port);
});
