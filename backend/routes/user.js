const { Router } = require('express');
const jwt = require("jsonwebtoken")
const { userSignupValidation, signinValidation } = require('../validation/types');
const { User, Product } = require('../db/db');
const userMiddleware = require('../middlewares/user');
const { JWT_SECRET } = require('../config');
const router = Router();


// - `User /signup`
//   Description :- Contain data about user .
//   Inputs :- username and password.
//   Output :- Grocery user account is been created
router.post("/signup",async function(req,res){
    try {
        const isPresent = await User.findOne({
            username:req.body.username
        })
        if(!isPresent){

            const createPayload = req.body;
            console.log(createPayload);
        const parsePayload = userSignupValidation.safeParse(createPayload);
    
        if(!parsePayload.success)
        {
            return res.status(400).json({
                message: "validation is wrong, inputs be like username -> email and password -> min 8 number and phoneNo -> 10 digits" 
            })
        }
    
        await User.create({
            username:req.body.username,
            password: req.body.password,
            phoneNo: req.body.phoneNo
        })
    
        res.json({
            message: "Grocery user account is been created"
        })

        }else{
            return res.status(404).json({
                message: "username is taken try another username"
            })
        }

    } catch (e) {
        return res.json({
            message: "something is wrong with signin handler"
        })
    }
})


// - `User /signin`
//   Description :- Save data about users
//   Inputs :- username and password
//   Output :- signin completed

router.get("/signin",async function(req,res){
    const signinPayload = req.body;
    const parsePayload = signinValidation.safeParse(signinPayload);

    if(!parsePayload.success)
        {
            return res.status(400).json({
                message: "validation is wrong, inputs be like username -> email and password -> min 8 number"
            })
        }

    const isSignup = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })

    if(!isSignup)
    {
        return res.status(411).json({
            message: "Unauthenticated access please check inputs"
        })
    }else{
        const username = req.body.username;
        const token = jwt.sign({username},JWT_SECRET);

        res.json({
            Token: token
        })
    }

})

// - `User /products`
//   Description :- Show all the products of the store.

router.get("/products",userMiddleware,async function(req,res){
    const products = await Product.find({});
    res.json({
        products
    })
})

// - `User /purchaseProduct`
//   Description :- Place your order.

router.post("/purchaseProduct/:productId",userMiddleware,async function(req,res){
    const productId = req.params.productId;
    const username = req.username;

    await User.updateOne({
        username
    },{
        $push: {purchaseProduct: productId}
    })

    res.json({
        message:"Purchase Completed"
    })
})

// show all the purchases of the user

router.get("/orders",userMiddleware,async function(req,res){

    const username = req.username;
    
    const buyedProduct = await User.findOne({
        username
    },{
        purchaseProduct
    })

    res.json({
        Products: buyedProduct
    })
})

module.exports = router