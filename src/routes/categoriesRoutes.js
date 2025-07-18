const express = require("express")
const categoriesModel = require("../models/categoriesModel")
const authMiddleware = require("../middlewares/authMiddleware")
const categories = express.Router()

categories.get("/",authMiddleware, async (req, res)=>{
    const {id} = req.tokenData
    try {
        const foundCategories = await categoriesModel.find({id})
        res.status(200).json(foundCategories)
    }
    catch(e){
        console.log(e)
        res.status(500).json({message: "Error at server-side."})
    }
})

categories.post("/", authMiddleware,async (req, res)=>{
    let newCategory = req.body
    const {id} = req.tokenData
    newCategory.userId = id

    try{
        await categoriesModel.insertOne(newCategory)
        res.status(201).json({message: "Category Created!"})
    }
    catch(e){
        console.log(e)
        res.status(500).json({message: "Error at server-side."})
    }
})

categories.delete("/:categoryId", async (req, res)=>{
    const {categoryId} = req.params
    try{
        await categoriesModel.deleteOne({_id: categoryId})
        res.status(200).json({message: "Category Deleted!"})
    }
    catch(e){
        console.log(e)
        res.status(500).json({message: "Error at server-side."})
    }
})

module.exports = categories