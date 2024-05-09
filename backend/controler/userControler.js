
const User = require("../db/userSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const userLogin = async(req,res)=>{
  try {
    const {email,password}  = req.body;
    console.log(req.body)
    if(!email){
        return res.status(400).json({message:"Email is required"});
    }
    if(!password){
        return res.status(400).json({message:"Password is required"});
    }
    //check user existance in database
    const isUserExist  = await User.findOne({email});
    console.log(isUserExist)
    if(!isUserExist){
        return res.status(400).json({message:"Invalid email or password"});
    }
    // check the password and compare
     isCorrectPass = await bcrypt.compare(password,isUserExist.password);
     if(!isCorrectPass){
        return res.status(400).json({message:"Invalid email or password"});
     }
     console.log('first')
     // Now user is valid then create a token and save in cookie
     const payload = {id:isUserExist._id,email:email,name:isUserExist.name}
     const token = jwt.sign(payload,process.env.JWT_SECRET||"MYMERNSTACKaSSIGNMENT" , { expiresIn:86400 });
     console.log(token)
     return res.status(200).json({message:'user Login successfully',user:{...isUserExist,password:""},token:JSON.stringify({tokenValue:token,user:payload})});
    
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' ,error});
  }
}


const userRegister = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if the email is already registered
      if(!name || !email ||!password){
        return res.status(400).json({message:'All fields required'})
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email is already registered' });
      }
       
      const hashPassword = await bcrypt.hash(password,10);
      // Create a new user
      const newUser = new User({ name,email, password:hashPassword });
      await newUser.save();
  
      return res.status(200).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error('User registration error:', error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };


  module.exports  = {
    userLogin,
    userRegister,

  }