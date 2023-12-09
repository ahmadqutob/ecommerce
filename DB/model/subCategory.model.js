import mongoose  ,{Schema,Types,model} from   "mongoose";

const subcategorySchema = new Schema({

name:{type:String , required:true,unique:true},
slug:{type:String , required:true},
image:{type:Object , required:true},
createdBy:{type:Types.ObjectId,ref:'User'},
categoryId:{type:Types.ObjectId,ref:'Category'},

},{timestamps:true});

const subcategoryModel = mongoose.models.subCategory || model('subCategory',subcategorySchema);

export default subcategoryModel