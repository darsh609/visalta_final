const Course = require("../models/Course");
// const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
// Function to create a new course
exports.createCourse = async (req, res) => {
	try {
		// Get user ID from request object
		const userId = req.user.id;

		// Get all required fields from request body
		let {
			courseName,
			courseDescription,
			address,
			price,
			tag,
			contact
			
			
		} = req.body;
		// console.log("-------->",courseName)

		// Get thumbnail image from request files
		const thumbnail = req.files.thumbnailImage;

		// Check if any of the required fields are missing
		if (
			!courseName ||
			!courseDescription ||
			!address ||
			!price ||
			!tag ||
			!contact||
			!thumbnail 
		) {
			console.log("-------->",courseDescription)
			return res.status(400).json({
				success: false,
				message: "Allfff Fields are Mandatory",
			});
		}
		// if (!status || status === undefined) {
		// 	status = "Draft";
		// }
		// Check if the user is an instructor

		const instructorDetails = await User.findById(userId);

if (!instructorDetails) {
  return res.status(404).json({
    success: false,
    message: "User not found.",
  });
}


		// Check if the tag given is valid
		// const categoryDetails = await Category.findById(category);
		// if (!categoryDetails) {
		// 	return res.status(404).json({
		// 		success: false,
		// 		message: "Category Details Not Found",
		// 	});
		// }
		// Upload the Thumbnail to Cloudinary
		const thumbnailImage = await uploadImageToCloudinary(
			thumbnail,
			process.env.FOLDER_NAME
		);
		console.log(thumbnailImage);
		// Create a new course with the given details
		const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: instructorDetails._id,
			address: address,
			price,
			tag: tag,
			contact:contact,
			thumbnail: thumbnailImage.secure_url,
			
			
		});

		// Add the new course to the User Schema of the Instructor
		await User.findByIdAndUpdate(
			{
				_id: instructorDetails._id,
			},
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);
		// Add the new course to the Categories
		// await Category.findByIdAndUpdate(
		// 	{ _id: category },
		// 	{
		// 		$push: {
		// 			course: newCourse._id,
		// 		},
		// 	},
		// 	{ new: true }
		// );
		// Return the new course and a success message
		res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});
	} 
	catch (error) {
		// Handle any errors that occur during the creation of the course
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create courseee",
			error: error.message,
		});
	}
};

exports.getAllCourses = async (req, res) => {
	try {
		const allCourses = await Course.find(
			{ instructor: { $ne: req.user.id } },
			{
				courseName: true,
				price: true,
				contact: true,
				courseDescription: true,
				address: true,
				tag: true,
				timestamps: true,
				thumbnail: true,
				instructor: true,
				studentsEnrolled: true,
				createdAt: true, // Ensure this is included
			}
		)
			.populate("instructor")
			.exec();
		return res.status(200).json({
			success: true,
			data: allCourses,
		});
	} catch (error) {
		console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Course Data`,
			error: error.message,
		});
	}
};


//getCourseDetails
exports.getCourseDetails = async (req, res) => {
    try {
            //get id
            const {courseId} = req.body;
            //find course details
            const courseDetails = await Course.find(
                                        {_id:courseId})
                                        .populate(
                                            {
                                                path:"instructor",
                                                populate:{
                                                    path:"additionalDetails",
                                                },
                                            }
                                        )
                                        // .populate("category")
                                        //.populate("ratingAndreviews")
                                        // .populate({
                                        //     path:"courseContent",
                                        //     // populate:{
                                        //     //     path:"subSection",
                                        //     // },
                                        // })
                                        .exec();

                //validation
                if(!courseDetails) {
                    return res.status(400).json({
                        success:false,
                        message:`Could not find the course with ${courseId}`,
                    });
                }
                //return response
                return res.status(200).json({
                    success:true,
                    message:"Course Details fetched successfully",
                    data:courseDetails,
                })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

exports.getInstructorCourses = async (req, res) => {
	try {
	  // Get the instructor ID from the authenticated user or request body
	  const instructorId = req.user.id
  
	  // Find all courses belonging to the instructor
	  const instructorCourses = await Course.find({
		instructor: instructorId,
	  }).sort({ createdAt: -1 })
  
	  // Return the instructor's courses
	  res.status(200).json({
		success: true,
		data: instructorCourses,
	  })
	} catch (error) {
	  console.error(error)
	  res.status(500).json({
		success: false,
		message: "Failed to retrieve instructor courses",
		error: error.message,
	  })
	}
  }

  // Delete the Course
exports.deleteCourse = async (req, res) => {
	try {
	  const { courseId } = req.body

  
	  // Find the course
	  const course = await Course.findById(courseId)
	  if (!course) {
		return res.status(404).json({ message: "Course not found" })
	  }
  
	  // Unenroll students from the course

	  const studentsEnrolled = course.studentsEnrolled
	  for (const studentId of studentsEnrolled) {
		await User.findByIdAndUpdate(studentId, {
		  $pull:{ courses: courseId },
		})
	  }

	  await User.findByIdAndUpdate(course.instructor, {
		$pull:{ courses: courseId }, // Remove the course from the user's courses
	  });
  
	  // Delete sections and sub-sections
	//   const courseSections = course.courseContent
	//   for (const sectionId of courseSections) {
	// 	// Delete sub-sections of the section
	// 	const section = await Section.findById(sectionId)
	// 	if (section) {
	// 	  const subSections = section.subSection
	// 	  for (const subSectionId of subSections) {
	// 		await SubSection.findByIdAndDelete(subSectionId)
	// 	  }
	// 	}
  
	// 	// Delete the section
	// 	await Section.findByIdAndDelete(sectionId)
	//   }
  
	  // Delete the course
	  await Course.findByIdAndDelete(courseId)
  
	  return res.status(200).json({
		success: true,
		message: "Course deleted successfully",
	  })
	} catch (error) {
	  console.error(error)
	  return res.status(500).json({
		success: false,
		message: "Server error",
		error: error.message,
	  })
	}
  }