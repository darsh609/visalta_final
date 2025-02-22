const Course = require("../models/Course")
const crypto = require("crypto")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const Profile = require("../models/Profile")
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

// exports.Like = async (req, res) => {
//     try {
//         const { courseId } = req.body;
//         const userId = req.user.id;
//         // console.log("---->",req.user)

//         // Validate input
//         if (!courseId || !userId) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: "Course ID and User ID required" 
//             });
//         }

//         // Check if already enrolled
//         const existingEnrollment = await Course.findOne({
//             _id: courseId,
//             studentsEnrolled: userId
//         });

//         if (existingEnrollment) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: "Already enrolled in this course" 
//             });
//         }

//         // Enroll course
//         const enrolledCourse = await Course.findOneAndUpdate(
//             { _id: courseId },
//             { $push: { studentsEnrolled: userId } },
//             { new: true }
//         );

//         if (!enrolledCourse) {
//             return res.status(404).json({ 
//                 success: false, 
//                 message: "Course not found" 
//             });
//         }

//         // Update user's liked courses
//         const enrolledStudent = await User.findByIdAndUpdate(
//             userId,
//             { $push: { Likedcourses: courseId } },
//             { new: true }
//         );

//         // Send enrollment email
//         await mailSender(
//             enrolledStudent.email,
//             `Successfully Enrolled in ${enrolledCourse.courseName}`,
//             courseEnrollmentEmail(
//                 enrolledCourse.courseName,
//                 `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
//             )
//         );
//         //create a course enrollemnt for thisssssss
//         // await mailSender(
//         //     req.user.email,
//         //     `Someone liked  your ${enrolledCourse.courseName}`,
//         //     courseEnrollmentEmail(
//         //         enrolledCourse.courseName,
//         //         `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
//         //     )
//         // );

//         return res.status(200).json({
//             success: true,
//             message: "Course enrolled successfully",
//             course: enrolledCourse
//         });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ 
//             success: false, 
//             message: "Enrollment failed",
//             error: error.message 
//         });
//     }
// };

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

        // Check if the user is already enrolled
        const existingEnrollment = await Course.findOne({
            _id: courseId,
            studentsEnrolled: userId
        });

        // if (existingEnrollment) {
        //     // Unenroll the user (Dislike)
        //     const updatedCourse = await Course.findOneAndUpdate(
        //         { _id: courseId },
        //         { $pull: { studentsEnrolled: userId } },
        //         { new: true }
        //     );

        //     await User.findByIdAndUpdate(
        //         userId,
        //         { $pull: { Likedcourses: courseId } },
        //         { new: true }
        //     );

        //     return res.status(200).json({
        //         success: true,
        //         message: "Successfully unenrolled from the course",
        //         course: updatedCourse
        //     });
        // }

        // Enroll the user (Like)
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

        // Fetch additional student details for contact info
        const detail = await Profile.findById(enrolledStudent.additionalDetails);

        // Send email to the enrolled student
        // await mailSender(
        //     enrolledStudent.email,
        //     `Successfully Enrolled in ${enrolledCourse.courseName}`,
        //     courseEnrollmentEmail(
        //         enrolledCourse.courseName,
        //         `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        //     )
        // );

        // Send email to the instructor
        const instructor = await User.findById(enrolledCourse.instructor);
        if (instructor) {
            const instructorMessage = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>New Product Interest Alert</title>
                <style>
                    body {
                        background-color: #1a1a1a;
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #ffffff !important;
                        margin: 0;
                        padding: 0;
                    }
                    
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 40px 20px;
                        background-color: #232323;
                        border: 1px solid #333333;
                    }
                    
                    .logo {
                        max-width: 200px;
                        margin-bottom: 30px;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 10px;
                    }
                    
                    .highlight {
                        color: #4ade80;
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div style="text-align: center;">
                        <img class="logo" src="https://iili.io/3H2mdI1.jpg" alt="Visalta Logo" />
                    </div>
            
                    <div style="color: #ffffff; text-align: center; font-size: 28px; font-weight: bold; margin-bottom: 30px; text-transform: uppercase; letter-spacing: 2px; padding: 10px 0; background-color: #1c2a1f; border-bottom: 3px solid #4ade80;">
                        New Product Interest Alert! 🎯
                    </div>
            
                    <div style="padding: 20px;">
                        <p style="font-size: 18px; color: #ffffff;">
                            Hello ${instructor.firstName},
                        </p>
                        
                        <p style="font-size: 18px; color: #ffffff;">
                            Great news! A potential buyer has saved your product <span class="highlight">${enrolledCourse.courseName}</span> to their wishlist! 🌟
                        </p>
            
                        <div style="background-color: #1c2a1f; padding: 25px; margin: 25px 0; border-left: 3px solid #4ade80; border-radius: 0 8px 8px 0;">
                            <div style="color: #4ade80; font-weight: bold; margin-bottom: 15px;">Interested Buyer Details:</div>
                            <div style="color: #ffffff; margin: 10px 0;">
                                <strong style="color: #4ade80;">Name:</strong> ${enrolledStudent.firstName} ${enrolledStudent.lastName}
                            </div>
                            <div style="color: #ffffff; margin: 10px 0;">
                                <strong style="color: #4ade80;">Email:</strong> <a href="mailto:${enrolledStudent.email}" style="color: #4ade80;">${enrolledStudent.email}</a>
                            </div>
                            <div style="color: #ffffff; margin: 10px 0;">
                                <strong style="color: #4ade80;">Contact:</strong> ${detail.contactNumber || "Not Provided"}
                            </div>
                        </div>
            
                        <div style="background-color: #1c2a1f; padding: 20px; margin: 25px 0; text-align: center; border: 1px solid #4ade80; border-radius: 8px;">
                            <p style="color: #ffffff; margin: 0;">
                                📈 This interest indicates demand for your product!
                            </p>
                        </div>
            
                        <p style="font-size: 18px; color: #ffffff;">
                            Consider reaching out to the potential buyer to:
                        </p>
                        <ul style="color: #ffffff;">
                            <li>Share more details about your product</li>
                            <li>Offer special first-time buyer incentives</li>
                            <li>Answer any questions they might have</li>
                        </ul>
            
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333333; text-align: center; color: #ffffff;">
                            <p>Keep building your success story with Visalta! 🚀</p>
                            <p style="margin-top: 15px; font-size: 14px;">
                                Best regards,<br>
                                The Visalta Team
                            </p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            `;
            
            await mailSender(
                instructor.email,
                `New Interest Alert: ${enrolledCourse.courseName}`,
                instructorMessage
            );
        }

        return res.status(200).json({
            success: true,
            message: "Course enrolled successfully",
            course: enrolledCourse
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            success: false, 
            message: "Operation failed",
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
        const user = await User.findById(userId)
    .populate({
        path: 'Likedcourses',
        select: 'courseName courseDescription instructor thumbnail price address contact tag createdAt studentsEnrolled',
        populate: {
            path: 'instructor',
            
             // Example: If 'instructor' is an ID you want to populate
            select: 'firstName lastName email',
            populate:{
                path:'additionalDetails',
                select:'hostel'
            }
        },
    })
    .populate({
        path: 'additionalDetails'
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
  