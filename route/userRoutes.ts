const express = require('express')
const User = require('../model/User')
const router = express.Router();

router.post("/login", async function (req :any ,res : any){
  try {
      const result = await User.findOne({
        email : req.body.email,
        password : req.body.password
      });
      if (result) {
        res.send(result) 
      }else{
        res.status(400).json("Error");
      }
  }catch(error){
    res.status(400).json('Error')
  }
})


router.post("/register", async function (req : any ,res : any){
  try {
      const newuser = new User ( req.body)
      await newuser.save();
      res.send('User Register Success')
  }catch(error){
    res.status(400).json('Error')
  }
})

module.exports = router