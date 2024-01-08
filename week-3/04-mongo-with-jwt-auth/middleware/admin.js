const jwt = require('jsonwebtoken');
const JWT_SECRET = "erwfwswo";
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    
    const token = req.headers.authorization;
    const words = token.split(" "); // split Bearer & token 
    const jwtToken = words[0]; // token 
    try{
        const decode = jwt.verify(jwttoken, JWT_SECRET);
    
        if(decode.username){
            next();
        }else
        res.status(411).send("user not found");
     }catch{
        res.status(404).send("Invalid Request");
     }
}

module.exports = adminMiddleware;