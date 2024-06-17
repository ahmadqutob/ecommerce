 
import multer from "multer"

// i used buledin library  to find my location
import path from "path";
import { fileURLToPath } from "url";
const myLocation =path.dirname(fileURLToPath(import.meta.url))
import fs from 'fs'

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

function fileUpload  (customPath='public',customValidation) {
  
//   if i want to change my folder direction i use path
    // console.log(myLocation)
    const fullpath = path.join(myLocation,`../../uploads/${customPath}`)
    // console.log(fullpath)
    if(!fs.existsSync(fullpath)){
        fs.mkdirSync(fullpath) // create folder if theres no folder
    } 

    // console.log(fs.existsSync(fullpath)) // return true if folder founded
     const storage = multer.diskStorage({
        destination: (req,file,cb)=>{
            // file.ahmad=' i can send it to profilePic function in file'
            file.dest=`uploads/${customPath}` ;
            cb(null,fullpath)
            // ERROR, PATH
        },
        filename: (req, file, cb)=>{
                  cb(null,Date.now() + file.originalname)  
                    } 
    })


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
   




// ************** save image to database ****************************

// import multer from "multer"

// // handler multer error
// export const HME=(err,req,res,next)=>{
//     if(err){
//         return res.json({message:'multer error' ,err}  )
//     }else{
//         next()
//     }
// }

// function fileUpload  () {
//      const storage = multer.diskStorage({
            // storage area 
//          destination:  (req, res, cb)=>{
//              cb(null,'uploads')
//          },
//            hash file name
//          filename: (req, file, cb)=>{
//         cb(null,Date.now() + file.originalname)  
//          }
//     })


//     function fileFilter(req,file,cb){
//         if(['image/png', 'image/jpg', 'image/jpeg' ].includes(file.mimetype)){
//             cb(null,true)
//     }else{
//         cb('invalid format',false)
//     }
// }

//         const upload= multer({fileFilter,storage});
//         return upload
// }
// export default fileUpload  
   

// *********************** safe image on my device ***********************

 
// import multer from "multer"

// // handler multer error
// export const HME=(err,req,res,next)=>{
//     if(err){
//         return res.json({message:'multer error' ,err}  )
//     }else{
//         next()
//     }
// }

// function fileUpload  () {
//      const storage = multer.diskStorage({
//          destination:  (req, res, cb)=>{
//              cb(null,'uploads')
//          },
//          filename: (req, file, cb)=>{
//         cb(null,Date.now() + file.originalname)  
//          }
//     })


//     function fileFilter(req,file,cb){
//         if(['image/png', 'image/jpg', 'image/jpeg' ].includes(file.mimetype)){
//             cb(null,true)
//     }else{
//         cb('invalid format',false)
//     }
// }

//         const upload= multer({fileFilter,storage});
//         return upload
// }
// export default fileUpload  
   