import { Router } from "express";
import  * as catController from './controller/category.cotroller.js'
import fileUpload, { fileValidation } from "../../services/cloudinary.js";
import * as validators from './category.validation.js'
import subCategory from '../subCategory/subCategory.router.js'
import validation from "../../middleware/validation.middleware.js";
 
 const router =Router();
 router.use('/:categoryId',subCategory)
 router.use('/allSubCategory',subCategory)
 router.get('/',catController.getAllCategory)

router.get('/:myid',validation(validators.getCategories),catController.getCategory)
 router.post('/createCategory',fileUpload(fileValidation.image).single('image'),validation(validators.categoryValidation),catController.createCategory)

//   router.put || router.patch  -> put to modefiy many calumns and patch to update one column
  router.put('/update/:categoryId',fileUpload(fileValidation.image).single('image'),validation(validators.updateCategory),catController.updateCategory)

 export default router

