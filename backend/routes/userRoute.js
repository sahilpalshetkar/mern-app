const express = require("express");
const mongoose = require("mongoose");
const user = require("/Users/sahil/Mern-app/backend/models/userModel");
const router = express.Router();

// create
router.post("/",async(req,res)=> {
    const {name,email,age} = req.body;

try {
    const userAdded = await user.create({
        name : name,
        email : email,
        age : age,
    });

    res.status(201).json(userAdded);
} catch (error) {
    console.log(error);
    res.send(400).json({error:error.message})
  
}
});

//get
router.get("/", async(req,res)=> {
   

    try {
         const showAll = await user.find();
         res.status(200).json(showAll);
    } catch (error) {
         console.log(error);
    res.send(500).json({error:error.message})
    }
});

//get single user
router.get("/:id", async(req,res)=> {
   
    const {id} = req.params;
    try {
         const singleUser = await user.findById({_id : id});
         res.status(200).json(singleUser);
    } catch (error) {
         console.log(error);
    res.send(500).json({error:error.message})
    }
});

//Delete
router.delete("/:id", async(req,res)=> {
   
    const {id} = req.params;
    try {
         const deleteUser = await user.findByIdAndDelete({_id : id});
         res.status(200).json(deleteUser);
    } catch (error) {
         console.log(error);
    res.send(500).json({error:error.message})
    }
});

//put/patch
router.patch("/:id", async(req,res)=> {
   
    const {id} = req.params;
    const {name, email, age} = req.body;

    try {
         const updateUser = await user.findByIdAndUpdate(id, req.body, {
            new : true,
         });
         res.status(200).json(updateUser);
    } catch (error) {
         console.log(error);
    res.send(500).json({error:error.message})
    }
});

module.exports = router;