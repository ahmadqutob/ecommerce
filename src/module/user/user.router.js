import { Router } from "express";
import * as userController from './controller/user.controller.js'
import auth from  '../../middleware/auth.middleware.js'
// import fileUpload, { HME, fileValidation } from "../../services/multer.services.js";
 import fileUpload, { HME, fileValidation } from "../../services/cloudinary.js";
import validation from "../../middleware/validation.middleware.js";
import { profilePicVal } from "./user.validation.js";
 import * as validators from './user.validation.js'

const router = new Router();

router.get('/profile',auth,userController.profile)

// upload using multer / upload to my pc
// router.patch('/profilePic',auth,fileUpload( 'user/profile',fileValidation.image).single('image'),HME,userController.profilePic)
// router.patch('/coverPic',auth,fileUpload('user/profile/coverPic',fileValidation.image).array('images',4),HME,userController.coverPic)


// upload using cloudinary 
router.patch('/profilePic',auth,fileUpload(fileValidation.image).single('image')
,HME,validation(validators.profilePicVal),userController.profilePic)

router.patch('/coverPic',auth,fileUpload(fileValidation.image).array('images',4)
,HME,userController.coverPic)

router.patch('/updatePassword',auth, validation(validators.updatePassword),userController.updatePassword)


router.get('/shareProfile/:id',validation(validators.shareProfile) ,userController.shareProfile)
export default router
 