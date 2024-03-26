import { asyncHandler } from "../services/errorHandler.js";
import { verifyToken } from "../services/generateAndVeryfyToken.js";
import userModel from '../../DB/model/user.model.js'
  
export const Roles={
  user :'user',
  admin :'admin',
  poth:['user', 'admin','hr'] ,
  softDelete :['admin'], // delete product from users
  restoreSoftDelete :['admin'], // delete product from users
   forceDelete :['admin'],// delete from db
   createCoupon :['admin'], // create
   createOrder :['admin'], // create
   cancelOrder :['user','admin'], // create
  //  change order status
  adminPermission:[ 'admin'],
   orderPending :[ 'admin'], // to update status
   orderCanceled :[ 'admin'], // to update status
   orderApproved :[ 'admin'], // to update status
   orderDelivered :[ 'admin'], // to update status
 
}

  const auth  = (accessRoles=[])=>{
    return asyncHandler( async (req,res,next)=>{
      const {authorization} = req.headers; 
      
      if(!authorization?.startsWith('_ahd')){
        return res.json({message:'Invalid authorization/bearer key'})
      } 
      const token = authorization.split(process.env.BEARER_KEY)[1]
 
      // console.log(token)
      const decoded=  await verifyToken(token)
      // check id user or not Or role user/admin
      const user = await userModel.findById(decoded.id);
      if (!user) {
        return next (new Error(`not register user`, {cause: 401}));
      }
      // console.log(user)
      if(!accessRoles.includes(user.role)){
        return next (new Error(`not authorized/allowd user`, {cause: 403}));

      }
      req.user= user;
        
      // console.log(verify) // all good id: '65326a4fca6b74b837a3836f'
      req.id= decoded.id;
    
      // console.log(parseInt( user.changePasswordTime.getTime() / 1000));  // change password time
      // console.log(decoded.iat) // expire token time 

      if ( parseInt( user.changePasswordTime.getTime() / 1000) > decoded.iat ) {
        return next (new Error(`expire token time`));
      }
       next() 
    })
    
  }
export default auth 
