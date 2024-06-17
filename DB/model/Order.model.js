 import mongoose  ,{Schema,Types,model} from   "mongoose";

const orderSchema = new Schema({

 userId:{type:Types.ObjectId,ref:'User',required:true},
 address:{type:String,required:true},
 phoneNumber:{type:[{type:String,required:true}]},

 products:[{
 name:{type:String,required:true,default:'orderName'},
  productId:{type:Types.ObjectId,ref:'Product',required:true},
  qty:{type:Number },
   unitePrice:{type:Number,required:true},
  finalPrice:{type:Number,required:true}
 }] ,

 finalPrice:{type:Number,required:true} ,//the final for all products procies 
 subTotal:{type:Number,required:true} , // for   products count after coupon 
 couponId:{type:Types.ObjectId,ref:'Coupon' },
 payment:{
    type:String,default:"cash"
    ,enum:['cash','card' ] },
status :{type:String,default:'pending',
    enum:['pending','canceled','approved','delivered']
},
note:{type:String}, // note:String
reasonReject:String ,
updatedBy:{type:Types.ObjectId,ref:'User'},
deleted:{type:Boolean,default:false} 
},{ timestamps:true}); 

const  orderModel = mongoose.models.Order || model('Order',orderSchema);

export default orderModel 