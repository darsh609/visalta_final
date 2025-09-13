const mongoose = require("mongoose");

// Define the Courses schema

const coursesSchema = new mongoose.Schema(
	{
	courseName: { type: String },

	courseDescription: { type: String },
	instructor: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user"
	},
	//HOSTEL NAME&NUMBER
	address: {
		type: String,
	},
	price: {
		type: Number,
	},
	contact: {
		type: Number,
	},
	thumbnail: {
		type: String,
	},
	tag: {
		type: [String],
		required: true,
	},
	studentsEnrolled: [
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "user",
		},
	],
}, { timestamps: true }
);

// Export the Courses model
module.exports = mongoose.model("Course", coursesSchema);