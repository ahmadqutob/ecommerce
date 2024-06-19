import { Router } from "express";
import  * as orderController from './controller/order.cotroller.js'
import fileUpload, { fileValidation } from "../../services/cloudinary.js";
import * as validators from './order.validation.js'
 import validation from "../../middleware/validation.middleware.js";
 import auth from "../../middleware/auth.middleware.js";
 import { Roles } from "../../middleware/auth.middleware.js";
//  const router =Router({caseSensitive: true});
const router =Router();

 router.post('/createOrder',auth(Roles.createOrder), validation(validators.createOrder),orderController.createOrder)
 router.post('/createOrderWithAllItems',auth(Roles.createOrder), validation(validators.createOrderWithAllItems),orderController.createOrderWithAllItems)
 router.patch('/cancelOrder/:orderId',auth(Roles.createOrder), validation(validators.cancelOrder),orderController.cancelOrder)
 
//  change status for admin
router.patch('/adminPermission/:orderId',auth(Roles.adminPermission), validation(validators.adminPermission),orderController.adminPermission)
// get orders by status
router.get('/orderPending/:orderId',auth(Roles.orderPending), validation(validators.orderPending),orderController.orderPending)
 
export default router

