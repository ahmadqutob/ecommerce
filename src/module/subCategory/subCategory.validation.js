import joi from "joi";
import { generalFeild } from "../../services/generalFields.js";

export const  getsubCategories= joi.object({
  // myid:generalFeild.id
  myid:joi.string()
}).required();

export const categoryValidation = joi
  .object({
    name: joi.string().min(5).max(20).required(),
    categoryId:generalFeild.id,

    file: generalFeild.file.required(),
  })
  .required();
  export const subCategoryValidation = joi
  .object({
    name: joi.string().min(5).max(20).required(),
    categoryId:generalFeild.id,
    file: generalFeild.file,
  })
  .required();
  

export const updateSubCategory = joi
  .object({
    subCategoryId:generalFeild.id,
    categoryId:generalFeild.id,
    // categoryId: joi.string().min(24).max(24).required(),
    name: joi.string().min(5).max(20), //not required .required(),
    file: generalFeild.file

    // its optional to add file or not
  })
  .required();
