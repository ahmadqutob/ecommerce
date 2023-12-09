import mongoose  ,{Schema,Types,model} from   "mongoose";

const categorySchema = new Schema({

name:{type:String , required:true,unique:true},
slug:{type:String , required:true},
image:{type:Object , required:true},
createdBy:{type:Types.ObjectId,ref:'User'}

},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
    timestamps:true
});
categorySchema.virtual('categorySchemaa',{
    localField:'_id',
    foreignField:'categoryId', // from subCategory schema
    ref:'subCategory'   // reference to subCategoryModel
})
const categoryModel = mongoose.models.Category || model('Category',categorySchema);

export default categoryModel