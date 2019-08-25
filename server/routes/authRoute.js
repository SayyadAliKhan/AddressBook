const express = require("express");
const mongoose = require("mongoose");
var User = require("../model/user");
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const router = express.Router();

router.post('/add', (req, res) => {
  if(req.body && req.body.username && req.body.password){
    new User({
      username : req.body.username,
      password : req.body.password
    }).save().then((user) => {
      if(user)
        res.send(user);
    }).catch(err => res.status(500).send(err))
  }
});

router.post('/login', (req, res) => {
  //assumtion : user name is unique
  console.log("req.body", req.body);
  var user_name = req.body.username;
  var password = req.body.password;
  if(!(req.body && user_name && password)){
    return res.status(400).send({
        msg: 'Authentication failed! Please check the request'
      });
  }

  User.findOne({username : user_name, password: password}, (err, user) => {
    if(err)
      return res.status(500).send({msg : "Something went wrong : " + err});


    if(!user || user.password !== password){
      return res.status(401).send({msg : "Username/Password is incorrect"});
    }else{
      let token = jwt.sign({username: user_name},
          config.secret,
          { expiresIn: '24h'} // expires in 24hr
        );

      // return the JWT token for the future API calls
      return res.json({
        success: true,
        msg: 'Authentication successful!',
        data: user,
        token: token
      });
    }
  })
})

module.exports = router;
