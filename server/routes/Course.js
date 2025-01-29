// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  deleteCourse
} = require("../controllers/Course")



const { auth, isStudent, isAdmin } = require("../middlewares/auth")

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth , createCourse)
router.post("/deleteCourse" , deleteCourse)

router.get("/getAllCourses", auth,getAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)


router.get("/mycourses",auth,require("../controllers/Course").getInstructorCourses )
router.post("/dolike",auth,require("../controllers/Liked").Like)
router.post("/dislike",auth,require("../controllers/Liked").Dislike)
router.get("/getalllike",auth,require("../controllers/Liked").getAllLikedCourses)


module.exports = router