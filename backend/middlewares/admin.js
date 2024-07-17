// chech whether the jwt is correct or not
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function adminMiddleware(req,res,next)
{
    try {
    const token = req.headers.authorization;
    
    const words = token.split(" ");
    const jwtToken = words[1];
    
    const decodedValue = jwt.verify(jwtToken,JWT_SECRET);
    
    if(decodedValue){
        next();
    }else{
        return res.status(403).json({
            message: "You are not authenticated"
        })
    }
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            message: "Please check headers"
        })
    }
}

module.exports = adminMiddleware;