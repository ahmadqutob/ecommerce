import { asyncHandler } from "../../../services/errorHandler.js";
import userModel from "../../../../DB/model/user.model.js";

export const addtoWish= asyncHandler(async(req,res,next)=>{
    const {productId}   = req.params;
      const user= await userModel.findByIdAndUpdate({_id: req.user._id},{
        $addToSet:{ wishlist:productId} 
    });
    await user.save();
return res.json({message:'success',user})
 })



 export const deleteFormWish= asyncHandler(async(req,res,next)=>{
    const {productId}   = req.params;
      const user= await userModel.findByIdAndUpdate({_id: req.user._id},{
        $pull:{ wishlist:productId} 
    },{new:true});
    await user.save();
return res.json({message:'success',user})
 })

 export const getAllWishes= asyncHandler(async(req,res,next)=>{
      const user= await userModel.findById({_id:req.user._id})
  
       return res.json(user.wishlist).map( (wish)=>   wish )
 
   
  })
