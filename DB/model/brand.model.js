 import mongoose  ,{Schema,Types,model} from   "mongoose";

const brandSchema = new Schema({

name:{type:String , required:true,unique:true},
 slug:{type:String , required:true},
  categoryId:[{type:Types.ObjectId,ref:'User'}],// brand in category
  createdBy:{type:Types.ObjectId,ref:'User',required:true},
  updatedBy:{type:Types.ObjectId,ref:'User',required:true},
  
image:{type:Object,required:true}, 
},{ timestamps:true});


const  brandModel = mongoose.models.Brand || model('Brand',brandSchema);

export default brandModel