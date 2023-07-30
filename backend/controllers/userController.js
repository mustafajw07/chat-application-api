const asyncHandler = require('express-async-handler');
const User = require('../models/UserMode');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config()

const registerUser = asyncHandler(
    async (req,res) => {
        let {name , email , password , pic } = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message : 'Please provide all the fields'})
        }
        const userExits = await User.findOne({email})
        if(userExits){
            return res.status(400).json({message : 'User already exists'})
        }
        try {
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password , salt);
            const user = await User.create({
                name , email, password , pic
            });
            if(user){
                return res.status(200).json({token : generateToken() , user})
            }
        } catch (error) {
            return res.status(400).json({message : 'Internal server error'})
        }
    }
)

const generateToken = (id) => {
    return jwt.sign({id} ,process.env.JWT_SECRET,{
        expiresIn: "30d"
    });
}

const loginUser = asyncHandler(
    async (req,res) => {
        const { email , password} = req.body;
        if(!email || !password){
           return res.status(400).json({message : 'Please provide all the fields'})
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message : 'User already exists'})
        }
        const checkPassword = await bcrypt.compareSync(password , user.password)
        if(!checkPassword){
            return res.status(400).json({message : 'Password Invalid'})
        }
        res.status(200).json({ user ,token: generateToken(user._id)})
    }
)

const allUsers = asyncHandler(
    async (req,res) => {
        const keyWord = req.query.search ? {
            $or : [
                {name : {$regex: req.query.search , $options: "i"}},
                {email : {$regex: req.query.search , $options: "i"}},
            ]
        } : {};
        const users = await User.find(keyWord).find({_id:{$ne:req.user._id}});
        return res.status(200).json(users);
    }
)

module.exports = {registerUser  , loginUser , allUsers}