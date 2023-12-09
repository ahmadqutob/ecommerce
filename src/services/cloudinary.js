 
import multer from "multer"

  
// handler multer error
export const HME=(err,req,res,next)=>{
    if(err){
        return res.json({message:'multer error' ,err}  )
    }else{
        next()
    }
}


export const fileValidation={
    image:['image/png', 'image/jpg', 'image/jpeg' ],
    file:['application/pdf']
}
// function fileUpload  (fileValidation.image) {
function fileUpload  (customValidation) {
  

     const storage = multer.diskStorage({})


    function fileFilter(req,file,cb){
        // if(['image/png', 'image/jpg', 'image/jpeg' ].includes(file.mimetype)){
        if(customValidation.includes(file.mimetype)){

            cb(null,true)
    }else{
        cb('invalid format',false)
    }
}

        const upload= multer({fileFilter,storage});
        return upload
}
export default fileUpload  
   


 