import mongoose  ,{Schema,Types,model} from   "mongoose";

const categorySchema = new Schema({

name:{type:String , required:true,unique:true},
slug:{type:String , required:true},
image:{type:Object , required:true},
createdBy:{type:Types.ObjectId,ref:'User',required:true},
updatedBy:{type:Types.ObjectId,ref:'User',required:true},

},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
    timestamps:true
});
// save child(subCategory)information in parent
categorySchema.virtual('subCategoryVirtual',{
    localField:'_id',//link from categorySchema (foreignkey from categorySchema)
    foreignField:'categoryId', // from subCategory schema // who i link with categorySchema
    ref:'subCategory'   // reference to subCategoryModel
})
const categoryModel = mongoose.models.Category || model('Category',categorySchema);

export default categoryModel