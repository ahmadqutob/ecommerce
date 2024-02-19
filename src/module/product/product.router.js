import { Router } from "express";
import  * as productController from './controller/product.cotroller.js'
import fileUpload, { fileValidation } from "../../services/cloudinary.js";
import auth, { Roles } from "../../middleware/auth.middleware.js";
// import * as validators from './product.validation.js'
//  import validation from "../../middleware/validation.middleware.js";
 
 const router =Router();
    router.post('/createProduct',auth(Object.values(Roles)),fileUpload(fileValidation.image).fields([
        {name: 'mainImage',maxCount: 1},
        {name: 'subImage',maxCount: 5},
    ]),  productController.createProduct)
  
    router.put('/updateProduct/:productId',auth('admin'),fileUpload(fileValidation.image).fields([
        {name: 'mainImage',maxCount: 1},
        {name: 'subImage',maxCount: 5},
    ]),  productController.updateProduct)
    router.get('/softProduct',productController.getAllProduct)

    router.put('/softDelete/:productId',auth(Roles.softDelete),productController.softDelete)
    router.put('/restoreSoftDelete/:productId',auth(Roles.restoreSoftDelete),productController.restoreSoftDelete)
    router.delete('/forceDelete/:productId',auth(Roles.forceDelete),productController.forceDelete)
    
    router.get('/product/:productId',productController.getProduct)
 
 export default router

 