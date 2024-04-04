import jwt from "jsonwebtoken";

const isAuthenticated = async (req,res,next) => {
   try {
    console.log(req);
     const {token} = req.cookies;
     console.log(req.cookies.token);
     console.log("token",token);
    //  console.log(req);
    //  console.log(token);
     if(!token){
         return res.status(400).json({
             success:false,
             message:"user is not authenticated"
         })
     }
     const decodedToken = await jwt.verify(token,process.env.JWT_SECRET_KEY);
     
     req.user = decodedToken;
     next();
   } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
   }
}

export default isAuthenticated;