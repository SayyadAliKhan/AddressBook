const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/user");
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const router = express.Router();

router.post('/login', (req, res) => {
  //assumtion : user name is unique

  if(!(req.body && req.body.username && req.body.password)){
    return res.status(400).send({
        msg: 'Authentication failed! Please check the request'
      });
  }

  User.findOne({username : req.body.username, password: req.body.password}, (err, user) => {
    if(err)
      return res.status(500).send({msg : err});

    if(user.password !== req.body.password){
      return res.status(401).send({msg : "Username/Password is incorrect"});
    }else{
      let token = jwt.sign({username: username},
          config.secret,
          { expiresIn: '24h'} // expires in 24hr
        );

      // return the JWT token for the future API calls
      return res.json({
        success: true,
        msg: 'Authentication successful!',
        token: token
      });
    }
  })
})

// router.post('/logout', (req, res) => {
//   User.findOne({})
// })

module.exports = router;
