import categoryModel from "../../../../DB/model/category.model.js";
import cloudinary from "../../../services/cloudinary.service.js";
import { asyncHandler } from "../../../services/errorHandler.js";
import slugify from "slugify";

export const getAllCategory =asyncHandler(async (req, res,next) => {
  const category = await categoryModel.find().populate({
    path:'subCategoryVirtual',
    select:'_id name'
  }); // using virtual populate
  return res.json({message:'success',category})
});

export const getCategory =asyncHandler(async (req, res,next) => {
  const category = await categoryModel.findById(req.params.myid);
  return res.json({message:'success',category})
});
export const createCategory = asyncHandler(async (req, res, next) => {
  // const { name } = req.body;
  const name = req.body.name.toLowerCase();
  if (await categoryModel.findOne({ name })) {
    return next(new Error(`Category already exists ${name}`));
  }

  const slug = slugify(name);
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `${process.env.APP_name}/category` }
  );
 
  const category = await categoryModel.create({ name,slug,image: { secure_url, public_id },createdBy:req.user._id,updatedBy:req.user._id});
  return res.status(200).json({ message: "success", category });
});


export const updateCategory = async (req, res, next) => {

    const category = await categoryModel.findOne(req.params.id);
    if(!category) {
        return next(new Error(`category not found`));
    }

    // if user send name
    if(req.body.name){
// if user want to update a category name and its match the old name. 
        if(category.name == req.body.name){
            return next( new Error('old category name match new'))

        }
// in database if you change name and its duplicate other category name 
        if(await categoryModel.findOne({name:req.body.name})){
            return next(new Error('buplicate name in database'))

        }
        // change category name
        category.name = req.body.name;
        // add slug to category  
        category.slug= slugify(req.body.name);
    }

    if(req.file){
        // add image 
        const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APP_name}/category`})
        // delete old one
        await cloudinary.uploader.destroy(category.image.public_id); 
        //change old  category  image to new one
        category.image={secure_url,public_id}
    }

    category.updatedBy=req.user._id
    await category.save();
    return res.json({message:'success', category})
} 