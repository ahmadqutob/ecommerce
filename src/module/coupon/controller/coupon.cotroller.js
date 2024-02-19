 import couponModel from "../../../../DB/model/coupon.model.js";
 import { asyncHandler } from "../../../services/errorHandler.js";
import slugify from "slugify";

 
export const getAllCoupon =asyncHandler(async (req, res,next) => {
  const allCouponn = await couponModel.find();
  return res.json({message:'success',allCouponn})
});

export const createcoupon = asyncHandler(async (req, res, next) => {
  const {name} = req.body;
  const {amount} = req.body;
  if (await couponModel.findOne({ name })) {
    return next(new Error(`Duplicate coupon name -> ${name}`));
  }
  const coupon = await couponModel.create({name,amount});
  return res.status(200).json({ message: "success", coupon });
});


export const updateCoupon = async (req, res, next) => {
   const coupon = await couponModel.findById(req.params.couponId);
    if(!coupon) {
        return next(new Error(`coupon not found`));
    }
   if(req.body.name){
         if(coupon.name == req.body.name){
            return next( new Error('old coupon name match new'))

        }
        if(await couponModel.findOne({name:req.body.name})){
            return next(new Error('buplicate name in database'))

        }
        coupon.name = req.body.name;
        coupon.amount = req.body.amount;
        coupon.slug= slugify(req.body.name);
    }
    await coupon.save();
    return res.json({message:'success', coupon})  
} 