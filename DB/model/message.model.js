 
import mongoose, { model,Schema } from "mongoose";
const messageSchema= new Schema({
    message:{type:String,require:true},
    reciver_id:{type:mongoose.Types.ObjectId}
},{timestamps:true})

const messageModel = mongoose.models.Message || model("Message",messageSchema)

export default messageModel