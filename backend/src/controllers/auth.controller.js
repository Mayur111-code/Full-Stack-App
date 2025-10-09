const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//registeruser
const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  const isUserAlreadyExist = await userModel.findOne({
    email
  })
  if(isUserAlreadyExist){
    return res.status(400).json({
        message:"User already exists"
    })
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,password:hashedPassword
  })
  const token = jwt.sign({
    id:user._id,
  },process.env.JWT_SECRET)
  res.cookie("token", token)

  res.status(202).json({
    message:"User registered successfully",
    user:{
        _id:user._id,
        email:user.email,
        fullName:user.fullName
    }
  })
};


//loginuser
const loginUser = async(req, res)=>{
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email
  })

  if(!user){
    return res.status(400).json({
      message:"Invalid email or password"
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid){
   return res.status(400).json({
      message:"Invalid email or password"
    })
  }
  
  const token = jwt.sign({
    id:user._id,
  },process.env.JWT_SECRET)

  res.cookie("token", token)

  res.status(200).json({
    message:"User logged in successfully",
    user:{
      _id:user._id,
      email:user.email,
      fullName:user.fullName
    }
  })
  
}

const logoutUser = async(req,res)=>{
  res.clearCookie("token");
  res.status(200).json({
    message:"User logged out successfully"
  });
}

const registerFoodPartner = async(req,res)=>{
  const { name, email, password } = req.body;

  const isAccountAlreadyExists = await foodPartnerModel.findOne({
    email
  })

  if(isAccountAlreadyExists){
    return res.status(400).json({
      message:"Food partner account already exists"
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const foodpartner = await foodPartnerModel.create({
    name,
    email,
    password:hashedPassword
  })

  const token = jwt.sign({
    id: foodpartner._id,
  }, process.env.JWT_SECRET)

  res.cookie("token", token)

  res.status(201).json({
    message:"Food partner registered successfully",
    foodpartner: {
      _id:foodpartner._id,
      email:foodpartner.email,
      name:foodpartner.name
    }
  })
} 

const loginFoodPartner = async(req,res)=>{
  const { email, password } = req.body;

  const foodpartner = await foodPartnerModel.findOne({
    email
  })

  if(!foodpartner) {
    return res.status(400).json({
      message:"Invalid email or password"
    })
  }
  const token = jwt.sign({
    id:foodpartner._id,
  }, process.env.JWT_SECRET)

  res.cookie("token", token)

  res.status(200).json({
    message:"Food partner logged in successfully",
    foodpartner:{
      _id:foodpartner._id,
      email:foodpartner.email,
      name:foodpartner.name
    }
  })
}

const logoutFoodPartner = (req,res)=>{
  res.clearCookie("token");
  res.status(200).json({
    message:"Food partner logged out successfully"
  })
}

module.exports = {
    registerUser,loginUser,logoutUser,registerFoodPartner,loginFoodPartner,logoutFoodPartner
}
