import { Router } from "express";
import  * as brandController from './controller/brand.cotroller.js'
import fileUpload, { fileValidation } from "../../services/cloudinary.js";
import * as validators from './brand.validation.js'
 import validation from "../../middleware/validation.middleware.js";
 
 const router =Router();
   router.get('/',brandController.getAllBrand)
   router.post('/createBrand',fileUpload(fileValidation.image).single('image'),validation(validators.createBrands),brandController.createBrand)
   router.put('/update/:brandId',fileUpload(fileValidation.image).single('image'),validation(validators.updateBrand),brandController.updateBrand)
 
// router.get('/:myid',validation(validators.getCategories),catController.getCategory)

// //   router.put || router.patch  -> put to modefiy many calumns and patch to update one column

 export default router

