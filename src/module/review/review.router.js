import { Router } from "express";
import  * as reviewController from './controller/review.controller.js'
 import * as validators from './review.validation.js'
 import validation from "../../middleware/validation.middleware.js";
import auth, { Roles } from "../../middleware/auth.middleware.js";
 
 const router =Router();
   router.post('/createReview',auth(Roles.createReview) , validation(validators.createReview),reviewController.createReview)
 
 
 export default router

