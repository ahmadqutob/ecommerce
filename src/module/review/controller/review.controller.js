 import orderModel from "../../../../DB/model/Order.model.js";
import reviewModel from "../../../../DB/model/Review.model.js";
import { asyncHandler } from "../../../services/errorHandler.js";
import cloudinary from "../../../services/cloudinary.service.js";

 export const createReview = asyncHandler(async(req,res,next)=>{

    const {productId}= req.params;
    const {comment,rating}= req.body;

    const checkOrder= await orderModel.findOne({
        userId: req.user._id,
        status:"delivered",
        "products.productId": productId,
        // check in array of object
    })

    if(!checkOrder){
        return next(new Error("Order is not delivered"));
    }
    
    // check if user already reviewed
  
    const checkReviewed= await reviewModel.findOne({createdBy:req.user._id,productId});
    if(checkReviewed){
        return next(new Error("you already reviewed"));
    }
  
// uplod image
     const{secure_url,public_id}=  await cloudinary.uploader.upload(req.file.path,{folder: `${process.env.APP_name}/review` })




    const review= await reviewModel.create({
        createdBy:req.user._id,
        orderId:checkOrder._id,
        productId,
        comment,
        rating,
        image:{secure_url,public_id}
    })
    return res.status(201).json({message:'success',review})
})

export const countOf = asyncHandler(async(req, res,next)=>{

    const  revieww= await reviewModel.find()   
 // return res.json(revieww)
 
    const productId  =req.params

   revieww.countDocuments({ productId: productId })
  .then(count => {
    console.log('Number of reviews for product:', count);
  })
  .catch(err => {
    console.error('Error:', err);
  });

 
}) 

export const updateReview = asyncHandler(async(req, res, next)=>{
    const{ reviewId,productId} = req.params
 

    const revieww = await reviewModel.findOne({_id: reviewId});
     
    req.body.review=revieww
     if(req.file){
      // add image 
      const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APP_name}/review`})
      // delete old one
      await cloudinary.uploader.destroy(req.body.review.image.public_id); 
      //change old  category  image to new one
      req.body.review.image={secure_url,public_id}
  }



     const review = await reviewModel.findByIdAndUpdate({_id: reviewId,createdBy:req.user._id, productId}, req.body
    ,{new: true});
     if(!review){
        return next(new Error('Review not found'))
     }
    return res.status(200).json({message: "success", review});

    });