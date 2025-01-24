const Course = require("../models/Course")
const crypto = require("crypto")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail")

// const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
// exports.Like = async (req,res) => {
    
// try {
//         // Find the course and enroll the student in it
//         const { courseId } = req.body

//            const userId = req.user.id
//          console.log("User ID: ", userId)


//     if (!courseId || !userId) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Please Provide Course ID and User ID " })
//     }
  
//         const enrolledCourse = await Course.findOneAndUpdate(
//           { _id: courseId },
//           { $push: { studentsEnrolled: userId } },
//           { new: true }
//         )
  
//         if (!enrolledCourse) {
//           return res
//             .status(500)
//             .json({ success: false, error: "Course not found" })
//         }
//         console.log("Updated course: ", enrolledCourse)
  
//         // const courseProgress = await CourseProgress.create({
//         //   courseID: courseId,
//         //   userId: userId,
//         //   completedVideos: [],
//         // })
//         // Find the student and add the course to their list of enrolled courses
//         const enrolledStudent = await User.findByIdAndUpdate(
//           userId,
//           {
//             $push: {
//             Likedcourses: courseId,
              
//             },
//           },
//           { new: true }
//         )
  
//         console.log("Enrolled student: ", enrolledStudent)
//         // Send an email notification to the enrolled student
//         const emailResponse = await mailSender(
//           enrolledStudent.email,
//           `Successfully Enrolled into ${enrolledCourse.courseName}`,
//           courseEnrollmentEmail(
//             enrolledCourse.courseName,
//             `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
//           )
//         )
  
//         console.log("Email sent successfully: ", emailResponse.response)

//         return res.status(200).json({
//             success: true,
//             message: "Course enrolled successfully",
//             course: enrolledCourse
//         });
//       } catch (error) {
//         console.log(error)
//         return res.status(400).json({ success: false, error: error.message })
//       }
//     }

exports.Like = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        // Validate input
        if (!courseId || !userId) {
            return res.status(400).json({ 
                success: false, 
                message: "Course ID and User ID required" 
            });
        }

        // Check if already enrolled
        const existingEnrollment = await Course.findOne({
            _id: courseId,
            studentsEnrolled: userId
        });

        if (existingEnrollment) {
            return res.status(400).json({ 
                success: false, 
                message: "Already enrolled in this course" 
            });
        }

        // Enroll course
        const enrolledCourse = await Course.findOneAndUpdate(
            { _id: courseId },
            { $push: { studentsEnrolled: userId } },
            { new: true }
        );

        if (!enrolledCourse) {
            return res.status(404).json({ 
                success: false, 
                message: "Course not found" 
            });
        }

        // Update user's liked courses
        const enrolledStudent = await User.findByIdAndUpdate(
            userId,
            { $push: { Likedcourses: courseId } },
            { new: true }
        );

        // Send enrollment email
        await mailSender(
            enrolledStudent.email,
            `Successfully Enrolled in ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(
                enrolledCourse.courseName,
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
            )
        );

        return res.status(200).json({
            success: true,
            message: "Course enrolled successfully",
            course: enrolledCourse
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            success: false, 
            message: "Enrollment failed",
            error: error.message 
        });
    }
};

exports.Dislike = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        // Validate input
        if (!courseId || !userId) {
            return res.status(400).json({ 
                success: false, 
                message: "Course ID and User ID required" 
            });
        }

        // Remove from enrolled courses
        const unenrolledCourse = await Course.findOneAndUpdate(
            { _id: courseId },
            { $pull: { studentsEnrolled: userId } },
            { new: true }
        );

        if (!unenrolledCourse) {
            return res.status(404).json({ 
                success: false, 
                message: "Course not found" 
            });
        }

        // Remove from user's liked courses
        await User.findByIdAndUpdate(
            userId,
            { $pull: { Likedcourses: courseId } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Course unenrolled successfully",
            course: unenrolledCourse
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            success: false, 
            message: "Unenrollment failed",
            error: error.message 
        });
    }
};

exports.getAllLikedCourses = async (req, res) => {
    try {
        const userId = req.user.id;
 
        // Find user and populate liked courses
        const user = await User.findById(userId).populate({
            path: 'Likedcourses',
            select: 'courseName instructor thumbnail price rating' 
        });
 
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }
 
        return res.status(200).json({
            success: true,
            totalLikedCourses: user.Likedcourses.length,
            likedCourses: user.Likedcourses
        });
 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to retrieve liked courses",
            error: error.message 
        });
    }
 };
  