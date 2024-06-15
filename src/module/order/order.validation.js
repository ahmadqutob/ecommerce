import joi from "joi";
import { generalFeild } from "../../services/generalFields.js";

 
export const createOrder = joi.object({
//  const {products , address, phone ,couponName}= req.body;
couponName:joi.string(),
payment:joi.string(),
address:joi.string(),
phoneNumber:joi.string(),
 

products:joi.required()
  })
  .required();

  
export const createOrderWithAllItems = joi.object({
  //  const {products , address, phone ,couponName}= req.body;
  couponName:joi.string(),
  payment:joi.string(),
  address:joi.string(),
  phoneNumber:joi.string(),
   qty:joi.number(),
  
  products:joi.required()
    })
    .required();
  export const adminPermission = joi.object({
    //  const {products , address, phone ,couponName}= req.body;
    orderId:generalFeild.id,
    status:joi.string().required()
     
      })
      .required();
      export const orderPending = joi.object({
        //  const {products , address, phone ,couponName}= req.body;
        orderId:generalFeild.id,
          
          })
          .required();
     
export const cancelOrder = joi.object({
  //  const {products , address, phone ,couponName}= req.body;
  orderId:generalFeild.id,
  reasonReject:joi.string().required()
   
    })
    .required();
   