 import cloudinary from "../../../services/cloudinary.service.js";
import { asyncHandler } from "../../../services/errorHandler.js";
import brandModel from '../../../../DB/model/brand.model.js'
import slugify from "slugify";
import productModel from "../../../../DB/model/product.model.js";
import cartModel from "../../../../DB/model/cart.model.js";

export const createCart =asyncHandler(async (req, res,next) => {
const {productId, qyantity}= req.body;

const product = await productModel.findOne({_id: productId});
if(!product) {
  return res.json({message:'product not found'});
}
if(product.stock < qyantity) {
  return res.json({message:'not enough stock'});
}
// // if user dont have cart / create one
const cart = await cartModel.findOne({userId:req.user._id});
if(!cart) {
  const newCart = await cartModel.create({
    userId:req.user._id,
    products:[{productId,qyantity}]
    
  })
  return res.json({message:'sccess' , newCart})
}

// if user have cart and product in cart / i'll change the qyantity in th cart
 

return res.json({message: 'success' , checkCart})


});

// // export const getBrand =asyncHandler(async (req, res,next) => {
// //   const brand = await brandModel.findById(req.params.myid);
// //   return res.json({message:'success',brand})
// // });

// export const createBrand = asyncHandler(async (req, res, next) => {
//   const { name } = req.body;
//   if (await brandModel.findOne({ name })) {
//     return next(new Error(`Brand already exists ${name}`));
//   }

//   const slug = slugify(name);
//   const { secure_url, public_id } = await cloudinary.uploader.upload(
//     req.file.path,
//     { folder: `${process.env.APP_name}/brand` }
//   );

//   const brand = await brandModel.create({ name,slug,image: { secure_url, public_id },categoryId:req.body.categoryId,createdBy:req.user._id,updatedBy:req.user._id});
//   return res.status(200).json({ message: "success", brand });
// });


// export const updateBrand = asyncHandler( async (req, res, next) => {

//     const brand = await brandModel.findById(req.params.brandId);
//     if(!brand) {
//         return next(new Error(`brand not found`));
//     }

//     // if user send name
//     if(req.body.name){
// // if user want to update a brand name and its match the old name. 
//         if(brand.name == req.body.name){
//             return next( new Error('old brand name match new'))

//         }
// // in database if you change name and its duplicate other brand name 
//         if(await brandModel.findOne({name:req.body.name})){
//             return next(new Error('buplicate name in database'))

//         }
//         // change brand name
//         brand.name = req.body.name;
//         // add slug to brand  
//         brand.slug= slugify(req.body.name);
//     }

//     if(req.file){
//         // add image 
//         const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APP_name}/brand`})
//         // delete old one
//         await cloudinary.uploader.destroy(brand.image.public_id); 
//         //change old  brand  image to new one
//         brand.image={secure_url,public_id}
//     }

//     brand.updatedBy= req.user._id
//     await brand.save();
//     return res.json({message:'success', brand})
// } )