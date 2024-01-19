import joi from "joi";
import { generalFeild } from "../../services/generalFields.js";
// المعايير الي بدي استلم البيانات زيها
// او بحدد كيف  بدي استلم البيانات
// قبل وصولها للسيرفر

 


export const signupp = joi.object({
 
    username:joi.string().alphanum().required().messages({
        'any.requitred': 'username is required',
        'string.empty': 'username is required'
    }),
    email:generalFeild.email,
    password:generalFeild.password,
    age:joi.number().required(),
    Cpassword:joi.string().valid(joi.ref("password")).messages({
        'any.only':'Cpasswrod must be valid password'
    }).required(),
    gender:joi.string().alphanum().valid('male','female'),
    
    test:joi.boolean().required(),
});
    
     
 
export const token =  joi.object({
 
    token:joi.string().max(24).required()
    }).required()
 export const sendCode = joi.object({
    email:generalFeild.email,
    
 }).required()
export const forgotPassword = joi.object({
    email:generalFeild.email,
     password:generalFeild.password,
     Cpassword:generalFeild.password,
     code:joi.string().required()
}).required()

export const signinSchema =  joi.object({

    email:generalFeild.email,
    password:generalFeild.password,

    
    }).required()
 