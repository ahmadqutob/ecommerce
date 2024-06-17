 import {model, Schema, Types } from "mongoose";
import mongoose from "mongoose";
 
  const userSchema= new Schema({
    username:{type:String, required:true,min:[1]},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    confairmEmail:{type:Boolean,default:false},
    image:{type:Object},
    phone:{type:String},
    role:{type:String,enum:['admin', 'user','hr'],default:'user'},
    status:{type:String,enum:['active', 'notActive' ],default:'active'}, // block user or not
    gender:{type:String,enum:['male', 'female' ] },
    forgotPassword:{type:String,default:null}, 
    changePasswordTime:{type:Date}, 
    wishlist:[{type:Types.ObjectId,ref:'product'}]
    // gender:{type:String }, 
     
 
    // profilePic:{type:String,required:false},
    // coverPic:{type:Array },
    // public_url:{type:String}
},{timestamps:true});
 
const userModel= mongoose.models.User ||model( 'User',userSchema );
export default userModel