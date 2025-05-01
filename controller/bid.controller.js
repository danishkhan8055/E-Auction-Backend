import "../models/connection.js";
import BidSchemaModel from "../models/bid.model.js";
import url from "url";

export const save = async (req, rese) => {
  try {
    let bidDetails = req.body;
    let bidList = await BidSchemaModel.find().sort({ _id: -1 }).limit(1);
    let _id = bidList.length === 0 ? 1 : bidList[0]._id + 1;

    bidDetails = { ...bidDetails, _id, info: new Date() };

    let bid = await BidSchemaModel.create(bidDetails);
    return res.status(201).json({ result: "Product bid successfully added." });
  } catch (error) {
    console.error("Error in saving bid:", error);
    return res.status(500).json({ error: "Server Error" });
  }
};

export const updateBid = async (req, rese) => {
  try {
    let updatedBid = await BidSchemaModel.updateOne(
      JSON.parse(req.body.condition_object),
      { $set: JSON.parse(req.body.set_condition) }
    );

    if (updatedBid.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "Bid not found or already updated" });
    }

    return res.status(200).json({ msg: "Bid updated successfully." });
  } catch (error) {
    console.error("Error in updating bid:", error);
    return res.status(500).json({ error: "Server Error" });
  }
};

export const deleteBid = async (req, rese) => {
  try {
    let result = await BidSchemaModel.deleteMany(
      JSON.parse(req.body.condition_object)
    );

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Bid not found" });
    }

    return res.status(200).json({ msg: "Bid deleted successfully." });
  } catch (error) {
    console.error("Error in deleting bid:", error);
    return res.status(500).json({ error: "Server Error" });
  }
};

export const fetch = async (req, rese) => {
  try {
    let condition_object = url.parse(req.url, true).query;
    let bidList = await BidSchemaModel.find(condition_object);

    return res.status(200).json(bidList);
  } catch (error) {
    console.error("Error in fetching bids:", error);
    return res.status(500).json({ error: "Server Error" });
  }
};
