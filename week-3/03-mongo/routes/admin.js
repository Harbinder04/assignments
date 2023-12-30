const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin, Course} = require("../db/index.js")
const router = Router();

// Admin Routes
app.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    
    Admin.create({username: username, 
        password : password})
    .then(()=>{
        res.status(200).json({
            message: 'Admin created successfully'
        });
    }).catch((err)=>{
        res.status(411).send(err)
    });
});

app.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const newCourse = Course.create({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink
    }).then(()=>{
      res.status(200).json({message: 'Course created successfully', courseId: newCourse._id});
    }).catch((err)=>{
        res.status(411).send(err);
    });
});

app.get('/courses', adminMiddleware, async (req, res) => {
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

module.exports = router;