import { asyncHandler } from "../../../services/errorHandler.js";
 import slugify from "slugify";
import couponModel from "../../../../DB/model/coupon.model.js";
import moment from "moment";
import productModel from "../../../../DB/model/product.model.js";
import orderModel from "../../../../DB/model/Order.model.js";
 import cartModel from "../../../../DB/model/cart.model.js";
 import  createInvoice  from "../../../services/pdf.service.js";
import { request } from "express";

   
 
export const createOrder= asyncHandler(async (req, res, next) => {
  
 const {products , phoneNumber, payment ,couponName,address,couponId,status}= req.body;
 
 if(couponName){
   // 1- if coupon in found
  const coupon = await couponModel.findOne({name:couponName.toLowerCase()})

  if(!coupon){
    return next(new Error(`Invalid coupon NAME ${couponName}`));
  }

//2-  check expire date for coupon
  let now= moment() 
  let parsed = moment(coupon.expireDate, 'YYYY-MM-DD')

 
  let differnce= now.diff(parsed,'days')  //years, months, weeks, days, hours, minutes, and seconds
 if(differnce >=0){ //if now >= parsed -> expired DATE
  return next(new Error(`coupon is expired`))
 }
 if(coupon.usedBy.includes(req.user._id)){
  return next(new Error(`coupon is already used by ${req.user._id}`))
 }
 req.body.coupon= coupon;


}

 
 let   ProductList =[];
 let   ProductIds =[];

 let subTotal=0 ;// the final price for product after discount/coupon
 
for (const product of products) {// loop of products from user

  const checkProduct = await productModel.findOne({
    _id:product.productId,
    stock:{$gte:product.qty},
    // softDelete:false, errrrrrrrrrrrrrrrrrrrrrrror
  })
  if(!checkProduct){
    return next(new Error(`invalid product ${product.productId}`));
  }
   // add to product object
  // finalPrice =حق المننج الواحد
     product.unitePrice= checkProduct.finalPrice; //(productModel)final price for product after discount
  product.finalPrice= product.qty * checkProduct.finalPrice; 
 ProductIds.unshift(product.productId)//add products ids to array to delete it using $pull
   subTotal +=  product.finalPrice; //without coupon
  ProductList.unshift(product) // to save all products information
  }
 
   const createeOrder= await orderModel.create({
    userId:req.user._id,
    address,
    phoneNumber,
    products:ProductList,
    subTotal,
    couponId:req.body.coupon?._id,
    payment,
    finalPrice: subTotal - (subTotal * ((req.body.coupon?.amount || 0)/100)),
    status:(payment === 'card')? 'approved' : 'pending',
  })

// update quantity for products
for (const product of products) { // iterate over product values

  const updateqty=await productModel.updateOne({_id:product.productId},{$inc:{stock:-product.qty}})

}
// update coupon -> usedBy if user used coupon
if(req.body.coupon){
  await couponModel.updateOne({_id:req.body.coupon._id},{$addToSet:{usedBy:req.user._id}})

}

// if i want to delete item from cart using id product
//  id delete it decause i want to bye it 
const cart= await cartModel.updateOne({userId:req.user._id},{
  $pull:{
          products:{
             productId:{$in:ProductIds}
            //postMan:{$in: ORDER_PRODUCT}
            //بدي امسح المنتجات  حسب الايدي الي عندي من الكارد 
            // منمسحهم من الكارد لانا اشتريناهم
          }
        }
})
//   const order=await orderModel.findOne({userId: req.user._id})
// // send invoice to customer
// const invoice = {
//   shipping: {
//     name:req.user.username,
//     address ,
//     city: "city if needed",
//     status: `status :${order.status}`,
//     // country: "country",
//     postal_code: 94111 //just number
//   },
//   // items: [
//   //   {
//   //     item: "item",
//   //     description: "description",
//   //     quantity: 2,
//   //     amount: 6000
//   //   } 
//   // ]
//   items: order.products //from DB
//   ,
   
//   subtotal: order.subTotal *100,
//   paid: 0, // Paid To Date
//   invoice_nr: order._id//invoice number/ ID
// };

// createInvoice(invoice, "invoice.pdf");
  return res.json({message: 'success',createeOrder}  )
  
});


 
export const createOrderWithAllItems= asyncHandler(async (req, res, next) => {
 


const {products ,qty, phoneNumber, payment ,couponName,address,couponId,status}= req.body;


const cart = await cartModel.findOne({userId: req.user._id});
  if(!cart?.products?.length){
    return next(new Error("empty cart",{cause:400}));
  }
 req.body.products= cart.products //because there is many scpoes we but it in req,body
 if(couponName){
 
   const coupon = await couponModel.findOne({name:couponName.toLowerCase()})
 
   if(!coupon){
     return next(new Error(`Invalid coupon NAME ${couponName}`));
   }
 
 
   let now= moment() 
   let parsed = moment(coupon.expireDate, 'YYYY-MM-DD')
 
  
   let differnce= now.diff(parsed,'days')  //years, months, weeks, days, hours, minutes, and seconds
  if(differnce >=0){
   return next(new Error(`coupon is expired`))
  }
  if(coupon.usedBy.includes(req.user._id)){
   return next(new Error(`coupon is already used by ${req.user._id}`))
  }
  req.body.coupon= coupon;
 
 
 }
 
 
  let   ProductList =[];
  let   ProductIds =[];
 
  let subTotal=0 ;// the final proce for product after discount/coupon
  for (let product of req.body.products) { // iterate over product values
    
   const checkProduct = await productModel.findOne({
     _id:product.productId,
       stock:{$gte:product.qyantity},  
    //  softDelete:false,
   })
   if(!checkProduct){
    return next(new Error(`invalid product ${product.productId}`));
  }
  product=  product.toObject(); // change data from BJON(from db) to JSON to add data to Product object
    product.name= checkProduct.name; 
  product.qty= checkProduct.qty;
    product.unitePrice= checkProduct.finalPrice; //(productModel)final price for product after discount
   product.finalPrice= product.qyantity * checkProduct.finalPrice; 
  ProductIds.unshift(product.productId)//add products ids to array to delete it from cart using $pull
      subTotal +=  product.finalPrice;
   ProductList.unshift(product)
   console.log(product)
  }
  const order= await orderModel.findOne({userId:req.user._id})
 
 


  const createeOrder= await orderModel.create({
    userId:req.user._id,
    address,
    phoneNumber,
    products:ProductList,
    subTotal,
    couponId:req.body.coupon?._id,
    payment,
    finalPrice: subTotal - (subTotal * ((req.body.coupon?.amount || 0)/100)),
    status:(payment === 'card')? 'approved' : 'pending',
  })
  
 // update quantity for products
 for (const product of req.body.products) { // iterate over product values
 
   const updateqty=await productModel.updateOne({_id:product.productId},{$inc:{stock:-product.qyantity}})
 
 }
 // update coupon -> usedBy if user used coupon
 if(req.body.coupon){
   await couponModel.updateOne({_id:req.body.coupon._id},{$addToSet:{usedBy:req.user._id}})
 
 }
 


   // send invoice to customer
  const invoice = {
    shipping: {
      name:req.user.username,
      address ,
      city: "city if needed",
      status: `status :${order.status}`,
      // country: "country",
      postal_code: 94111 //just number
    },
    // items: [
    //   {
    //     item: "item",
    //     description: "description",
    //     quantity: 2,
    //     amount: 6000
    //   } 
    // ]
    items: order.products //from DB
    ,
     
    subtotal: order.subTotal *100,
    paid: 0, // Paid To Date
    invoice_nr: order._id//invoice number/ ID
  };
  
  createInvoice(invoice, "invoice.pdf");
   // if i want to delete item from cart using id product
 //  id delete it decause i want to bye it 
 
//  await cartModel.updateOne({userId: req.user._id},{
//   products: [],
//   })
  return res.status(201).json({message: 'success', createeOrder});
 
    
 });
 




   export const cancelOrder = asyncHandler(async (req, res, next)=>{
    const {orderId} = req.params;
    const {reasonReject} = req.body;

    const order = await orderModel.findOne({_id: orderId, userId: req.user._id});

    // if order in away to customer or approved the order  || or customer payed in card -> we cant to cancel it
   if(!order || order.status ==='approved' || order.payment==='card'){
    return next(new Error(`can't cancelled the order ${order._id}`))
   }

    const cancelTheOrder= await orderModel.updateOne({_id:order._id},{
      status: 'canceled',
      reasonReject,
      updatedBy:req.user._id // to know who's cancel the order['user or admin']
    })

        // increment the product stock 
      for(const product of order.products){
                                    // DB : postman
        await productModel.updateOne({_id:product.productId},{
          $inc:{stock:product.qty}
        })
      }
      // return coupon not used by this user
      if(order.couponId){
        await couponModel.updateOne({_id:order.couponId},{
         $pull:{usedBy:req.user._id}
        })
      }

    return res.json({message:'success'})
})

export const adminPermission= asyncHandler( (async(req, res, next)=>{
  //  :['pending','canceled','approved','delivered']

  const {orderId}=req.params;
  const {status}=req.body // select option in front end;
 
  const order = await orderModel.findOne({_id: orderId});
  if(!order || order.status === 'delivered'){
    return next(new Error(`this order not found  ||cant change status || status is ${status} `))
  }

  if(status === 'canceled' ){
    // if admin cancel order -> increment stock and return coupon notUsed
    for(const product of order.products){
      await productModel.updateOne({_id:product.productId},{
        $inc:{stock:product.qty}
      })
    }
    if(order.couponId){
      await couponModel.updateOne({_id:order.couponId},{
       $pull:{usedBy:req.user._id}
      })
    }
  }
  
  const changeStatus= await orderModel.updateOne({_id: orderId},{  status ,updatedBy:req.user._id }) 
  // console.log( changeStatus.matchedCount); -> 1
  if(!changeStatus.matchedCount){ //false
    return next(new Error(`can't to change status `))
  }

return res.json({message:'success',changeStatus})


// when update status to canceled we must to change product qty
// and delete usedBy in coupon

 }))


 export const orderPending= asyncHandler( (async(req, res, next)=>{
  //  :['pending','canceled','approved','delivered']

  const {orderId}=req.params;
  
  const order = await orderModel.findOne({_id: orderId});
  if(!order  ){
    return next(new Error(`this order not found   `))
  }

  
 

return res.json({message:'success',order})

 }))


// moment

// 
// let testMoment=moment('2019-03-01').format('YYYY');2019
// let testMoment=moment('2019-03-01').format('YY');19
// let testMoment=moment('2019-03-01').format('DDDD');1..365
// let testMoment=moment('2019-03-01').format('Z'); +02:00
// let testMoment=moment('2019-03-01').format('Q');quarter 1
// let testMoment=moment('2019-03-01').format('A');AM/PM
// let testMoment=moment('2019-03-01').format('X');timestamp
// global time zone utc
// let utc= moment.utc();

// let hi = moment(coupon.expireDate).format('DD/MM/YYYY hh:MM a')
// Wed Mar 20 2023 22:32:47 GMT+0200 ->"20/03/2023 10:03 pm"

// from now 
// let date = moment('2024/03/17') //2 days ago
// return res.json(date.fromNow(true))

// from x 
// let date = moment('2024/03/20 08:30 AM') //2 days ago
// let asd= new Date(date)
// let expDate= moment(coupon.expireDate)

// // return res.json(expDate)
// return(asd )