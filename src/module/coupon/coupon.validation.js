import joi from "joi";
import { generalFeild } from "../../services/generalFields.js";

export const  createCoupon= joi.object({
  name: joi.string().min(5).max(20).required(),
  amount:joi.number().min(1).max(100).positive().required()
}).required();

export const categoryValidation = joi.object({
    name: joi.string().min(5).max(20),
    categoryId:generalFeild.id.required(),
    file: generalFeild.file.required(),
  })
  .required();

export const updateCoupon = joi.object({
    couponId:generalFeild.id,  // categoryId: joi.string().min(24).max(24).required(),
    name: joi.string().min(5).max(20), //not required .required(),
    amount:joi.number().min(1).max(100).positive()

    // its optional to add file or not
  })
  .required();
