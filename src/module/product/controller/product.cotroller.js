 import cloudinary from "../../../services/cloudinary.service.js";
import { asyncHandler } from "../../../services/errorHandler.js";
import productModel from '../../../../DB/model/product.model.js'
import slugify from "slugify";
import subcategoryModel from "../../../../DB/model/subCategory.model.js";
import brandModel from "../../../../DB/model/brand.model.js";
 

export const getProduct=asyncHandler( async(req,res,next) => {
    const {productId}=  req.params;
    const product = await productModel.find({productId});
   
    return res.json({message: "success",product});

})
export const restoreSoftDelete=asyncHandler( async(req,res,next) => {
    const {productId} = req.params;
    const updateSoftDelete= await productModel.findByIdAndUpdate({_id:productId,softDelete:true},
        {softDelete:false},{new:true});

        return res.json({message: 'success',updateSoftDelete})
 })
 
export const softDelete=asyncHandler( async(req,res,next) => {
    const {productId} = req.params;
    const updateSoftDelete= await productModel.findByIdAndUpdate({_id:productId,softDelete:false},
        {softDelete:true},{new:true});

        return res.json({message: 'success',updateSoftDelete})
 })
 
  
 export const forceDelete=asyncHandler( async(req,res,next) => {
    const {productId} = req.params;
    const forceDeleteProduct= await productModel.findByIdAndDelete({_id:productId,softDelete:true}  );

        return res.json({message: 'success',forceDeleteProduct})
 })
export const createProduct = asyncHandler(async (req, res, next) => {


 
  const { name ,price,discount,categoryId,subCategoryId,brandId} = req.body;
    
 
  // check if there's  category & subCategory  &brand before creating product
  const checkSubCategory= await subcategoryModel.find({_id: subCategoryId,categoryId})
   if(!checkSubCategory) {
    return next(new Error('invalid vategory or subcategory'))
  }  
  
  const checkBrand = await brandModel.find({_id: brandId})
  if(!checkBrand) {
    return next(new Error('invalid brand id '))
  }

     req.body.slug=slugify(req.body.name);
        req.body.finalPrice=price - (price * ( (discount || 0) / 100));

        const {secure_url,public_id}= await cloudinary.uploader.upload(req.files.mainImage[0].path,{folder:`${process.env.APP_name}/products/mainImage`})
        req.body.mainImage={secure_url,public_id}; 
     
        if(req.files.subImage){
             
        req.body.subImage= []
                for(const file of req.files.subImage){
                  
                        console.log(req.files.subImage);
                        const {secure_url,public_id}= await cloudinary.uploader.upload(file.path,{folder:`${process.env.APP_name}/products/subImage`})
                        req.body.subImage.unshift({secure_url,public_id})
                 }
    

 }
 
 
   req.body.createdBy= req.user._id
   req.body.updatedBy= req.user._id
const productt = await productModel.create(req.body)
if(!productt){
    return next( new Error('faild to create productt'));
}
    console.log(req.body.subImagee)
   return res.json({message: 'success', productt})
   
   
   
   
   
   
   
});






export const updateProduct= asyncHandler(async (req,res,next)=>{
    const {productId}=req.params;
  const { name ,price,discount,categoryId,subCategoryId,brandId} = req.body;

  const newProduct= await productModel.findById({_id: productId});
  if(!newProduct){
    return next( new Error('product not found'));
  }

    if(categoryId && subCategoryId){
        const checkSubCategory= await subcategoryModel.findOne({_id: subCategoryId,categoryId})
        if(checkSubCategory){
            newProduct.categoryId=categoryId;
            newProduct.subCategoryId=subCategoryId;
        }else{
    return next( new Error('categoryId or subCategoryId not found'));

        }

    }else if(subCategoryId){
        const checkSubCategory= await subcategoryModel.findOne({_id: subCategoryId})
        if(checkSubCategory){
            newProduct.subCategoryId=subCategoryId;
            
        }else{
            return next( new Error(' subCategoryId not found'));
    
                }
    }

    if(brandId){
        const checkbrandId= await brandModel.findOne({_id: brandId})
        if(checkbrandId){
            newProduct.brandId=brandId;   
        }else{
            return next( new Error(' brandId not found'));

        }
    }
    if(name){
        newProduct.name=name;   
        newProduct.slug=slugify(name);   
    }
    if(req.body.colors){
        newProduct.colors=req.body.colors
    }  
    if(req.body.description){
        newProduct.description=req.body.description
    } 
    if(req.body.sizes){
        newProduct.sizes =req.body.sizes
    }
    if(req.body.stock){
        newProduct.stock =req.body.stock
    }
    
    if(price && discount){
        newProduct.price=price;
        newProduct.discount=discount;
        newProduct.finalPrice=price - (price * (discount || 0) / 100);
        //                     new       new      new 
    }else if (price){
        newProduct.price=price;
        newProduct.finalPrice=price - (price * (newProduct.discount ) / 100);
                        //    new      new      old discount from db  / 100
    }else if(discount){
        newProduct.discount=discount;
        newProduct.finalPrice=newProduct.price - (newProduct.price * (discount) / 100);
        //                     old from db          old from db            new     

    }
    // console.log(newProduct.mainImage.public_id)
    // if(req.files.mainImage){
    //     const {secure_url,public_id}= await cloudinary.uploader.upload(req.files.mainImage[0].path,{folder:`${process.env.APP_name}/products/mainImage`})
    //     await cloudinary.uploader.destroy('ecommerce/products/mainImage/raz75680rkyqm9yr9yro')
        
    //      newProduct.mainImage.secure_url=secure_url ;
    //      newProduct.mainImage.public_id=public_id ;
    //     }

     if(req.files.subImage){
        const subImages= [];
        for(const file of req.files.subImage){
            const {secure_url,public_id}= await cloudinary.uploader.upload(file.path,{folder:`${process.env.APP_name}/products/subImage`})
            subImages.push(secure_url,public_id)
            console.log(file.newProduct)
            console.log(file)
            // await cloudinary.uploader.destroy()
            // await cloudinary.uploader.destroy()
        }
            newProduct.subImage = subImages;
     }   


 const SaveInfo = await newProduct.save();  
 if(!SaveInfo){ 
    return next( new Error(`faild to update product`));
 }else{

     return res.json({message: 'success', newProduct});
    }
    
    /**
     *  "categoryId": "656a4259c9819de5f9c0bdaa",
        "subCategoryId": "657432423186ce3b31617ed0",
      */

    
})


export const cart= asyncHandler(async (req,res,next) => {
    
})

export const getAllProduct =asyncHandler(async (req, res,next) => {
  const product = await productModel.find().populate('reviews')
  return res.json({message:'s',product})
});




export const allProductWithReviews =asyncHandler(async (req, res,next) => {
    const product = await productModel.find().populate('reviews')
    return res.json({message:'s',product})
  });
 

  export const pagination =asyncHandler(async (req, res,next) => {
   
    let {page,size} = req.query;
    // know skip
    const skip = (page -1 ) * size

    if(!page || page <=0){
        page = 1;
    }
    if(!size || size <=0){
        page = 3;
    }
console.log(req.query);
 
  const product = await productModel.find().limit(size).skip(skip)
  // get all products without condiations EX:(price > 100)
  return res.json({message:'pagination',product})
  })

  export const filterProduct =asyncHandler(async (req, res,next) => {
   
        let {page,size} = req.query;
        const skip = (page -1 ) * size

        if(!page || page <=0){
            page = 1;
        }
        if(!size || size <=0){
            page = 3;
        }
console.log(req.query);
// if problem in $
 
// * const product = await productModel.find().limit(size).skip(skip)// get all products without condiations EX:(price > 100)

// [solution to add condition EX: price[$gte]: 100 ]
//  convert req.query to string(stringfy) to replace (in -> $in) to add $
// convert string to parse(json.parse) 
    //  const query= JSON.parse( JSON.stringify(req.query).replace(/(gt|gte|lt|lte|in|nin|eq|neq|)/g,match => `$${match}`)
    // )

// ************ 1- find without condition********
// const product = await productModel.find().limit(size).skip(skip) without condition
// http://localhost:3000/product/pagination?page=1&size=2 كم منتج يعرض


// ************ 2- find with condition [$gth]*****
// const product = await productModel.find(req.query).limit(size).skip(skip)
// http://localhost:3000/product/pagination?price[$lt]=320 عرض المنتجات حسب الشرط


// ************ 2- remove $ from req.query price[gt]=320*****

//  console.log(req.query);// { price: { lt: '320' } }
// const query=JSON.parse( JSON.stringify(req.query).replace(/(gt|gte|lt|lt|in|nin|eq|neq)/g, match => `$${match}` ))
// console.log(query);//    { price: { '$gt': '320' } }
//  // http://localhost:3000/product/pagination?price[gt]=320 نرسل بدون$
// const product = await productModel.find(query).limit(size).skip(skip)
 
// ERROR -> { price: { '$gt': '320' }, page: '4' } رح يضيف دزلار للبيج ولازم نمسحها



// ************ 3-[deep Copy] solve error $page=1********

const exQueryParams=['page', 'size','sort','search']
const filterQuery={...req.query}

console.log(filterQuery)  //{ price: { gt: '320' }, page: '4' }
exQueryParams.map(params=>{  
    delete filterQuery[params]
    }  )
    console.log(filterQuery) ;//  price: { gt: '320' }

  const query=JSON.parse( JSON.stringify(filterQuery).replace(/(gt|gte|lt|lt|in|nin|eq|neq)/g, match => `$${match}` ))
  const product = await productModel.find(query).limit(size).skip(skip)


return res.json(product)
// http://localhost:3000/product/pagination?price[gt]=320&page=4
  });
 


  


  
  export const sortProduct =asyncHandler(async (req, res,next) => {
 
// ************ 3-[deep Copy] solve error $page=1********
let {page,size} = req.query;
const skip = (page -1 ) * size

if(!page || page <=0){
    page = 1;
}
if(!size || size <=0){
    page = 3;
}

const exQueryParams=['page', 'size','sort','search']
const filterQuery={...req.query}

console.log(filterQuery)  //{ price: { gt: '320' }, page: '4' }
exQueryParams.map(params=>{  
delete filterQuery[params]
}  )
console.log(filterQuery) ;//  price: { gt: '320' }

const query=JSON.parse( JSON.stringify(filterQuery).replace(/(gt|gte|lt|lt|in|nin|eq|neq)/g, match => `$${match}` ))
const product = await productModel.find(query).limit(size).skip(skip).sort(req.query.sort.replaceAll(',',' '))


return res.json(product)
// http://localhost:3000/product/pagination?price[gt]=320&page=4
});

export const search =asyncHandler(async (req, res,next) => {
 
    // ************ 3-[deep Copy] solve error $page=1********
    let {page,size} = req.query;
    const skip = (page -1 ) * size
    
    if(!page || page <=0){
        page = 1;
    }
    if(!size || size <=0){
        page = 3;
    }
    
    const exQueryParams=['page', 'size','sort','search']
    const filterQuery={...req.query}
    
    console.log(filterQuery)  //{ price: { gt: '320' }, page: '4' }
    exQueryParams.map(params=>{  
    delete filterQuery[params]
    }  )
    console.log(filterQuery) ;//  price: { gt: '320' }
    
    const query=JSON.parse( JSON.stringify(filterQuery).replace(/(gt|gte|lt|lt|in|nin|eq|neq)/g, match => `$${match}` ))
    const product = await productModel.find(query).limit(size).skip(skip).sort(req.query.sort?.replaceAll(',',' ')).find({
        $or:[
           { name:{$regex: req.query.search,$options:'i'}},
        {description:{$regex: req.query.search,$options:'i'}},
        ]
    })
    
    
    return res.json(product)
    // http://localhost:3000/product/pagination?price[gt]=320&page=4
    });
    