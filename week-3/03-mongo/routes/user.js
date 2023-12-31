const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Courses} = require("../db/index.js")
// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    User.create({
        username: req.body.username,
        password: req.body.password
    });
    res.json({
        message: 'User created successfully'
    });
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Courses.find()
    .then((courses)=>{
        res.json({
            courses: courses
        });
    }).catch((err)=>{
        res.status(410).send("Unable to fetch");
    });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    const password = req.headers.password;

    const purchase = await User.updateOne(
        { username: username ,
        password: password},
        { $push: { purchasedCourses: courseId } } //https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push
     );
     if(purchase){
        res.status(200).json({ message: 'Course purchased successfully' });
     }else{
        res.send("Unable to purchase");
     }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
try{
    const user = await User.findOne({
        username: req.headers.username,
        password: req.headers.password,
    });
    const courses = await User.find({
        _id: {
            "$in" : user.purchasedCourses
        }
    });
    if(courses){
    res.status(200).json(courses);
    }
    else{
        res.send("You have no course purchased")
    }
}catch{
    res.status(404).send("Invlaid Request.")
}
});

module.exports = router