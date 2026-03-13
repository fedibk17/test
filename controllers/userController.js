const { request } = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const getAllUsers = async (req, res) =>{
    const users = await User.find().select("-password");

    res.json(users);
}
    const updateUser = async (req, res) =>{
        const { id } = req.params;
        const updates = req.body;

        if(updates?.password){
            updates.password = await bcrypt.hash(updates.password,10);
        }
    
        const updatedUser = await User.findByIdAndUpdate(id, updates, {new: true} ).select("-password");

        if(!updatedUser){
            return res.status(404).json({message:"User not found"});
        }
        res.json({updatedUser});
    }
    const deleteUser = async(req, res) =>{
        const { id } = req.params;


        const user = await User.findByIdAndDelete(id);
        if(!user){
            res.status(404).json({message:"user not found"});
        }
        res.status(200).json({
            message: "User deleted",
   
        });
    }

    const findUser = async(req, res)=>{
       try{
        const { query } = req.query;
        if(query?.length < 3){
            return res.status(400).json({message: "min 3 letters"});
        }

        const users = await User.find({first_name: {$regex:`^${query}`, $options: 'i'}}).select("-password");
        if(users.length === 0){
            return res.status(404).json({message: "No user found"})
        }
        res.json(users)
       }catch(err){
        console.error(err)
        res.status(500).json({message: "Server error"})
       }
    }



module.exports = {
    getAllUsers,
    updateUser,
    deleteUser,
    findUser
}