import validation from '../../middleware/validation.middleware.js'
 import { asyncHandler } from '../../services/errorHandler.js'
import * as authController from './controller/auth.controller.js'
import * as validators from './auth.validation.js'
import { Router } from 'express'
import auth, { Roles } from '../../middleware/auth.middleware.js'
const router = new Router()

     router.post('/signup' , validation(validators.signupp),authController.signup ) ;
  router.post('/signin' ,validation(validators.signinSchema) , asyncHandler(authController.signin))
   
  // router.get('/confairmEmail/:email'  ,asyncHandler(authController.confairmEmail))
  router.get('/confairmEmail/:token'  ,validation(validators.token) , asyncHandler(authController.confairmEmail))
  router.get('/NewconfairmEmail/:token'  ,asyncHandler(authController.newConfairmEmail))
 router.patch('/sendCode',validation(validators.sendCode),authController.sendCode)
 router.patch('/forgotPassword',validation(validators.forgotPassword),authController.forgotPassword)
// router.post('/logOut',authController.logOut)
  

// router.post('/signup',(req,res)=>{
//     return res.json({success:'sad'})
// } )

 


export default router