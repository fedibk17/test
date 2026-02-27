const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req,res)=>{
    const {first_name,last_name,email,password}=req.body

    if(!first_name || !last_name || !email || !password){
        return res.status(400).json({message: "All fields are required"})
    }
    try{
        const duplicatedEmail = await User.findOne({email});
        if(duplicatedEmail){
            return res.status(409)
        }
        //hash the password
        const hashedPass = await bcrypt.hash(password,10);
        
        const user = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPass
        });

            return res.status(201).json({message:"User created successfully"}) 

    }catch(err){
        console.error(err);
        return res.status(500).json({message:"server error"});
    }
};

const login = async (req,res)=>{
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({message: "All fields are required"})
    }

    const foundedUser = await User.findOne({email});

    if(!foundedUser){
        return res.status(401).json({message:"User not found"})
    }

    const isMatch = await bcrypt.compare(password, foundedUser.password);

    if(!isMatch){
        return res.status(401).json({message:"Wrong password"})
    }

    const accessToken = jwt.sign(
        {
            userInfo: {
                id:foundedUser._id,
                email:foundedUser.email
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:"15m"
        }
    )
}




module.exports = {
    register,
}

