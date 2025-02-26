const express = require("express");
const app = express();
//  const paymentRoutes = require("./routes/Payments");

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const contactus = require("./routes/Contact");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 6000;

//database connect
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"*",
		credentials:true,
	    })
)

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/contact", contactus);
// app.use("/api/v1/payment", paymentRoutes);
const updateRoutes = require("./routes/Update");
app.use("/api/v1/updates", updateRoutes);
const Admin = require("./routes/Admin");
app.use("/api/v1/admin", Admin);
app.use("/api/v1/review", require("./routes/RatingAndReview"));

app.use("/api/v1/weekend", require("./routes/Weekend"));
app.use("/api/v1/oneday", require("./routes/Oneday"));





const feedbackRoutes = require("./routes/Feedback");

// const app = express();

// mongoose.connect("mongodb://localhost:27017/feedbackDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// app.use(express.json());
app.use("/api/v1/feedback", feedbackRoutes);


// app.use("/api/v1/user", require("./routes/User"));

//def route

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});



const requestRoutes = require("./routes/Request");


app.use("/api/v1/requests", requestRoutes);

const notificationPreferenceRoutes = require("./routes/notificationPreferenceRoutes");
app.use("/api/v1/notifications", notificationPreferenceRoutes);

app.use("/api/v1/restraunts", require("./routes/Restraunts"));
app.use("/api/v1/worship", require("./routes/Worship"));
app.use("/api/v1/users", require("./routes/users"));
app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

