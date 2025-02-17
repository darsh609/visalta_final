const AdminWhitelist=require("../models/Admin");

exports.addAdmin = async (req, res) => {
	const { email } = req.body;
	try {
		if (!email) {
			return res.status(400).json({ message: "Email is required" });
		}

		const existingAdmin = await AdminWhitelist.findOne({ email });
		if (existingAdmin) {
			return res.status(400).json({ message: "Email is already an admin" });
		}

		await AdminWhitelist.create({ email });
		res.status(200).json({ message: "Admin added successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to add admin" });
	}
};
