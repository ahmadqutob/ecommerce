export const asyncHandler= (fn)=>{
    return (req,res,next)=>{

        fn(req,res,next).catch(err=>{
            // return res.status(500).json({message:'catch error', err:err.stack})
            if(process.env.APP_mood == 'dev'){
                return next(new Error(err.message)) // development mood
            }
            return res.status(500).json({message :'catch error'}); // production mood
        })
    }
}