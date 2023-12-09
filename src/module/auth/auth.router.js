import validation from '../../middleware/validation.middleware.js'
 import { asyncHandler } from '../../services/errorHandler.js'
import * as authController from './controller/auth.controller.js'
import * as validators from './auth.validation.js'
import { Router } from 'express'
const router = new Router()

  router.post('/signup',validation(validators.signupSchema),asyncHandler(authController.signup)) ;
  router.post('/signin',validation(validators.signinSchema),asyncHandler(authController.signin))
  // test email on browser using GET method
  // router.get('/confairmEmail/:email'  ,asyncHandler(authController.confairmEmail))
  router.get('/confairmEmail/:token'  ,asyncHandler(authController.confairmEmail))
 


// router.post('/signup',(req,res)=>{
//     return res.json({success:'sad'})
// } )

 


export default router