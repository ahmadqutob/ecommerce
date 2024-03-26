 import moment from "moment";
import couponModel from "../../../../DB/model/coupon.model.js";
 import { asyncHandler } from "../../../services/errorHandler.js";
import slugify from "slugify";
import productModel from "../../../../DB/model/product.model.js";

 
export const getAllCoupon =asyncHandler(async (req, res,next) => {
  const allCouponn = await couponModel.find();
  return res.json({message:'success',allCouponn})
});


export const createCoupon= asyncHandler(async (req, res, next) => {
 
  const {name} = req.body;
  const {amount} = req.body;
  const {expireDate}= req.body

  let expDate=new Date(expireDate) //"2024-03-19T22:00:00.000Z" 
  let now = new  Date();           //"2024-03-18T19:57:24.073Z"
  // change time to SARVER time -> using .getTime()
  console.log(now,expDate)
 if(now   >= expDate ){ //true -> expire coupon date
return next(new Error('Invalid coupon date'));
 }  


//  if you want to save date 20/3/2024 use new date...toLocalDateString()
  // let convertString = new Date(expDate).toLocaleDateString()
  

  if (await couponModel.findOne({ name })) {
  return next(new Error(`Duplicate coupon name -> ${name}`));
  }
 
 
  let createdBy= req.user._id
  let updatedBy= req.user._id
   const coupon = await couponModel.create({name:name.toLowerCase(),slug:slugify(name),amount,expireDate:expDate,createdBy,updatedBy});
  return res.status(200).json({ message: "success", coupon });
});



// export const Handelcreatecoupon = asyncHandler(async (req, res, next) => {

// const {products,address,phone,couponName} = req.body

// if(couponName){
//   const coupon= await couponModel.findOne({name: couponName.toLowerCase()});
 
//   if(!coupon){
//     return next( new Error(`invalid couponName ${couponName}`))
//   }

  
//   let noww= moment(); //Moment<2024-03-15T13:43:04+02:00>
//   let parsed = moment(coupon.expireDate, 'DD-MM-YYYY') //Moment<2024-03-10T00:00:00+02:00>

//   let diff= noww.diff(parsed,'days') // 5 -> ادا موجب معناتو ما اجا موعد الكوبون
//      console.log(noww,parsed,diff)
//   if(diff >= 0){
//     return next(new Error('coupon is EXPIRED'))
//   }
//   // if(coupon.usedBy.includes(req.user._id)){
//   //   return next(new Error(`coupon is already used by ${req.user._id}`))
//   // }
//   // coupon.usedBy.unshift(req.user._id)
//   // coupon.save()
//   req.body.coupon= coupon; // to use coupon out if condition
//  }

// for(const product of  products){
//   const checkProduct = await  productModel.findOne({
//     _id:product.productId,
//     stock:{$gte:product.stock},
//     softDelete:false
//   })

//   if(!checkProduct){
//     return next(new Error(`invalid product ${product.productId}`))
//   }
// }
//   return res.json('ok')




// })



  // how    to handle coupon date and time


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