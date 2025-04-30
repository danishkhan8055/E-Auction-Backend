// import url from 'url';
// import '../models/connection.js';
// import UserSchemaModel from '../models/user.model.js';
// import jwt from 'jsonwebtoken';
// import rs from 'randomstring';
// import sendEmail from './mail.controller.js';

// export var save=async (req,res,next)=>{
//     var userDetails=req.body;
//     var userList=await UserSchemaModel.find().sort({"_id":-1}).limit(1);
//     var l=userList.length;
//     var _id=l==0?1:userList[0]._id+1;
//     userDetails={...userDetails,"_id":_id,"status":0,"role":"user","info":Date()};
//     //console.log(userDetails);
//     var user=await UserSchemaModel.create(userDetails);
//     if(user)
//     {
//       //send email via api
//       sendEmail(userDetails.email,userDetails.password);
//       return res.status(201).json({"result":"User register successfully...."});
//     }
//     else
//       return res.status(500).json({"result": "Server Error"});
// }

// export var fetch=async (req,res,next)=>{
//   var condition_object=url.parse(req.url,true).query;
//   var userList = await UserSchemaModel.find(condition_object);
//   var l=userList.length;
//   if(l!=0)
//     return res.status(201).json(userList);
//   else
//     return res.status(201).json(userList);
// }

// export var deleteUser=async(request,response,next)=>{
//   var user = await UserSchemaModel.find(request.body);
//   if(user.length!=0){
//     let result = await UserSchemaModel.deleteMany(request.body);
//     if(result)
//      return response.status(201).json({"msg":"success"});
//     else
//      return response.status(500).json({error: "Server Error"});
//   }
//   else
//     return response.status(404).json({error: "Resource not found"});
// }

// export var updateUser=async(request,response,next)=>{
//   let userDetails = await UserSchemaModel.findOne(request.body.condition_obj);
//   if(userDetails){
//      let user=await UserSchemaModel.updateOne(request.body.condition_obj,{$set:request.body.set_condition});
//      if(user)
//       return response.status(201).json({"msg":"success"});
//      else
//       return response.status(500).json({error: "Server Error"});
//   }
//   else
//    return response.status(404).json({error: "Requested resource not available"});
// }

// export var login=async (req,res,next)=>{
//   var userDetails=req.body;
//   userDetails={...userDetails,"status":1};
//   var userList = await UserSchemaModel.find(userDetails);
//   var l=userList.length;
//   if(l!=0)
//   {
//     let payload={"subject":userList[0].email};
//     let key=rs.generate();
//     let token=jwt.sign(payload,key);
//     return res.status(201).json({"token":token,"userDetails":userList[0]});
//   }
//   else
//   {
//    return res.status(201).json({"token": "error"});
//   }
// }

import url from "url";
import "../models/connection.js";
import UserSchemaModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import sendEmail from "./mail.controller.js";

dotenv.config(); // Load environment variables

// ✅ Register User
export const save = async (req, res) => {
  try {
    let userDetails = req.body;
    console.log(userDetails);

    // ✅ Check if user already exists
    const existingUser = await UserSchemaModel.findOne({
      email: userDetails.email,
    });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // ✅ Generate Unique ID
    const lastUser = await UserSchemaModel.findOne().sort({ _id: -1 });
    const _id = lastUser ? lastUser._id + 1 : 1;

    // ✅ Hash Password Before Storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userDetails.password, salt);

    // ✅ Save User
    userDetails = {
      ...userDetails,
      _id,
      password: hashedPassword,
      status: false,
      role: "user",
      info: new Date(),
    };
    const user = await UserSchemaModel.create(userDetails);

    if (user) {
      // ✅ Send Email (if required)
      sendEmail(userDetails.email, req.body.password);
      return res.status(201).json({ message: "User registered successfully" });
    } else {
      return res.status(500).json({ error: "Server error" });
    }
  } catch (error) {
    console.error("Error in user registration:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Fetch Users
export const fetch = async (req, res) => {
  try {
    const conditionObject = url.parse(req.url, true).query;
    const userList = await UserSchemaModel.find(conditionObject);
    return res.status(200).json(userList);
  } catch (error) {
    console.error("Error in fetching users:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Delete User
export const deleteUser = async (req, res) => {
  try {
    const user = await UserSchemaModel.find(req.body);
    if (!user.length) {
      return res.status(404).json({ error: "User not found" });
    }

    await UserSchemaModel.deleteMany(req.body);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in deleting user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Update User
export const updateUser = async (req, res) => {
  try {
    const { condition_obj, set_condition } = req.body;
    const user = await UserSchemaModel.findOne(condition_obj);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await UserSchemaModel.updateOne(condition_obj, { $set: set_condition });
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error in updating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserSchemaModel.findOne({ email, status: 1 });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid email or account not activated" });
    }

    // ✅ Compare Passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // ✅ Generate Secure JWT Token
    const payload = { subject: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token, userDetails: user });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
