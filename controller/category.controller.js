// import '../models/connection.js';
// import UserSchemaModel from '../models/user.model.js';
// import CategorySchemaModel from '../models/category.model.js';
// import url from 'url';
// import path from 'path';
// import rs from './randomstring.controller.js';

// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// export var save=async (req,res)=>{
//     var categoryDetails=req.body
//     var cList=await CategorySchemaModel.find().sort({"_id":-1}).limit(1);
//     var l=cList.length;
//     var _id=l==0?1:cList[0]._id+1;
//     var fileobj=req.files.caticon;
//     var filename=Date.now()+"-"+rs+"-"+fileobj.name;
//     var uploadpath=path.join(__dirname,"../../UI/public/assets/uploads/caticons",filename);
//     fileobj.mv(uploadpath);
//    categoryDetails={...categoryDetails,"caticonnm":filename,"_id":_id};
//     var category = await CategorySchemaModel.create(categoryDetails);
//     if(category)
//       return res.status(201).json({"result":"Category added successfully...."});
//     else
//       return res.status(500).json({"result": "Server Error"});    
// }


// export var updateCategory=async(request,response)=>{
//   let userDetails = await CategorySchemaModel.findOne(JSON.parse(request.body.condition_object));
//   if(userDetails){
//      let category=await CategorySchemaModel.updateOne(JSON.parse(request.body.condition_object),{$set:JSON.parse(request.body.set_condition)});   
//      if(category)
//       return response.status(201).json({"msg":"success"});
//      else
//       return response.status(500).json({error: "Server Error"});
//   }
//   else
//    return response.status(404).json({error: "Requested resource not available"});
// }

// export var deleteCategory=async(request,response)=>{
//   var cDetails = await CategorySchemaModel.find(JSON.parse(request.body.condition_object));
//   if(cDetails.length!=0){
//     let result = await CategorySchemaModel.deleteMany(JSON.parse(request.body.condition_object)); 
//     if(result)
//      return response.status(201).json({"msg":"success"});
//     else
//      return response.status(500).json({error: "Server Error"});
//   }
//   else
//     return response.status(404).json({error: "Resource not found"}); 
// }

// export var fetch=async (req,res)=>{
//   var condition_object=url.parse(req.url,true).query;
//   var cList = await CategorySchemaModel.find(condition_object);
//   var l=cList.length;
//   if(l!=0)
//   {
//     console.log(cList);
//     return res.status(201).json(cList);
//   }
//   else
//     return res.status(201).json(cList);
// }




import '../models/connection.js';
import CategorySchemaModel from '../models/category.model.js';
import url from 'url';
import path from 'path';
import rs from './randomstring.controller.js';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export var save = async (req, res) => {
  try {
    var categoryDetails = req.body;

    // ✅ Get the last inserted category and auto-increment _id
    var lastCategory = await CategorySchemaModel.findOne().sort({ _id: -1 });
    var _id = lastCategory ? lastCategory._id + 1 : 1;

    // ✅ Check if file exists before processing
    if (!req.files || !req.files.caticon) {
      return res.status(400).json({ error: 'Category icon is required' });
    }

    var fileobj = req.files.caticon;
    var filename = `${Date.now()}-${rs()}-${fileobj.name}`;
    var uploadPath = path.join(__dirname, "../../UI/public/assets/uploads/caticons", filename);

    // ✅ Move the file asynchronously
    await fileobj.mv(uploadPath);

    categoryDetails = { ...categoryDetails, caticonnm: filename, _id };

    // ✅ Save the category
     await CategorySchemaModel.create(categoryDetails);
    return res.status(201).json({ result: "Category added successfully" });
  } catch (error) {
    console.error("Error in save category:", error);
    return res.status(500).json({ result: "Server Error", error });
  }
};

export var updateCategory = async (req, res) => {
  try {
    let condition = JSON.parse(req.body.condition_object);
    let updateData = JSON.parse(req.body.set_condition);

    let category = await CategorySchemaModel.findOne(condition);
    if (!category) return res.status(404).json({ error: "Category not found" });

    let updatedCategory = await CategorySchemaModel.updateOne(condition, { $set: updateData });
    return res.status(200).json({ msg: "Category updated successfully", updatedCategory });
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({ error: "Server Error", error });
  }
};

export var deleteCategory = async (req, res) => {
  try {
    let condition = JSON.parse(req.body.condition_object);
    let category = await CategorySchemaModel.find(condition);

    if (category.length === 0) return res.status(404).json({ error: "Category not found" });

    let result = await CategorySchemaModel.deleteMany(condition);
    return res.status(200).json({ msg: "Category deleted successfully", result });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({ error: "Server Error", error });
  }
};

export var fetch = async (req, res) => {
  try {
    let condition = url.parse(req.url, true).query;
    let categories = await CategorySchemaModel.find(condition);
    
    return res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ error: "Server Error", error });
  }
};
