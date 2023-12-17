import { hash } from "bcrypt";
import userModel from "../../../../DB/model/user.model.js";
import { compare } from "../../../services/hashAndCompare.js";
import { generateToken, verifyToken } from "../../../services/generateAndVeryfyToken.js";
import jwt from 'jsonwebtoken'
import { sendEmail } from "../../../services/sendEmail.js";
import { asyncHandler } from "../../../services/errorHandler.js";

export const signup =  async(req,res,next)=>{
const {username,email,password} = req.body;
const user = await userModel.findOne({email});
if(user){
     return next(new Error('Email already exists',{cause:409}));  //conflict data
}
const token = await jwt.sign({email}, process.env.CONFAIRM_SEGNATURE,{expiresIn:'51h'});
const link =`${req.protocol}://${req.headers.host}/auth/confairmEmail/${token}`;
const newlink =`${req.protocol}://${req.headers.host}/auth/NewconfairmEmail/${token}`;

// const HTML =`<a href="${link}">verify your email</a>`;
  const hashPassword = await hash(password,8);
 const HTML= `<!DOCTYPE html>
 <html>
 <head>
 
   <meta charset="utf-8">
   <meta http-equiv="x-ua-compatible" content="ie=edge">
   <title>Email Confirmation</title>
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <style type="text/css">
   /**
    * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
    */
   @media screen {
     @font-face {
       font-family: 'Source Sans Pro';
       font-style: normal;
       font-weight: 400;
       src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
     }
     @font-face {
       font-family: 'Source Sans Pro';
       font-style: normal;
       font-weight: 700;
       src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
     }
   }
   /**
    * Avoid browser level font resizing.
    * 1. Windows Mobile
    * 2. iOS / OSX
    */
   body,
   table,
   td,
   a {
     -ms-text-size-adjust: 100%; /* 1 */
     -webkit-text-size-adjust: 100%; /* 2 */
   }
   /**
    * Remove extra space added to tables and cells in Outlook.
    */
   table,
   td {
     mso-table-rspace: 0pt;
     mso-table-lspace: 0pt;
   }
   /**
    * Better fluid images in Internet Explorer.
    */
   img {
     -ms-interpolation-mode: bicubic;
   }
   /**
    * Remove blue links for iOS devices.
    */
   a[x-apple-data-detectors] {
     font-family: inherit !important;
     font-size: inherit !important;
     font-weight: inherit !important;
     line-height: inherit !important;
     color: inherit !important;
     text-decoration: none !important;
   }
   /**
    * Fix centering issues in Android 4.4.
    */
   div[style*="margin: 16px 0;"] {
     margin: 0 !important;
   }
   body {
     width: 100% !important;
     height: 100% !important;
     padding: 0 !important;
     margin: 0 !important;
   }
   /**
    * Collapse table borders to avoid space between cells.
    */
   table {
     border-collapse: collapse !important;
   }
   a {
     color: #1a82e2;
   }
   img {
     height: auto;
     line-height: 100%;
     text-decoration: none;
     border: 0;
     outline: none;
   }
   </style>
 
 </head>
 <body style="background-color: #e9ecef;">
 
   <!-- start preheader -->
   <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
     A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
   </div>
   <!-- end preheader -->
 
   <!-- start body -->
   <table border="0" cellpadding="0" cellspacing="0" width="100%">
 
 
 
     <!-- start hero -->
     <tr>
       <td align="center" bgcolor="#e9ecef">
         <!--[if (gte mso 9)|(IE)]>
         <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
         <tr>
         <td align="center" valign="top" width="600">
         <![endif]-->
         <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
           <tr>
             <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
               <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
             </td>
           </tr>
         </table>
         <!--[if (gte mso 9)|(IE)]>
         </td>
         </tr>
         </table>
         <![endif]-->
       </td>
     </tr>
     <!-- end hero -->
 
     <!-- start copy block -->
     <tr>
       <td align="center" bgcolor="#e9ecef">
         <!--[if (gte mso 9)|(IE)]>
         <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
         <tr>
         <td align="center" valign="top" width="600">
         <![endif]-->
         <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
 
           <!-- start copy -->
           <tr>
             <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
               <p style="margin: 0;">Tap the button below to confirm your email address. If you didn't create an account  <a href="https://blogdesire.com">click here </a> </p>
             </td>
           </tr>
           <!-- end copy -->
 
           <!-- start button -->
           <tr>
             <td align="left" bgcolor="#ffffff">
               <table border="0" cellpadding="0" cellspacing="0" width="100%">
                 <tr>
                   <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                     <table border="0" cellpadding="0" cellspacing="0">
                       <tr>
                         <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                           <a href="${link}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">confirm email</a>
                         </td>
                         <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                         <a href="${newlink}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Refresh confairm email  </a>
                       </td>
                       </tr>
                     </table>
                   </td>
                 </tr>
               </table>
             </td>
           </tr>
           <!-- end button -->
 
          
 
          
 
         </table>
         <!--[if (gte mso 9)|(IE)]>
         </td>
         </tr>
         </table>
         <![endif]-->
       </td>
     </tr>
     <!-- end copy block -->
  
 
   </table>
   <!-- end body -->
 
 </body>
 </html>`
  await sendEmail(email,'subject test Confairm email',`${HTML}`)
 const newUser = await userModel.create({email,username,password:hashPassword});
 
return  res.status(201).json({message: 'success',newUser}) 
} 


    export const confairmEmail=  async(req,res)=>{
        const {token} = req.params
        
        
           const decoded =await jwt.verify(token,process.env.CONFAIRM_SEGNATURE)
         

            //   return res.json({message:decoded})

         const user = await userModel.updateOne({email:decoded.email},{confairmEmail:true})
         
        //  return res.json({message:'your email is confirmed ',user})
            // redirect user to login  
            return res.redirect('https://jwt.io/')
        
       } 
 
 

       export const newConfairmEmail=  async(req,res)=>{
        const {token} = req.params
        
        
           const decoded =await jwt.verify(token,process.env.CONFAIRM_SEGNATURE,{expiresIn:'50h'})
         

            //   return res.json({message:decoded})

         const user = await userModel.updateOne({email:decoded.email},{confairmEmail:true})
         if(user.confairmEmail){
            //  return res.json({message:'your email is confirmed'})
            //  or link to frontend url 
            return res.status(200).redirect(`${process.env.FE_URL}`) //login page url

         }
         
     
            return res.redirect('https://jwt.io/')
        
       } 
 

export const signin=async (req,res,next)=>{


const {email,password} = req.body;
// console.log(email,password);
const user = await userModel.findOne({email});

if(!user){
// return res.json({message: 'email is not exist'})
return next(new Error('email is not exist'))
}
else{
    if(!user.confairmEmail){
        // return res.json({message:'plz verify your email'})
        return next(new Error('plz verify your email'))

    } 
}
const match = await compare(password,user.password);
//   console.log(user._id)
if(password === user.password){
    console.log(user._id)
    // const token = generateToken({id:'ahmad'});
    const token = jwt.sign({id:user._id},process.env.SEGNATURE,{expiresIn:'24h'})
    return res.json({message: 'DONE !', token})
}else{
    // return res.json({message: 'password is invalid'})
       return next(new Error('password is invalid'))


}

}