import { Router } from "express";
import  * as catController from './controller/subcategory.cotroller.js'
import fileUpload, { fileValidation } from "../../services/cloudinary.js";
import * as validators from './subCategory.validation.js'
import validation from "../../middleware/validation.middleware.js";
 const router =Router({mergeParams:true});
 
 
 router.post('/subCategory',fileUpload(fileValidation.image).single('image'),catController.createSubCategory)
 
 router.put('/update/:subCategoryId',fileUpload(fileValidation.image).single('image'),validation(validators.updateSubCategory),catController.updateSubCategory)
//  router.post('/createSubCategory',fileUpload(fileValidation.image).single('image'),validation(validators.subCategoryValidation),catController.createSubCategory)
 
 router.get('/getSubCategory',catController.getSubCategory) //specific sub category
 router.get('/',catController.getAllSubCategory) //specific sub category
 
    router.get('/subCategory/:subCategoryId/productt',catController.getProduct) 


 // router.get('/:myid',validation(validators.getsubCategories),catController.getCategory)
// //   router.put || router.patch  -> put to modefiy many calumns and patch to update one column

 export default router


