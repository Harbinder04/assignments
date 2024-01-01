const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin, Course} = require("../db/index.js")
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    
    Admin.create({username: username, 
        password : password})
    .then((data)=>{
        res.status(200).json({
            message: 'Admin created successfully'
        });
    }).catch((err)=>{
        res.status(411).send(err)
    });
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const username = req.headers.username;
    const password = req.headers.username;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    Course.create({username: username,
    password: password,
title: title,description: description, price: price, imageLink: imageLink})
.then(()=>{
    res.status(200).json({
        message: 'Course Created succesfully'});
    }).catch((err)=>{
        res.send(err);
});
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find({});
    if(allCourses){
    res.status(200).json({
        courses : allCourses
    });
}else{
    res.status(410).send("Error while sending courses");
}
});

module.exports =  router;