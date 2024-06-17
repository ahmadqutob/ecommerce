 import mongoose from "mongoose";

 const connectDB =async()=>{

    //  return await mongoose.connect(process.env.CONNECTDB)
      return await mongoose.connect(process.env.CONNECT_CAMPOSS1)
    .then( result =>{
      // console.log('connection successfuly !!')
    }
    ).catch( err =>{
      // console.log('connection error' +err)
    } );

 }
//  connectDB.sync = {alert:true} 
export default connectDB 

 
 
