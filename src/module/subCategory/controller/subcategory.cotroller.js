import categoryModel from "../../../../DB/model/category.model.js";
import cloudinary from "../../../services/cloudinary.service.js";
import { asyncHandler } from "../../../services/errorHandler.js";
import subcategoryModel from '../../../../DB/model/subCategory.model.js'
import slugify from "slugify";
import { softDelete } from "../../product/controller/product.cotroller.js";

// export const getAllCategory =asyncHandler(async (req, res,next) => {
//   // const category = await categoryModel.find();
//   // return res.json({message:'success',category})
//   return res.json(req.params.categoryId)

// });
export const getProduct= asyncHandler(async (req, res, next) => {
                    // categortId(parent) / subCategoryId(parent)
    //  categorys/65b3b0d768d8bb12b06c03fa/65b3b0d768d8bb12b06c03fa/product
        const {subCategoryId} =req.params;
        const subCategory_product = await subcategoryModel.findById(subCategoryId).populate({
            path:'vitualProduct',
            match:{ softDelete:{$eq:false}} //condition if softDelete is false
        });
        // const subCategory_product = await subcategoryModel.findById(subCategoryId).populate({
        //     path:'vitualProduct',
        //     select:'name -subCategoryId'
        // });
        return res.json({message:'success',subCategory_product})
    });

export const createSubCategory = asyncHandler(async (req, res, next) => {
 
 const {categoryId} = req.params;
 const {name}=req.body;
console.log( req.params,name)
 if(await subcategoryModel.findOne({name})){
  return next(new Error(`duplicate sub category name ${name}`));
 }
//  return res.json({message: req.file.path}) 
//     path: 'C:\\Users\\ahmad\\AppData\\Local\\Temp\\209195e8509e85f34fcf11172eb7f175',
 const { secure_url, public_id } = await cloudinary.uploader.upload(
  req.file.path,{folder:`${process.env.APP_name}/subCategory`})

  const subCategory = await subcategoryModel.create({categoryId,name,slug:slugify(name),image:{public_id,secure_url}})

 return res.json({message:'success',subCategory})
})

export const getSubCategory =asyncHandler(async (req, res,next) => {
       const{categoryId}=req.params; //specific

  const subcategory = await subcategoryModel.find().populate({
    path:'categoryId',
    // select:'_id'
  })
  return res.json({message:'success',subcategory})


    //     const{categoryId}=req.params; //specific

//   const subcategory = await subcategoryModel.findOne({categoryId})
//   return res.json({message:'success',subcategory})
});

export const getAllSubCategory =asyncHandler(async (req, res,next) => {
    
  const subcategory = await subcategoryModel.find() 
  return res.json({message:'success',subcategory})
});



export const updateSubCategory =asyncHandler( async (req, res, next) => {

    const {subCategoryId,categoryId}=req.params;
    // return res.json({message:'s',subCategoryId,categoryId});

    const category = await subcategoryModel.findOne({_id:subCategoryId});
    if(!category) {
        return next(new Error(`subCategory not found or category id`),{cause:400});
    } 
 
    // if user send name
    if(req.body.name){
// if user want to update a category name and its match the old name. 
        if(category.name == req.body.name){
            return next( new Error('old category name match new'))

        }
        //  ادا عدلت الاسم موخو موجود في الفاعدة بين كل الموجودين
// in all database if you change name and its duplicate other category name 
        if(await subcategoryModel.findOne({name:req.body.name})){
            return next(new Error('buplicate name in database'))
            /**ahmad -> motaz
             * motaz 
             */
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


    await category.save();
    return res.json({message:'success', category})
} )