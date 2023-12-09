import joi from "joi";
import { generalFeild } from "../../services/generalFields.js";

export const profilePicVal= {
  
    file:generalFeild.file.required()
} 

export const updatePassword= {
        body:joi.object({
            oldPassword: generalFeild.password.required(),
            newPassword: generalFeild.password.invalid(joi.ref('oldPassword')),
             Cpassword:joi.string().valid(joi.ref("newPassword")).required(), 

            
        }).required()
        
}

export const shareProfile = {

    params:joi.object({
          id:joi.string().min(24).max(24).required(),

    }).required(),
    // search -> isinvalid
    // search -> helper
}
