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
    token:{
        type: String,
        default: ""
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
},{versionKey: false, timestamps: true});

userSchema.post('save', handleSaveErrors);
const User = model("user", userSchema);

const registerSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required()
});

const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required()
});

const updateInfoSchema = Joi.object({
    name: Joi.string(),
    location: Joi.string().valid("kharkiv", "svitlovodsk", "kyiv", "unkown", "other")
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
