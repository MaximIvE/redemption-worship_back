const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const Joi = require("joi");

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema({
    password: {
        type: String,
        minlength:6,
        required: [true, 'Set password for user'],
    },
    email:{
        type: String,
        required: [true , 'Email is required'],
        match: emailRegexp,
        unique: true
    },
    access:{
        type: String,
        enum: ["editor", "user"],
        default: "user"
    },
    name: {type: String, 
        default: ""
    },
    location: {
        type: String,
        enum: ["kharkiv", "svitlovodsk", "kyiv", "unkown", "other"],
        default: "unkown"
    },
    token: {
        type: String,
        default: ""
    },
    avatar: {
        type: String,
        default: ""
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required']
    }
},{versionKey: false, timestamps: true});

userSchema.post('save', handleSaveErrors);
const User = model("user", userSchema);

const registerSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    access: Joi.string().valid("editor", "user").allow('')
});

const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required()
});

const updateInfoSchema = Joi.object({
    name: Joi.string(),
    location: Joi.string().valid("kharkiv", "svitlovodsk", "kyiv", "unkown", "other").allow('')
});

const resendSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
})

const JoiUsers = {
    registerSchema,
    loginSchema,
    updateInfoSchema,
    resendSchema
}

module.exports = {
    User,
    JoiUsers
}
