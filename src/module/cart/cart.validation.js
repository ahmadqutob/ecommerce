import joi from "joi";
import { generalFeild } from "../../services/generalFields.js";

export const  getCategories= joi.object({
  // myid:generalFeild.id
  myid:joi.string()
}).required();

 