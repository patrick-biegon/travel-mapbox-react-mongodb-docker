const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
    
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Email is incorrect");
                }
            }
    
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        age: {
            type: Number
        },
        tokens: [{
            token:{
                type: String,
                required: true
            }
        }]
}, {
    timestamps: true
});



const User = mongoose.model('User', userSchema);


module.exports = User;