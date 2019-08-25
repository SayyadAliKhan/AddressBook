const express = require("express");
const mongoose = require("mongoose");
var Profile = require("../model/profile");
const jwt = require("../services/verifyToken");
const router = express.Router();

router.post('/profiles', jwt.checkToken, (req, res) => {
  Profile.find({user_id : req.body.user_id})
  .then((todos) => {
    console.log("todos", todos.length);
    return res.json(todos);
  })
  .catch(err => res.status(500).send({msg: "Error while fetching addresses : " + err}));
})

router.post('/profile', jwt.checkToken, (req, res) => {
  Profile.create({
    "address_book_title" : req.body.address_book_title,
    "contact_name" : req.body.contact_name,
    "contact_no" : req.body.contact_no,
    "address_line_1" : req.body.address_line_1,
    "address_line_2" : req.body.address_line_2,
    "address_line_3" : req.body.address_line_3,
    "pincode" : req.body.pincode,
    "city" : req.body.city,
    "state" : req.body.state,
    "country" : req.body.country,
    "user_id" : req.body.user_id
  })
  .then((todo) => {
    console.log("todo", todo);
    return res.send(todo);
  })
  .catch(err => res.status(500).send({msg: "Error while saving : " + err}));
})

router.delete('/profiles/:profile_id', jwt.checkToken, (req, res) => {
  Profile.deleteOne({
    _id : req.params.profile_id
  })
  .then((todo) => {
    return res.send();
  }).catch(err => res.status(500).send(err));
})

router.put('/profiles/:profile_id', (req, res) => {
  console.log("Params", req.params.profile_id);
  console.log("body", req.body);
  Profile.findOneAndUpdate({_id: req.params.profile_id}, req.body,{new:true})
  .then((todo)=>{
    if(todo) {
       return res.status(200).send();
    } else {
       return res.status(500).send({"msg" : "no record found"});
    }
  })
  .catch((err) => {
    return res.status(500).send({msg: "Error while updating : " + err});
  })
})

module.exports = router;
