import { signinSchema } from "../module/auth/auth.validation.js"

 
 

 

 const validation = (schema)=>{
    return(req,res,next)=>{
        const inputDate = {  ...req.body,...req.params,...req.query };
      if(req.file){
         inputDate.file=req.file
      }
      console.log('inputDate',inputDate)
        const validationRes = schema.validate(inputDate,{abortEarly:false});
       
        if(validationRes.error?.details){
           return res.json({message: 'ERRORS',validationREsult: validationRes.error.details});
        }return next();
        
      }
   } 
      
export default validation









 




// const datatype=['body','query','params'];
// const validation = (schema)=>{
//     return(req,res,next)=>{
//        let validationArray=[]; 
     
//         datatype.forEach(key=>{
//             if(schema[key]){
//                 console.log(schema[key])
//                 // const validationResult= schema[key].validate(req[key],{abortEarly:false});
//                 // console.log(validationResult)
//                 // if(validationResult.error){
//                 //     validationArray.push(validationResult.error.details);
//                 // }
//             }
//         })
//         if(validationArray.length>0){
//             return res.json({message:'validation error',validationArray})
//         }else{
//             next()
//         }

//     }
// }

// export default validation



// const dataMethods=['body','query','params']

// const validation = (Schema)=>{

//     return(req,res,next)=>{
//         const validationArray=[]

//         dataMethods.forEach(key=>{
//             // console.log(key)body  query params
//             // هون يتم تنفيد الفاليديشن
//             if(Schema[key]){
//                 const validationResult=Schema[key].validate(req[key] ,{abortEarly:false})
//             if(validationResult.error){
//                 validationArray.push(validationResult.error.details)
//             }

//             }
//         })
//         if(validationArray.length >0 ){
//             return res.json({message: 'validationERROR',validationArray})
//         }else{
//              next()
//         }

//     } 
// }
// export default validation 






 






// const validation = (Schema)=>{


// return (req,res,next)=>{

//     const validationArray=[];
//     const validationResult = Schema.body.validate(req.body, {abortEarly:false});
//     const validationResultQuery= Schema.query.validate(req.query, {abortEarly:false});
//     const validationResultparams= Schema.query.validate(req.query, {abortEarly:false});
//     const validationResultHeaders= Schema.query.validate(req.query, {abortEarly:false});
//     // الكود طويل وبحتاج اكتر من دالة{}function
//     if(validationResult.error){
//         validationArray.push(validationResult)
//     }
//     if(validationResultQuery.error){
//         validationArray.push(validationResultQuery)
//     }
//     if(validationArray.length > 0){
//         return res.json({message:"validation error",validationArray})
// }else{
//     return next()
// }

// }
// }
// export default validation 