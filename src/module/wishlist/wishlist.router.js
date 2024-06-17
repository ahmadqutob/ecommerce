import { Router } from "express";
import *  as  wishController  from './controller/wishlist.controller.js'
import auth, { Roles } from "../../middleware/auth.middleware.js";
const router = Router();

router.patch('/addWishlist/:productId',auth(Roles.admin),wishController.addtoWish)
router.patch('/deketeFromWish/:productId',auth(Roles.admin),wishController.deleteFormWish)
router.get('/getAllWishes',auth(Roles.admin),wishController.getAllWishes)


export default router