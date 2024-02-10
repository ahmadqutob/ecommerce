import { Router } from "express";
import  * as productController from './controller/product.cotroller.js'
import fileUpload, { fileValidation } from "../../services/cloudinary.js";
import auth from "../../middleware/auth.middleware.js";
// import * as validators from './product.validation.js'
//  import validation from "../../middleware/validation.middleware.js";
 
 const router =Router();
    router.post('/createProduct',auth('admin'),fileUpload(fileValidation.image).fields([
        {name: 'mainImage',maxCount: 1},
        {name: 'subImage',maxCount: 5},
    ]),  productController.createProduct)
  
    router.put('/updateProduct/:productId',auth('admin'),fileUpload(fileValidation.image).fields([
        {name: 'mainImage',maxCount: 1},
        {name: 'subImage',maxCount: 5},
    ]),  productController.updateProduct)
// router.get('/:myid',validation(validators.getCategories),catController.getCategory)

// //   router.put || router.patch  -> put to modefiy many calumns and patch to update one column

 export default router

 