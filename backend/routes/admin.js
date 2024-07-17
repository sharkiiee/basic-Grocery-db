const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { adminSignupValidation, signinValidation } = require("../validation/types");
const { Admin, Product } = require("../db/db");
const { JWT_SECRET } = require("../config");
const adminMiddleware = require("../middlewares/admin");

const router = Router();

// //- `Admin /signup`
//     Description :- Contain data about Admins .
//   Inputs :- username and password.
//   Output :- Admin account is been created

router.post("/signup",async function(req,res){
    try {
        const createPayload = req.body;
    const parsePayload = adminSignupValidation.safeParse(createPayload);

    if(!parsePayload.success)
    {
        return res.status(400).json({
            message: "validation is wrong, inputs be like username -> email and password -> min 8 number"
        })
    }

    await Admin.create({
        username:req.body.username,
        password: req.body.password
    })

    res.json({
        message: "Admin account is been created"
    })

    } catch (e) {
        return res.json({
            message: "something is wrong with signin handler"
        })
    }
})
  
// - `Admin /signin`
//     Description :- Save data about Admin
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

    const isSignup = await Admin.findOne({
        username:req.body.username,
        password:req.body.password
    })

    if(!isSignup)
    {
        return res.status(411).json({
            message: "Unauthenticated access please check inputs"
        })
    }else{
        const username = req.body;
        const token = jwt.sign({username},JWT_SECRET);

        res.json({
            Token: token
        })
    }

})

// - `Admin /addProduct`
//   Description :- Add new product in the store

router.post("/addProduct", adminMiddleware,async function(req,res){
    try {
        const productName = req.body.productName;
        const price = req.body.price;

    await Product.create({
        productName,
        price
    })

    res.json({
        message: "New product is added"
    })

    } catch (error) {
        return res.json({
            message: "something is wrong with addProduct handler"
        })
    }
})

// - `Admin /products`
//    Description :- Show all the products of the store.

router.get("/products",adminMiddleware,async function(req,res){
    const products = await Product.find({});
    res.json({
        products
    })
})

module.exports = router;