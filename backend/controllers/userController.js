import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import { getTokenFromHeader } from '../utils/getTokenFromHeader.js';
import { verifyToken } from '../utils/verifyToken.js';

const pepper = process.env.PEPPER;


// @desc Login user
// @route POST /api/v1/users/register
// @access Public
export const registerUserCtrl = asyncHandler(async (req, res) => {
    const { fullname, email, password, isAdmin } = req.body;

    if(!fullname || !email || !password){
        return res.status(500).json({
            success: false,
            message: 'User not registered!',
        });
    } 
    
    try {
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists!',
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password + pepper, salt);

        const newUser = new User({ fullname, email, password: hashedPassword, isAdmin});
        await newUser.save();

        return res.status(201).json({
            success: true,
            message: 'User successfully registered!',
            user: {
                id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                isAdmin: newUser.isAdmin
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error(`Internal server error. Please try again later.`);
    }
})

// @desc Login user
// @route POST /api/v1/users/login
// @access PUBLIC
export const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: 'User not loggedIn!'
        });
    }

    try {
        const existingEmail = await User.findOne({ email });
        const comparedPassword = await bcrypt.compare(password + pepper, existingEmail.password);
        
        if(!existingEmail){
            return res.status(400).json({
                success: false,
                message: 'User does not exist!'
            });
        }

        if(!comparedPassword){
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        const token = generateToken(existingEmail?.id);

        res.cookie('authToken', token, { 
            httpOnly: true, 
            secure: false, 
            sameSite: 'Lax', 
            maxAge: 3600000
        });
        
        res.status(200).json({
            success: true,
            message: 'User successfully logged in!',
            user: {
                id: existingEmail._id,
                fullname: existingEmail.fullname,
                email: existingEmail.email,
                itemForSale: existingEmail.itemsForSale,
                isAdmin: existingEmail.isAdmin
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error(`Internal server error. Please try again later.`);
    }
});


// @desc Logout user
// @route POST /api/v1/users/logout
// @access PRIVATE
export const logoutUserCtrl = asyncHandler(async (req, res) => {

    res.clearCookie('authToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 0
    });

    return res.status(200).json({
        success: true,
        message: 'Logged out successfully!'
    })
})


// @desc Get user profile
// @route GET /api/v1/users/profile
// @access PRIVATE
export const getUserProfileCtrl = asyncHandler(async (req, res) => {
    const userId = req.userAuthId;

    if (!userId) {
        return res.status(401).json({ message: "Expired or missing token" });
    }
    const user = await User.findById(userId);

    try {
        const user = await User.findById(userId);

        // If no user is found, return 404 Not Found
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send user profile data
        res.status(200).json({
            message: "Success",
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                products: user.products,
                conversation: user.conversation,
                isAdmin: user.isAdmin,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error("Profile Fetch Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// @desc Get all users
// @route GET /api/v1/users
// @access ADMIN
export const getAllUsersCtrl = asyncHandler(async (req, res) => {
    const users = await User.find();

    return res.json({
        success: true,
        users
    })
})

// @ Get User By Id
// @route GET /api/v1/users/:id
// @access ADMIN
export const getUserByIdCtrl = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    if(!userId){
        return res.json({
            success: false,
            message: "User ID is missing"
        })
    }

    const user = await User.findById(userId);

    if(!user) {
        return res.json({
            success: false,
            message: "User not found"
        })
    }

    return res.json({
        success: true,
        message: "User fetched successfully",
        user
    })
})

// @ Delete User
// @route DELETE /api/v1/users/:id
// @access ADMIN
export const deleteUserCtrl = asyncHandler(async(req, res) => {
    const userId = req.params.id;

    if(!userId){
        return res.json({
            success: false,
            message: "User ID is missing"
        })
    }

    await User.deleteOne({ _id: userId});

    return res.json({
        success: true,
        message: "User deleted successfully"
    })
})