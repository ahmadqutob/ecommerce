import jwt from 'jsonwebtoken'
import { asyncHandler } from './errorHandler.js';

export const generateToken = asyncHandler( async(payload, signature=process.env.SEGNATURE,expiresIn='20h')=>{
    const token = await jwt.sign(payload, signature,{expiresIn});
    console.log('generated token', token)
   return token;
}
);
export const verifyToken = async(payload, signature=process.env.SEGNATURE)=>{
    const decoded = await jwt.verify(payload, signature) ;
 
    return decoded;
}