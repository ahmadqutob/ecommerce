import { verifyToken } from "../services/generateAndVeryfyToken.js";

 


  const auth =async (req,res,next)=>{
    const {authrization} = req.headers; 

     if(!authrization?.startsWith('_ahd')){
        return res.json({message:'Invalid authorization/bearer key'})
    } 
    const token = authrization.split(process.env.BEARER_KEY)[1]
    // console.log(token)
    const decoded=  await verifyToken(token)
    // console.log(verify) // all good id: '65326a4fca6b74b837a3836f'
req.id= decoded.id;
// console.log(req.id)
next()
}

export default auth