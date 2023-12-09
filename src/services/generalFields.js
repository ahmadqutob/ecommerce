import joi from "joi";
import { Types } from "mongoose";



// const validationObjectId= (value,next) => { // next is not defined (\"categoryId\" failed custom validation because next is not a function)
    const validationObjectId= (value,helper) => {
    if(Types.ObjectId.isValid(value)){
        return true;
    }
    return helper.message(`categoryId is invalid -> ${value}`);
}






export const generalFeild=  {
 
        email:joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
        password:joi.string().required(),
        Cpassword:joi.string().valid(joi.ref("newPassword")).required(), 


        file:joi.object({
            fieldname :joi.string().required(),
            originalname: joi.string().required (),
            encoding: joi.string().required (),
            mimetype :joi.string().required (),
            destination:joi.string().required(),
            filename: joi.string().required (),
            path: joi.string().required(),
            size:joi.number (). positive().required (),
            dest:joi.string(),
        }), //without required -> just in profilePic required
        
       
            id:joi.string().custom(validationObjectId).required() ,
            // غلط تكتب الماكس والمين ل الايدي
            // isValid
        
}