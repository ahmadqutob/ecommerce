import { Router } from "express";
import  * as reviewController from './controller/review.controller.js'
 import * as validators from './review.validation.js'
 import validation from "../../middleware/validation.middleware.js";
import auth, { Roles } from "../../middleware/auth.middleware.js";
import fileUpload, { fileValidation } from "../../services/cloudinary.js";
 
 const router =Router({mergeParams:true});
 router.post('/createReview',auth(Roles.createReview) , fileUpload(fileValidation.image).single('image'),validation(validators.createReview),reviewController.createReview)
  // review avarage count
   router.post('/:productId/countOf',auth(Roles.createReview) , validation(validators.createReview),reviewController.countOf)
   router.put('/:reviewId/update',auth(Roles.createReview) , fileUpload(fileValidation.image).single('image'), validation(validators.updateReview),reviewController.updateReview)

 
 export default router

 