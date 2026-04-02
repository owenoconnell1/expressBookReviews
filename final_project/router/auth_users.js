const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    //write code to check is the username is valid
    return users.some(user => user.username === username);
}

const authenticatedUser = (username,password)=>{ //returns boolean
    //write code to check if username and password match the one we have in records.
    return users.some(user => user.username === username && user.password === password);
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  if(!authenticatedUser(req.body.username, req.body.password)){
    return res.status(401).json({message: "Credintials incorrect"})
  }
  const accessToken = jwt.sign({username: req.body.username}, "access", {expiresIn: "1h"});
  req.session.authorization = {username: req.body.username, accessToken};
  return res.status(200).json({message: "Login successful", token: accessToken})
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  if(!req.session.authorization?.username){
    return res.status(403).json({message: "user not authenticated"})
  }
  if(!books[req.params.isbn]){
    return res.status(404).json({message: "book not found"})
  }
  books[req.params.isbn].reviews[req.user.username] = req.query.review;
  return res.status(200).json({message: "review added"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
