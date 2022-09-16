const express = require('express')
const User = require('../model/User')
const bcrypt = require('bcryptjs')
import jwt from 'jsonwebtoken'
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/login",  async function (req ,res ){
  try {
      const result = await User.findOne({
        email : req.body.email,
        password : req.body.password,
        token : req.body.token

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

router.post("/register", async (req, res) => {

  // Our register logic starts here
  try {
    // Get user input
    const { name, email, password } = req.body;

    // Validate user input
    if (!(email && password && name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist

    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
      const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

module.exports = router