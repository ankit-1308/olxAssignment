// const hashPassword=require("../utils/hashpassword");
// const UserModel=require("../database/models/user");
// const passport=require("passport");
// const jwt=require("jsonwebtoken");
// require("../utils/passport");

// class UserData {
//     constructor({fullName,gender,contactNo,email,password}){
//         this.fullName=fullName;
//         this.gender=gender;
//         this.contactNo=contactNo;
//         this.email=email;
//         this.password=password;
//     }
// }


// class AuthController{
//     static userSignUp = async(req,res,next)=>{

//         try{
//             const userData = new UserData(req.body);
//             if(!userData.fullName || !userData.email || !userData.gender)
//                 return res.status(400).json({message:"All fields are required"});
//             userData.password = await hashPassword(userData.password);
//             const newUser = new UserModel(userData);
//             const saveUser = await newUser.save();

            if(saveUser)
                return res.status(200).json();
            return res.status(500).json({messgae:"Failed to create a user"});
        }catch(error){
            next(error);
        }
    }

//     static userLogIn = async(req,res,next)=>{
//         passport.authenticate("user_login",async(err,user,info)=>{
//             try{
//                 if (err) {
//                     throw new Error(err);
//                 }
//                 if (!user) {
//                     throw new Error(info.message);
//                 }
//                 req.login(user, { session: false }, async (error) => {
//                     if (error) {
//                         console.log("User couldn't be logged in.");
//                         throw new Error(error);
//                     }
                    
//                     const body = { _id: user._id};
                    
//                     const token = jwt.sign({ user: body}, process.env.SECRET, {
//                         expiresIn: "24h",
//                     });
    
//                     return res.status(200).json({message:"User Logged In successfully",authToken: token });
//                 });
//             }catch(error){
//                 error.status=401;
//                 next(error);
//             }
//         })(req,res,next);
//     }
// }

// module.exports = AuthController;
