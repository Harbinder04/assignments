const { Router } = require("express");
const {Admin, Course} = require("../db/index.js")
const adminMiddleware = require("../middleware/admin");
const jwt = require("jsonwebtoken")
const JWT_SECRET = "erwfwswo";
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username =  req.body.username;
    const password = req.body.password;
    await Admin.create({
        username: username,
        password: password
    });
    res.status(200).send("Admin created successfully");
});

router.use(express.json());

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

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const token = req.headers.authorization;
    const splitToken = token.split(" ");
    const jwtToken = splitToken[1];
    const title = req.body.title;
    const description = req.body.description;
    const price =  req.body.price;
    const imageLink = req.body.imageLink;

    const decode = jwt.verify(jwtToken, JWT_SECRET);
    if(decode.username){
       const course = await Course.create({
        title:  title, description: description, price: price, imageLink: imageLink
       });
       res.status(200).json({
        msg: "Course created successfully",
        course_id : course._id
    });
    }else{
        res.status(411).send("Invalid input"); 
    }
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
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
        res.status(410).send("Error while sending courses");
    }
});

module.exports = router;