//create router to handle user api requests
const exp = require('express')
const productApp = exp.Router()

const expressAsyncHandler = require('express-async-handler')
const { v4: uuidv4 } = require('uuid');
const unique=uuidv4().slice(0,8);




//to extract body of request obj(is a middleware)
productApp.use(exp.json())

//PRODUCT API routes
//get all products 
productApp.get('/getproducts', expressAsyncHandler(async (request, response) => {
    //get productcollectionObject
    let productCollectionObject = request.app.get("productCollectionObject")
    //read all products
    let products = await productCollectionObject.find().toArray()
    //send response
    response.send({ message: 'All products', payload: products })
}))



//get product by id
productApp.get('/getproduct/:id', expressAsyncHandler(async(request, response) => {
    //get product collection obj
    let productCollectionObject = request.app.get("productCollectionObject")
    //get product id from url params
    let pid=(request.params.id)
    //get product by id 
    let product=await productCollectionObject.findOne({pid:pid})

    if(product==null){
        response.send({message:'product not existed'})
    }
    else{
        response.send({message:'product existed',payload:product})
    }
}))


//get product by device
productApp.get('/getproducts/:device', expressAsyncHandler(async (request, response) => {
    //get product collection obj
    let productCollectionObject = request.app.get("productCollectionObject")
    //get product id from url params

    let pdevice = (request.params.device)

    //get product by id 
    let product = await productCollectionObject.find({ device: { $eq: pdevice } }).toArray()
    if (product == null) {
        response.send({ message: 'product not existed' })
    }
    else {
        response.send({ message: 'product existed', payload: product })
    }
}))


//get product by id
productApp.get('/getproducts/:device/:brand', expressAsyncHandler(async (request, response) => {
    //get product collection obj
    let productCollectionObject = request.app.get("productCollectionObject")
    //get product id from url params

    let pdevice = (request.params.device)

    let pbrand = (request.params.brand)
    //get product by id 
    let product = await productCollectionObject.find({ $and: [{ device: { $eq: pdevice } }, { brand: { $eq: pbrand } }] }).toArray()
    if (product == null) {
        response.send({ message: 'product not existed' })
    }
    else {
        response.send({ message: 'product existed', payload: product })
    }
}))


//to create product
productApp.post('/create-product', expressAsyncHandler(async (request, response) => {
    //get productcollectionObject
    let productCollectionObject = request.app.get("productCollectionObject")
    let newproductObj = request.body

    newproductObj.pid=unique;
    console.log(newproductObj);

    //insert new product
    await productCollectionObject.insertOne(newproductObj)
    //send response
    response.send({ message: 'Product added' })
}))


//update product
productApp.put('/update-product', expressAsyncHandler(async (request, response) => {
    //get product collection obj
    let productCollectionObject = request.app.get("productCollectionObject")
    //get modified product obj
    let modifiedProduct = request.body
    //update
    await productCollectionObject.updateOne({ productName: modifiedProduct.productName }, { $set: { ...modifiedProduct } })
    //send response
    response.send({ message: 'product modied' })
}))



//delete product by id
productApp.delete('/remove-product/:id', expressAsyncHandler(async (request, response) => {
    //get product collection obj
    let productCollectionObject = request.app.get("productCollectionObject")

    //get product id from url params
    let prodpid = (request.params.id)
    console.log(prodpid)
    //get product by id 
    let product = await productCollectionObject.findOne({ pid: prodpid })

    if (product == null) {
        response.send({ message: 'product not existed' })
    }
    else {
        let product = await productCollectionObject.deleteOne({ pid: prodpid })
        response.send({ message: 'product deleted' })
    }
}))


//export producyApp
module.exports = productApp