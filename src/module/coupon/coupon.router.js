import { Router } from "express";
import  * as couponController from './controller/coupon.cotroller.js'
// import fileUpload, { fileValidation } from "../../services/cloudinary.js";
import validation from "../../middleware/validation.middleware.js";
import * as validators from './coupon.validation.js'
   
 const router =Router();
 router.get('/hi', couponController.getAllCoupon)
   router.post('/createcoupon', validation(validators.createCoupon),couponController.createcoupon)
//  router.post('/createcoupon', couponController.createCoupon)
 
// //   router.put || router.patch  -> put to modefiy many calumns and patch to update one column
     router.put('/update/:couponId' ,validation(validators.updateCoupon),couponController.updateCoupon)

 export default router

