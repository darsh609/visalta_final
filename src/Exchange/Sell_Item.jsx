// export default UploadItemForm;
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
// import Select from "react-select";

const UploadItemForm = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    address: "",
    price: "",
    tag: [],
    contact: "+91", // Default value for contact input
    thumbnail: null,
  });
  const [tagInput, setTagInput] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const hostelOptions = [
    "Azad Hall (Ist Block)", "Bose Hall (2nd Block)", "Ambedkar Hall (3rd Block)", "Babha Hall (4th Block)",
    "Gandhi Hall (5th Block)", "Gokhale Hall (5th Block)", "Radhakrishnan Hall (6th Block)", "Raman Hall (7th Block)",
    "Nehru Hall (8th Block)", "Patel Hall (9th Block)", "Tagore Hall (10th Block)", "Viswesvraya Hall (11th Block)",
    "Rajendra Prasad Hall (12th Block)", "Vikram Sarabhai Hall (14th Block)", "1K Hall of Residence (1K)", "1.8K Ultra Mega Hostel (1.8K)",
    "International Students Hall (ISH)", "Priyadarshini Hall", "Sarojini Hall", "NEW LADIES HOSTEL-A",
    "NEW LADIES HOSTEL-B", "NEW LADIES HOSTEL-C", "Nearby Kazipet", "Nearby Hanamkonda", "Other"
  ];
 
  // Load saved form data from localStorage on mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData && new Date(savedData.expiry) > new Date()) {
      setFormData(savedData.data);
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "formData",
      JSON.stringify({
        data: formData,
        expiry: new Date().getTime() + 24 * 60 * 60 * 1000, // Expiry set for 24 hours
      })
    );
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
     // Check word count for Product Name
     if (name === 'courseName') {
      const words = value.trim().split(/\s+/);
      if (words.length > 5) return;
    }
    
    // Check word count for Product Description
    if (name === 'courseDescription') {
      const words = value.trim().split(/\s+/);
      if (words.length > 30) return;
    }
    
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    validateForm(updatedData);
  };

  const handleFileChange = (e) => {
    const updatedData = { ...formData, thumbnail: e.target.files[0] };
    setFormData(updatedData);
    validateForm(updatedData);
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      const newTag = tagInput.trim();
      if (formData.tag.length < 3 && !formData.tag.includes(newTag)) {
        const updatedData = {
          ...formData,
          tag: [...formData.tag, newTag],
        };
        setFormData(updatedData);
        validateForm(updatedData);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedData = {
      ...formData,
      tag: formData.tag.filter((tag) => tag !== tagToRemove),
    };
    setFormData(updatedData);
    validateForm(updatedData);
  };

  const validateForm = (data) => {
    const isValid =
      data.courseName &&
      data.courseDescription &&
      data.address &&
      data.price &&
      data.contact &&
      data.thumbnail &&
      data.tag.length > 0;
    setIsFormValid(isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { courseName, courseDescription, address, price, tag, contact, thumbnail } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append("courseName", courseName);
    formDataToSend.append("courseDescription", courseDescription);
    formDataToSend.append("address", address);
    formDataToSend.append("price", price);
    formDataToSend.append("contact", contact);

    tag.forEach((t) => {
      formDataToSend.append("tag", t);
    });

    if (thumbnail) {
      formDataToSend.append("thumbnailImage", thumbnail);
    }

    const token = JSON.parse(localStorage.getItem("token"));

    // Show loading toast
    const loadingToastId = toast.loading("Listing your Product..");

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/course/createCourse`, {
        method: "POST",
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create course");
      }

      const result = await response.json();
      toast.success("Product Listed successfully!", { id: loadingToastId });

      // Clear form and localStorage after successful submission
      setFormData({
        courseName: "",
        courseDescription: "",
        address: "",
        price: "",
        tag: [],
        contact: "+91", // Reset with default country code
        thumbnail: null,
      });
      localStorage.removeItem("formData");
    } catch (error) {
      toast.error(error.message, { id: loadingToastId });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-7xl bg-[#8ba498] rounded-xl shadow-lg overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          {/* Left Section - Form Title and Description */}
          <div className="w-full md:w-1/3 bg-[#eaeaea] p-4 md:p-8 flex flex-col justify-between">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-2"
              >
                Hi {user?.firstName}!
              </motion.h2>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg md:text-xl lg:text-2xl font-bold text-black mb-4"
              >
                List Your Product
              </motion.h3>
              <p className="text-sm md:text-base text-gray-700 mb-4">
                Fill in the details to list your product for sale. All fields are required.
              </p>
              <p className="text-xs md:text-sm italic text-gray-600">
                "Empowering students to buy, sell, and connect as they build a vibrant campus community."
              </p>
            </div>
          </div>

          {/* Right Section - Form Fields */}
          <div className="w-full md:w-2/3 p-4 md:p-8">
            <motion.form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="col-span-2">
                <label className="block text-sm md:text-base text-black mb-2 font-medium">Product Name</label>
                <input
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  className="w-full p-2 md:p-3 rounded-lg bg-transparent border-b border-black focus:border-blue-500 transition-all duration-300 outline-none text-sm md:text-base text-black"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm md:text-base text-black mb-2 font-medium">Product Description</label>
                <textarea
                  name="courseDescription"
                  value={formData.courseDescription}
                  onChange={handleChange}
                  className="w-full p-2 md:p-3 rounded-lg bg-transparent border-b border-black focus:border-blue-500 transition-all duration-300 outline-none resize-none h-24 md:h-32 text-sm md:text-base text-black"
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm md:text-base text-black mb-2 font-medium">Location</label>
                <select
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 md:p-3 rounded-lg bg-transparent border-b border-black focus:border-blue-500 transition-all duration-300 outline-none text-sm md:text-base text-black"
                >
                  <option value="" disabled>
                    Select your address...
                  </option>
                  {hostelOptions.map((option, index) => (
                    <option key={index} value={option} className="text-black">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm md:text-base text-black mb-2 font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2 md:p-3 rounded-lg bg-transparent border-b border-black focus:border-blue-500 transition-all duration-300 outline-none text-sm md:text-base text-black"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm md:text-base text-black mb-2 font-medium">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                    className="flex-1 p-2 md:p-3 rounded-lg bg-transparent border-b border-black focus:border-blue-500 transition-all duration-300 outline-none text-sm md:text-base text-black placeholder-gray-600"
                    placeholder="Add a tag"
                  />
                  <motion.button
                    type="button"
                    onClick={handleAddTag}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 md:px-6 py-2 md:py-3 bg-black text-white rounded-full transition-colors text-sm md:text-base"
                  >
                    Add
                  </motion.button>
                </div>

                <motion.div layout className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {formData.tag.map((t) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-flex items-center bg-blue-50 text-blue-600 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm"
                      >
                        {t}
                        <motion.button
                          type="button"
                          onClick={() => handleRemoveTag(t)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="ml-2 text-blue-400 hover:text-red-500"
                        >
                          ×
                        </motion.button>
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm md:text-base text-black mb-2 font-medium">Contact Number</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  onKeyPress={(e) => { if (e.key === ' ') e.preventDefault(); }}
                  className="w-full p-2 md:p-3 rounded-lg bg-transparent border-b border-black focus:border-blue-500 transition-all duration-300 outline-none text-sm md:text-base text-black"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm md:text-base text-black mb-2 font-medium">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 md:p-3 text-sm md:text-base text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-black hover:file:bg-gray-100"
                />
              </div>

              <div className="col-span-2">
                <AnimatePresence>
                  {isFormValid && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-black text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-black transition-colors text-sm md:text-base"
                    >
                      List Product
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UploadItemForm;
