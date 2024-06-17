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
let matchProduct=false; // match product in cart and new added product
 for(let i =0 ; i < cart.products.length;i++) {

  // console.log(cart.products[i].productId) // object fro batabase
  // console.log(cart.products[i].productId.toString()) // object to string
  // console.log(productId) // string from postman
  // if(object === string)     problem / compare value ond type
  // if(object == string)     NoProblem/ compare just value 
  // if(object.toString() === string)     NoProblem/   string === string
       
    if(cart.products[i].productId.toString() === productId){
      cart.products[i].qyantity = qyantity;
      matchProduct = true ; // its mean this product = found in cart
      break;
    }
 }
 if(!matchProduct){ // id product not inclue cart === its new product
  cart.products.push( {productId, qyantity});
 }

await cart.save();
return res.json({message: 'success'});



});
 

export const deleteItem = asyncHandler( async (req, res,next) => {

  const {productsIds}= req.body;

  const cart =await cartModel.updateOne({userId:req.user._id},{
    $pull:{
      products:{
        productId:{$in:productsIds}
      }
    }
  })
  return res.json({message: 'success',cart});
})

export const clearCart = asyncHandler( async (req, res,next) => {

const cart =await cartModel.updateOne({userId:req.user._id},{
  products:[]
})
 
  return res.json({message: 'success',cart});
})

export const carts = asyncHandler( async (req, res,next) => {

  const cart =await cartModel.findOne({userId:req.user._id});
  return res.json(cart);
  })