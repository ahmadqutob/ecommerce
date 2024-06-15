import joi from "joi";
import { generalFeild } from "../../services/generalFields.js";

export const  createReview= joi.object({
    file:generalFeild.file.required(),
       productId:generalFeild.id,  
      comment:joi.string().required(),  
      rating:joi.number().required(),


}).required();

export const  updateReview= joi.object({
    
    file:generalFeild.file,
    productId:generalFeild.id,  
    reviewId:generalFeild.id,  
   comment:joi.string(),  
   rating:joi.number()


}).required();