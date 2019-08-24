const express = require("express");
const mongoose = require("mongoose");
const Profile = require("../model/profile");
const router = express.Router();

router.get('/todos', (req, res) => {
  Profile.find()
  .then((todos) => {
    return res.json(todos);
  })
  .catch(err => res.status(500).send(err));
})

router.post('/todos', (req, res) => {
  Profile.create({
    content : req.body.content,
    completed : req.body.isCompleted
  })
  .then((todo) => {
    Profile.find()
    .then((todos) => {
      return res.json(todos);
    })
    .catch(err => res.status(500).send(err));
  })
})

router.delete('/todos/:todo_id', (req, res) => {
  Profile.remove({
    _id : req.params.todo_id
  })
  .then((todo) => {
    return res.status(200).send();
  }).catch(err => res.status(500).send(err));
})

router.post('/todos/delete', (req, res) => {
  Profile.deleteMany({
    _id : req.body.todos
  })
  .then((todo) => {
    return res.status(200).send();
  }).catch(err => res.status(500).send(err));
})

router.put('/todos/:todo_id', (req, res) => {
  Profile.findOneAndUpdate({_id: req.params.todo_id},{$set:{}},{new:true})
  .then((todo)=>{
    if(todo) {
       return res.status(200).send()
    } else {
       return res.status(500).send({"msg" : "no record found"})
    }
  })
  .catch((err) => {
    return res.status(500).send(err);
  })
})

module.exports = router;
