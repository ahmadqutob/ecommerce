 import mongoose  ,{Schema,Types,model} from   "mongoose";

const reviewSchema = new Schema({

 comment:{type:String, required:true},
 productId:{type:Types.ObjectId, ref:'Product',required:true}, //review in product
 orderId:{type:Types.ObjectId, ref:'Order',required:true}, // to know order Status
 rating:{type:Number , required:true},
 createdBy:{type:Types.ObjectId, ref:'User',required:true},
 image:{type:Object , required:true},
  
 
 },{ timestamps:true}); 

const  reviewModel = mongoose.models.Review || model('Review',reviewSchema);

export default reviewModel 