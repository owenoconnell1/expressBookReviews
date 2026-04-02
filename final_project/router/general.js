const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: "username and password required"});
  }
  if(isValid(req.body.username)){
    return res.status(400).json({message: "username exists"});
  }
  let username = req.body.username;
  let password = req.body.password;
  users.push({username, password});
  return res.status(201).json({message: "SUCCESS SUCCESS SUCCESS USER HAS BEEN CREATED!!!!!!!!"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
    return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    //Write your code here
    if(books[req.params.isbn]){
        return res.status(200).json(books[req.params.isbn]);
    }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    //Write your code here
    return res.status(200).json(Object.values(books).filter(book => book.author.toLowerCase() === req.params.author.toLowerCase()));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(200).json(Object.values(books).filter(book => book.title.toLowerCase() === req.params.title.toLowerCase()));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    //Write your code here
    if(books[req.params.isbn]){
        return res.status(200).json(books[req.params.isbn]);
    }
    return res.status(404).json({message: "Not found"});
});

module.exports.general = public_users;
