const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require("../db/index.js");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "erwfwswo";

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username =  req.body.username;
    const password = req.body.password;
    await Admin.create({
        username: username,
        password: password
    });
    res.status(200).send("User created successfully");
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const userExist = await Admin.find({
        username : req.body.username,
        password: req.body.password
    })

    if(userExist){
    const token = jwt.sign(req.body.username, JWT_SECRET);
    
    return res.json({ msg : "User Login successfully",token : token});
    }
    res.status(411).send("Invalid request");
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    const token = req.headers.authorization;
    const splitToken = token.split(" ");
    const jwtToken = splitToken[1];

    const decode = jwt.verify(jwtToken, JWT_SECRET);
    if(decode.username){
        const allcourses = Course.find({});
        res.status(200).json({
            courses : allcourses
        });
    }else{
        res.status(410).send("Error while fetching courses");
    }
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const token = req.headers.authorization;
    const splitToken = token.split(" ");
    const jwtToken = splitToken[1];

    const decode = jwt.verify(jwtToken, JWT_SECRET);
    const username = decode.username;
    if(username){
        const purchase = await User.updateOne({username : username}, {
            $push : { purchasedCourses : courseId}})
            if(purchase){
                res.status(200).json({ message: 'Course purchased successfully' });
        }}else{
            res.send("Unable to purchase");
    }
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const token = req.headers.authorization;
    const splitToken = token.split(" ");
    const jwtToken = splitToken[1];

    const decode = jwt.verify(jwtToken, JWT_SECRET);
    const username = decode.username;
    if(username){
        const user = await User.find({
            username : username,
        });
        if(user){
        const cources = await Course.find({_id: {
            $in : user.purchasedCourses}
        });   // return that objects that have the similar value of id which is present in the puchasedCourses array in users table.
        if(courses.length > 0){
        res.status(200).json(courses);
        }
        else{
            res.send("You have no course purchased");
        }
    }
    }else{
        res.status(404).send("user not found");
    }
});

module.exports = router