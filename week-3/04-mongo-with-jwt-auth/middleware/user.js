const jwt = require("jsonwebtoken");
const JWT_SECRET = "erwfwswo";
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const strings = token.split(" ");
    const jwttoken = strings[1];
 try{
    const decode = jwt.verify(jwttoken, JWT_SECRET);

    if(decode.username){
        next();
    }else
    res.status(403).send("user not found");
 }catch(e){
    res.status(404).send("Invalid Request");
 }
}

module.exports = userMiddleware;