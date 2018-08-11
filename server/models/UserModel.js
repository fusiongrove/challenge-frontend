/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String,
    },
    address: {
        type: String
    },
    country_code: {
        type: String
    },
    phone: {
        type: String
    },
    dob: {
        type: Date
    },
    email: {
        type: String,
        unique: true
    },
    image: {
        type: String,
        default: null
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, { collection: 'users' });


UserSchema.pre('save', function (next) {
    const now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

UserSchema.statics.saveUser = function (user) {
    const _this = this;
    const _user = new _this();
    const {
        first_name, last_name, address, country_code, phone, dob, email, image
    } = user;

    _user.first_name = first_name;
    _user.last_name = last_name;
    _user.address = address;
    _user.country_code = country_code;
    _user.phone = phone;
    _user.dob = dob;
    _user.email = email;
    _user.image = image;

    return new Promise((resolve, reject) => {
        _user.save((error, result) => {
            if (error) {
                console.log('Error on saving ', error);
                reject({
                    status: 400,
                    error
                });
            } else {
                resolve({
                    status: 200,
                    result
                });
            }
        });
    });
};

UserSchema.statics.getAllUsers = function () {
    const _this = this;

    return new Promise((resolve, reject) => {
        
        _this.find({})
            .sort('-_id')
            .exec((error, result) => {
            if (error) {
                console.log('Error on get all users ', error);
                reject({
                    status: 400,
                    error
                });
            } else {
                resolve({
                    status: 200,
                    result
                });
            }
        });
    });
};

UserSchema.statics.getUser = function (filter) {
    const _this = this;

    return new Promise((resolve, reject) => {
        _this.find(filter, (error, result) => {
            if (error) {
                console.log('Error on getting user ', error);
                reject({
                    status: 400,
                    error
                });
            } else {
                resolve({
                    status: 200,
                    result
                });
            }
        });
    });
}

UserSchema.statics.updateUser = function (userId, user) {
    const _this = this;
    const filter = { _id: userId };

    return new Promise((resolve, reject) => {
        _this.findOneAndUpdate(filter, user, { new: true }, (error, result) => {
            if (error) {
                console.log('Error on updating ', error);
                reject({
                    status: 400,
                    error
                });
            } else {
                resolve({
                    status: 200,
                    result
                });
            }
        });
    });
};

UserSchema.statics.removeUser = function (filter) {
    const _this = this;

    return new Promise((resolve, reject) => {
        _this.remove(filter, (error, update) => {
            if (error) {
                reject({
                    status: 400,
                    error
                });
            } else {
                resolve({
                    status: 200,
                    result: update
                });
            }
        });
    });
};

export default mongoose.model('User', UserSchema);
