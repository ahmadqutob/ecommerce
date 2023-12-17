import userModel from "../../../../DB/model/user.model.js"
 import cloudinary from '../../../services/cloudinary.service.js'
import { asyncHandler } from "../../../services/errorHandler.js"
import { compare, hash } from "../../../services/hashAndCompare.js"
export const profile= (req,res,next)=>{
    return res.json({message: `hello from profile   ${req.id}`})
}





export const profilePic=asyncHandler( async(req,res,next)=>{

    // return res.json(req.file) //file information 
 
    
    // ***********upload to server ***********
    
        if(!req.file){
        return res.json({message:'file is required'})
        
            }
            // all image information -> cloud
        //    const cloud = await cloudinary.uploader.upload(req.file.path,{folder:`saraha/user/${req.id}`});
            
        const {public_id,secure_url} = await cloudinary.uploader.upload(req.file.path,{folder:`saraha/user/${req.id}`});
       console.log({message:secure_url})
        //   return res.json({message:cloud})
        
      
              const user = await userModel.findByIdAndUpdate({_id:req.id},{profilePic:secure_url,public_url:public_id},
                {new:false}); 
                if(user.public_url){

                    await cloudinary.uploader.destroy(user.public_url); // replace/delete last image
                }
                return res.json({message:'sucess',user})

                //  {new:false});// if false print old image info
                //  {new:true});// if true print new image info
       
       
                //     return res.json({message:'profle picture updated successfully'})
        
        
}
)
        





//  upload to multer

// export const profilePic=async(req,res,next)=>{

//     // return res.json(req.file) //file information 
 
    
//             if(!req.file){
//             return next(new Error(' file is required'));
//              }
//      const user= await userModel.findByIdAndUpdate(req.id,{profilePic:`${req.file.dest}/${req.file.filename}`},{new:true});

//      return res.json({message:'success', user})
        
// }










        
        
    export const coverPic =async (req, res,next) =>{
        if(!req.files){
            return next(new Error(' files is required'));
             }
            const coverPicture=[];
            for(const file of req.files){
                coverPicture.push(`${file.dest}${file.filename}`)
            }
            console.log(coverPicture)
        // if(!req.files){
        //     return res.json({message:'file is required'})
        //      }
     const user= await userModel.findByIdAndUpdate(req.id,{coverPic:coverPicture},{new:true});

     return res.json({message:'success', user})
    
    }


        
        
        
        // ****************** upload to local file ****************
        
        //  if(!req.file){
            // return res.json({message:'file is required'})
            //  }
    //  const user= await userModel.findByIdAndUpdate(req.id,{profilePic:`upload/${req.file.filename}`},{new:true});

    //  return res.json({message:'success', user})
    

    //  whats important for new:true
    /**
     * 
     * By default, findOneAndUpdate() returns the document as it was before update was
     *  applied. If you set new: true,
     *  findOneAndUpdate() will instead give you the object after update was applied.
     */




// }




 
// ******************* save image in database ****************

// import userModel from "../../../../DB/model/user.model.js"

// export const profile= (req,res,next)=>{
//     return res.json({message: `hello from profile   ${req.id}`})
// }


// export const profilePic=async(req,res,next)=>{

//         if(!req.file){
//     return res.json({message:'file is required'})

//         }
//         // return res.json({message:req.file})
//         const imageURL= req.file.destination +'/' + req.file.filename
//         const user = await userModel.updateOne({_id:req.id},{profilePic:imageURL});
//         return res.json({message:'profle picture updated successfully'})

// }



export const updatePassword = async(req, res, next)=>{

    const{oldPassword,newPassword} = req.body;

  const user = await userModel.findById(req.id);
  const match = compare(oldPassword,user.password);
  
  if(oldPassword !== user.password){
    return res.json({message:'password mismatch'})
  }
  const hashPassword = hash(newPassword) ;
  const user1= await userModel.findByIdAndUpdate(req.id,{password:hashPassword},{new:true});
  return res.json({message:'password updated successfully',user1})
}

export const shareProfile = async(req, res, next)=>{
    const {id}=req.params;
    const user = await userModel.findById(id).select('username email prfolePic public_url');
    if(!user) {
    return next(new Error("invalid profile id"));
    }else{
    return res.json ({message: 'success', user});
    }
    }