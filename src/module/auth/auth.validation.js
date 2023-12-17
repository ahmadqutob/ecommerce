import joi from "joi";
import { generalFeild } from "../../services/generalFields.js";
// المعايير الي بدي استلم البيانات زيها
// او بحدد كيف  بدي استلم البيانات
// قبل وصولها للسيرفر




export const signupSchema = {
    
    body:joi.object({

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
    }).required(),

    query:joi.object({
        test:joi.boolean().required(),
    }).required()
    
    
    
}

    
 


export const signinSchema =  joi.object({

    email:generalFeild.email,
    password:generalFeild.password,

    
    }).required()
 