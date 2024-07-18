const { Router } = require('express');
const { userSignupValidation } = require('../validation/types');
const { User } = require('../db/db');
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

// - `User /showProducts`
//   Description :- Show all the products of the store.
// - `User /purchaseProduct`
//   Description :- Place your order.

module.exports = router