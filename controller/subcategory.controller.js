// import '../models/connection.js';
// import UserSchemaModel from '../models/user.model.js';
// import CategorySchemaModel from '../models/category.model.js';
// import SubCategorySchemaModel from '../models/subcategory.model.js';
// import url from 'url';
// import path from 'path';
// import rs from './randomstring.controller.js';

// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// export var save=async (req,res,next)=>{
//     var subCategoryDetails=req.body
//     var scList=await SubCategorySchemaModel.find().sort({"_id":-1}).limit(1);
//     var l=scList.length;
//     var _id=l==0?1:scList[0]._id+1;
//     var fileobj=req.files.subcaticon;
//     var filename=Date.now()+"-"+rs+"-"+fileobj.name;
//     var uploadpath=path.join(__dirname,"../../UI/public/assets/uploads/subcaticons",filename);
//     fileobj.mv(uploadpath);
//     subCategoryDetails={...subCategoryDetails,"subcaticonnm":filename,"_id":_id};
//     var subcategory = await SubCategorySchemaModel.create(subCategoryDetails);
//     if(subcategory)
//       return res.status(201).json({"result":"Category added successfully...."});
//     else
//       return res.status(500).json({"result": "Server Error"});    
// }


// export var updateCategory=async(request,response,next)=>{
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

// export var deleteCategory=async(request,response,next)=>{
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

// export var fetch=async (req,res,next)=>{
//   var condition_object=url.parse(req.url,true).query;
//   var scList = await SubCategorySchemaModel.find(condition_object);
//   var l=scList.length;
//   if(l!=0)
//   {
//     return res.status(201).json(scList);
//   }
//   else
//     return res.status(201).json(scList);
// }import '../models/connection.js';
import SubCategorySchemaModel from '../models/subcategory.model.js';
import url from 'url';
import path from 'path';
import rs from './randomstring.controller.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export var save = async (req, res) => {
  try {
    let subCategoryDetails = req.body;

    // Find the latest _id and auto-increment
    let lastSubCategory = await SubCategorySchemaModel.findOne().sort({ _id: -1 });
    let _id = lastSubCategory ? lastSubCategory._id + 1 : 1;

    if (!req.files || !req.files.subcaticon) {
      return res.status(400).json({ error: "Subcategory icon is required" });
    }

    let fileobj = req.files.subcaticon;
    let filename = `${Date.now()}-${rs.generate(5)}-${fileobj.name}`;
    let uploadPath = path.join(__dirname, "../../UI/public/assets/uploads/subcaticons", filename);

    // Move file to the designated path
    await fileobj.mv(uploadPath);

    // Save subcategory details
    subCategoryDetails = { ...subCategoryDetails, subcaticonnm: filename, _id };
     await SubCategorySchemaModel.create(subCategoryDetails);

    return res.status(201).json({ result: "Subcategory added successfully" });
  } catch (error) {
    console.error("Error saving subcategory:", error);
    return res.status(500).json({ error: "Server Error", details: error.message });
  }
};

export var updateSubCategory = async (req, res) => {
  try {
    let conditionObj = JSON.parse(req.body.condition_object);
    let setCondition = JSON.parse(req.body.set_condition);

    let subCategory = await SubCategorySchemaModel.findOne(conditionObj);
    if (!subCategory) {
      return res.status(404).json({ error: "Requested resource not available" });
    }

    await SubCategorySchemaModel.updateOne(conditionObj, { $set: setCondition });
    return res.status(200).json({ msg: "Subcategory updated successfully" });
  } catch (error) {
    console.error("Error updating subcategory:", error);
    return res.status(500).json({ error: "Server Error", details: error.message });
  }
};

export var deleteSubCategory = async (req, res) => {
  try {
    let conditionObj = JSON.parse(req.body.condition_object);
    let subCategory = await SubCategorySchemaModel.findOne(conditionObj);

    if (!subCategory) {
      return res.status(404).json({ error: "Resource not found" });
    }

    await SubCategorySchemaModel.deleteMany(conditionObj);
    return res.status(200).json({ msg: "Subcategory deleted successfully" });
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    return res.status(500).json({ error: "Server Error", details: error.message });
  }
};

export var fetch = async (req, res) => {
  try {
    let conditionObject = url.parse(req.url, true).query;
    let subCategories = await SubCategorySchemaModel.find(conditionObject);

    return res.status(200).json(subCategories);
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return res.status(500).json({ error: "Server Error", details: error.message });
  }
};
