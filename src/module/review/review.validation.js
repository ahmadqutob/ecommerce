import joi from "joi";
import { generalFeild } from "../../services/generalFields.js";

export const  createReview= joi.object({

productId:generalFeild.id,  
orderId:generalFeild.id,  
createdBy:generalFeild.id,  
rating:joi.number().required(),  


  myid:joi.string()
}).required();

// export const createBrands = joi.object({
//     name: joi.string().min(5).max(20).required(),
//      file: generalFeild.file.required(),
//      categoryId:generalFeild.id
//   })
//   .required();
 
