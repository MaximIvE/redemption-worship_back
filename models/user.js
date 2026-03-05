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
})

const JoiUsers = {
    registerSchema,
    loginSchema,
    updateInfoSchema
}

module.exports = {
    User,
    JoiUsers
}
