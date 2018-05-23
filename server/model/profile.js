const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Profile = new Schema({
    firstname:String,
    lastname:String,
    address:String,
    contact:String,
    dob:String,
    email:String,
    image:String
});

module.exports = mongoose.model('profile', Profile);
