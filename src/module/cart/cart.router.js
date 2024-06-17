import { Router } from "express";
import * as cartController from './controller/cart.cotroller.js'
 import fileUpload, { fileValidation } from "../../services/cloudinary.js";
  import validation from "../../middleware/validation.middleware.js";
import { Roles } from "../../middleware/auth.middleware.js";
  import auth from "../../middleware/auth.middleware.js";
 
 const router =Router();
   router.post('/createCart', auth(Roles.poth),cartController.createCart)
   router.patch('/deleteItem', auth(Roles.poth),cartController.deleteItem)
   router.patch('/clearCart', auth(Roles.poth),cartController.clearCart)
   router.get('/carts', auth(Roles.poth),cartController.carts)
   


   
   export default router