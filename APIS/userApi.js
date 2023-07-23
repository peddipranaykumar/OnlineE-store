//create router to handle user api requests
const exp = require('express')
const expressAsyncHandler = require('express-async-handler')
const userApp = exp.Router()

//import bcryptjs for password hashing
const bcryptjs = require('bcryptjs')

//import jsonwebtoken to create web token
const jwt = require('jsonwebtoken')

//to extract body of request obj(is a middleware)
userApp.use(exp.json())


//USER API routes 
//Create route to handle '/gestusers' path
userApp.get('/getusers', expressAsyncHandler(async (request, response) => {
    //get userCollectionObject
    let userCollectionObject = request.app.get('userCollectionObject')
    //get all users
    let users = await userCollectionObject.find().toArray()
    //send response
    response.send({ message: 'Users list', payload: users })
}))


//create route to user login
userApp.post("/login",expressAsyncHandler(async (request, response) => {
      //get userCollectionObject
      let userCollectionObject = request.app.get("userCollectionObject");
      //get user credentials obj from client
      let userCredObj = request.body;
      //seacrh for user by username
      let userOfDB = await userCollectionObject.findOne({
        username: userCredObj.username,
      });
      //if username not existed
      if (userOfDB == null) {
        response.send({ message: "Invalid user" });
      }
      //if username existed
      else {
        //compare passwords
        let status = await bcryptjs.compare(
          userCredObj.password,
          userOfDB.password
        );
        //if passwords not matched
        if (status == false) {
          response.send({ message: "Invalid password" });
        }
        //if passwords are matched
        else {
          //send token
          response.send({
            message: "success",
            payload: userOfDB
          });
        }
      }
    })
  );


//create a route to '/create-user'
userApp.post('/signup', expressAsyncHandler(async (request, response) => {
    //get userCollectionObject
    let userCollectionObject = request.app.get('userCollectionObject')
    //get userObj from client
    let newUserObj = request.body
    //search for user by user name
    let userOfDB = await userCollectionObject.findOne({ username: newUserObj.username })
    //if user existed
    if (userOfDB != null) {
        response.send({ message: 'Username has already taken.. Please choose another username' })
    }
    //if user not existed
    else {
        //hash password
        let hashedPassword = await bcryptjs.hash(newUserObj.password, 6)
        //replace plain password with hashes password in newUserObj
        newUserObj.password = hashedPassword
        //insert new user
        await userCollectionObject.insertOne(newUserObj)
        //send response
        response.send({ message: 'New user created' })
    }
}))


//create a route to '/update-user'
userApp.put('/update-user', expressAsyncHandler(async (request, response) => {
    //get userCollectionObject
    let userCollectionObject = request.app.get('userCollectionObject')
    //get userObj from client
    let newUserObj = request.body
    //search for user by user name
    let userObj = await userCollectionObject.findOne({ username: newUserObj.username })
    if (userObj == null) {
        response.send({ message: 'User not exist' })
    }
    else {
        let status = await userCollectionObject.update({ username: newUserObj.username }, { $set: { username: newUserObj.newUsername } })
        //response.send({ message: 'User updated' })

    }
}))


//create a route to '/remove-user'
userApp.delete('/remove-user', expressAsyncHandler(async (request, response) => {
    //get userCollectionObject
    let userCollectionObject = request.app.get('userCollectionObject')
    //get userObj from client
    let newUserObj = request.body
    //search for user by user name
    let userObj = await userCollectionObject.findOne({ username: newUserObj.username })
    if (userObj == null) {
        response.send({ message: 'User not exist' })
    }
    else {
        let status = await userCollectionObject.deleteOne({ username: newUserObj.username })
        response.send({ message: 'User deleted' })
    }
}))

//export userApp
module.exports = userApp