// import '../models/connection.js';
// import UserSchemaModel from '../models/user.model.js';
// import CategorySchemaModel from '../models/category.model.js';
// import ProductSchemaModel from '../models/product.model.js';
// import url from 'url';
// import path from 'path';
// import rs from './randomstring.controller.js';

// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// export var save=async (req,res,next)=>{
//     var pDetails=req.body
//     var pList=await ProductSchemaModel.find().sort({"_id":-1}).limit(1);
//     var l=pList.length;
//     var _id=l==0?1:pList[0]._id+1;
//     var fileobj=req.files.picon;
//     var filename=Date.now()+"-"+rs+"-"+fileobj.name;
//     var uploadpath=path.join(__dirname,"../../UI/public/assets/uploads/producticons",filename);
//     fileobj.mv(uploadpath);
//    pDetails={...pDetails,"piconnm":filename,"_id":_id,"info":Date.now()};
//     var product = await ProductSchemaModel.create(pDetails);
//     if(product)
//       return res.status(201).json({"result":"Product added successfully...."});
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
//   var pList = await ProductSchemaModel.find(condition_object);
//   var l=pList.length;
//   if(l!=0)
//   {
//     return res.status(201).json(pList);
//   }
//   else
//     return res.status(201).json(pList);
// }




import '../models/connection.js';
import ProductSchemaModel from '../models/product.model.js';
import url from 'url';
import path from 'path';
import rs from './randomstring.controller.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

/**
 * Save a new product
 */
export const save = async (req, res) => {
  try {
    let pDetails = req.body;
    let pList = await ProductSchemaModel.find().sort({ _id: -1 }).limit(1);
    let _id = pList.length === 0 ? 1 : pList[0]._id + 1;

    // Ensure a file is uploaded
    if (!req.files || !req.files.picon) {
      return res.status(400).json({ error: "Product image is required" });
    }

    let fileobj = req.files.picon;
    let filename = `${Date.now()}-${rs()}-${fileobj.name}`;
    let uploadpath = path.join(__dirname, "../../UI/public/assets/uploads/producticons", filename);
    
    // Move file to uploads folder
    await fileobj.mv(uploadpath);

    // Prepare product details
    pDetails = { ...pDetails, piconnm: filename, _id, info: new Date() };
     await ProductSchemaModel.create(pDetails);

    return res.status(201).json({ result: "Product added successfully." });
  } catch (error) {
    console.error("Error in saving product:", error);
    return res.status(500).json({ error: "Server Error" });
  }
};

/**
 * Update an existing product
 */
export const updateProduct = async (req, res) => {
  try {
    let product = await ProductSchemaModel.findOne(JSON.parse(req.body.condition_object));

    if (!product) {
      return res.status(404).json({ error: "Requested product not found" });
    }

    await ProductSchemaModel.updateOne(
      JSON.parse(req.body.condition_object),
      { $set: JSON.parse(req.body.set_condition) }
    );

    return res.status(200).json({ msg: "Product updated successfully" });
  } catch (error) {
    console.error("Error in updating product:", error);
    return res.status(500).json({ error: "Server Error" });
  }
};

/**
 * Delete a product
 */
export const deleteProduct = async (req, res) => {
  try {
    let pDetails = await ProductSchemaModel.find(JSON.parse(req.body.condition_object));

    if (pDetails.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

     await ProductSchemaModel.deleteMany(JSON.parse(req.body.condition_object));

    return res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleting product:", error);
    return res.status(500).json({ error: "Server Error" });
  }
};

/**
 * Fetch products
 */
export const fetch = async (req, res) => {
  try {
    let condition_object = url.parse(req.url, true).query;
    let pList = await ProductSchemaModel.find(condition_object);

    return res.status(200).json(pList);
  } catch (error) {
    console.error("Error in fetching products:", error);
    return res.status(500).json({ error: "Server Error" });
  }
};
