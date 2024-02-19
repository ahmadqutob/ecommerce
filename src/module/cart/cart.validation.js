import joi from "joi";
import { generalFeild } from "../../services/generalFields.js";

export const  getCategories= joi.object({
  // myid:generalFeild.id
  myid:joi.string()
}).required();

export const createBrands = joi.object({
    name: joi.string().min(5).max(20).required(),
     file: generalFeild.file.required(),
     categoryId:generalFeild.id
  })
  .required();

export const updateBrand = joi
  .object({
   brandId:generalFeild.id,
    // categoryId: joi.string().min(24).max(24).required(),
    name: joi.string().min(5).max(20), //not required .required(),
    file: generalFeild.file,

    // its optional to add file or not
  })
  .required();
