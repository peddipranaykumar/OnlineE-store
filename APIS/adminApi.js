//create router to handle admin api requests
const exp = require('express')
const expressAsyncHandler = require('express-async-handler')
const adminApp = exp.Router()

//import bcryptjs for password hashing
const bcryptjs = require('bcryptjs')

//import jsonwebtoken to create web token
const jwt = require('jsonwebtoken')

//to extract body of request obj(is a middleware)
adminApp.use(exp.json())


//Create route to admin login
adminApp.post('/login', expressAsyncHandler(async (request, response) => {
  //get adminCollectionObject
  let adminCollectionObject = request.app.get('adminCollectionObject')
  //get admin credentials obj 
  let adminCredObj = request.body
  //search for admin by adminname
  let adminOfDB = await adminCollectionObject.findOne({ adminname: adminCredObj.adminname })
  //if admin not existed
  if (adminOfDB == null) {
    response.send({ message: "Invalid admin" })
  }
  //if admin exist
  else {
    //compare passwords
    let status = await bcryptjs.compare(adminCredObj.password, adminOfDB.password)
    //if password not match
    if (status == false) {
      response.send({ message: "Invalid password" })
    }
    else {
      response.send({ message: 'success', payload: adminOfDB })
    }
  }
}))


//create a route to '/create-admin'
adminApp.post('/signup', expressAsyncHandler(async (request, response) => {
  //get adminCollectionObject
  let adminCollectionObject = request.app.get('adminCollectionObject')
  //get adminObj from client
  let newadminObj = request.body
  //search for admin by admin name
  let adminOfDB = await adminCollectionObject.findOne({ adminname: newadminObj.adminname })
  //if admin existed
  if (adminOfDB != null) {
    response.send({ message: 'adminname has already taken.. Please choose another adminname' })
  }
  //if admin not existed
  else {
    //hash password
    let hashedPassword = await bcryptjs.hash(newadminObj.password, 6)
    //replace plain password with hashes password in newadminObj
    newadminObj.password = hashedPassword
    //insert new admin
    await adminCollectionObject.insertOne(newadminObj)
    //send response
    response.send({ message: 'New admin created' })
  }
}))


//export adminApp
module.exports = adminApp