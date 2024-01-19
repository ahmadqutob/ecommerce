import { asyncHandler } from "../services/errorHandler.js";
import { verifyToken } from "../services/generateAndVeryfyToken.js";
import userModel from '../../DB/model/user.model.js'
import { blackListTokens } from "../services/blackListToken.js";
 
export const Roles={
  user :'user',
  admin :'admin'
}

  const auth  = (accessRoles=[])=>{
    return asyncHandler( async (req,res,next)=>{
      const {authrization} = req.headers; 
      
      if(!authrization?.startsWith('_ahd')){
        return res.json({message:'Invalid authorization/bearer key'})
      } 
      const token = authrization.split(process.env.BEARER_KEY)[1]

      // check if token in black list
      // s toke nwill destroyed if its in black list tokens
      if(blackListTokens.includes(token)){
        return res.json({message: 'token in black list '})
      }
      // console.log(token)
      const decoded=  await verifyToken(token)
      // check id user or not Or role user/admin
      const user = await userModel.findById(decoded.id).select('userName role');
      if (!user) {
        return next (new Error(`not register user`, {cause: 401}));
      }
      console.log(user)
      if(!accessRoles.includes(user.role)){
        return next (new Error(`not authorized user`, {cause: 403}));

      }
      req.user= user;
        
      // console.log(verify) // all good id: '65326a4fca6b74b837a3836f'
      req.id= decoded.id;
      // console.log(req.id)
      next()
    })
    
  }
export default auth