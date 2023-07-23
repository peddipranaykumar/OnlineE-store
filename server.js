//Create express app
const exp = require('express')
const app = exp()
const mclient = require('mongodb').MongoClient

require('dotenv').config()

//import path module
const path=require('path');

//connect build of react app with nodejs
app.use(exp.static(path.join(__dirname,'./build')))


//connect build of react app with nodejs
//app.use(exp.static(path.join(__dirname, './build')))

//DB connection url
const DBurl = "mongodb+srv://PranayKumar:PranayKumar@cluster0.0yxjahl.mongodb.net/?retryWrites=true&w=majority"


//connect with mongoDB server
mclient.connect(DBurl)
	.then((client) => {

		//get DB object
		let dbObj = client.db("ProjectDB")
		//create collection obj
		let userCollectionObject = dbObj.collection("user")
		let productCollectionObject = dbObj.collection("product")
		let cartCollectionObject = dbObj.collection("cart")
		let adminCollectionObject = dbObj.collection("admin")


		//sharing collection objects to APIs
		app.set('userCollectionObject', userCollectionObject)
		app.set('productCollectionObject', productCollectionObject)
		app.set('cartCollectionObject', cartCollectionObject)
		app.set('adminCollectionObject', adminCollectionObject)


		console.log('DB connection success')
	}).catch(err => console.log('error in DB connection', err))




//import userApp and productApp
const userApp = require('./APIS/userApi')
const productApp = require('./APIS/productApi')
const cartApp = require('./APIS/cartApi')
const adminApp=require('./APIS/adminApi')



//execute specific middleware based on path
app.use('/user', userApp)
app.use('/product', productApp)
app.use('/cart', cartApp)
app.use('/admin', adminApp)


//dealing with page refresh
app.use('*',(request,response)=>{
  response.sendFile(path.join(__dirname,'./build/index.html'))
})


//handle invalid path
app.use((request, response, next) => {
	response.send({ message: `path ${request.url} is invalid` })
})


//handle error
app.use((error, request, response, next) => {
	response.send({ message: "Error occurred", reason: `${error.message}` })
})


//assign port number
const port=process.env.PORT;
app.listen(port, () => console.log(`Web server listening on port ${port}`));