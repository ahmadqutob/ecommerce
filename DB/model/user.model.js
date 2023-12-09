 import {model, Schema } from "mongoose";
import mongoose from "mongoose";
 
  const userSchema= new Schema({
    username:{type:String, required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    confairmEmail:{type:Boolean,default:false},
    profilePic:{type:String,required:false},
    coverPic:{type:Array },
    public_url:{type:String}
},{timestamps:true});
 
const userModel= mongoose.models.User ||model( 'User',userSchema );
export default userModel