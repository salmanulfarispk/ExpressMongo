const mongoose=require("mongoose")
const Admin=require("../models/AdminSchema")
const User=require("../models/UserSchema")
const jwt=require("jsonwebtoken")
mongoose.connect("mongodb://127.0.0.1:27017/user-management", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});




module.exports={

//Register an admin

  register:async (req,res)=>{
      const {username,name,email,password}=req.body;

      await Admin.create({
        
        username:username,
        name:name,
        email:email,
        password:password

      })
      res.json({message:"New admin registered succesfully"})
  },
   
  //Admin login
   login:async(req,res)=>{
      
    const {username,password}=req.body
        console.log(req.body)

  const admin=Admin.findOne({
    username:username,    
    password:password
  })
  if(!admin){
    res.status(404).json({Error:"Please register and then try to login"})
  }
  const token=jwt.sign(
     {username:admin.username},
    process.env.ACCESS_TOKEN_SECRET
  )
 res.json({Message:"login succesfull",token})
  
  },
   
  //Create a user

  Createuser: async(req,res)=>{
    const {name,username,email,password}=req.body
    const photo= req.file ? req.file.filename : " " ;
     await User.create({
      name:name,
      username:username,
      email:email,
      password:password,
      photo:photo,
    });
    res.json({Message:"user created succesfully"})
  },

  //Get all user

  getAllusers: async(req,res)=>{
    const allusers=await User.find();
    res.status(200).json({
      status:"success",
      Message:"succesfully getted all users",
      data:allusers
    })
  },

  //Get user by id

  getUserByid: async(req,res)=>{
    const userId=req.params.id;
    const user=await User.findById(userId)

    if(!user){
     return res.status(404).json({Error:"user not found"})
    }
     res.status(200).json({
        status:"success",
        Message:"Got the user",
        data:user
     })

    
  },

  //update a user by id

  updateUser: async(req,res)=>{
       const userid=req.params.id
       const {name,username,email,password}=req.body
       const user=await User.findByIdAndUpdate(userid,{
          $set :{name,username,email,password}
       })
       if(!user){
        res.status(404).json({Error:"user not found"})
       }
       res.json({
        message:"user updated succesfully"
       })
  },

  //delete user by id

  deleteByid: async (req,res)=>{
    const userid=req.params.id
    const user = await User.findByIdAndRemove(userid);
    if(!user){
      res.status(404).json({error:"user not found"})
    }
    res.json({message:"delete user succesfully"})
  }


}