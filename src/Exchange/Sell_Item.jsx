import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const UploadItemForm = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    address: "",
    price: "",
    tag: [],
    contact: "",
    thumbnail: null,
  });
  const [tagInput, setTagInput] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

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
      if (!formData.tag.includes(newTag)) {
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
    const loadingToastId = toast.loading("Submitting your course...");

    try {
      const response = await fetch(`http://localhost:4000/api/v1/course/createCourse`, {
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
      toast.success("Course created successfully!", { id: loadingToastId });

      // Clear form and localStorage after successful submission
      setFormData({
        courseName: "",
        courseDescription: "",
        address: "",
        price: "",
        tag: [],
        contact: "",
        thumbnail: null,
      });
      localStorage.removeItem("formData");
    } catch (error) {
      toast.error(error.message, { id: loadingToastId });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Create Course</h2>

        {/* Previous input fields remain the same */}
        <input
          type="text"
          name="courseName"
          placeholder="Course Name"
          value={formData.courseName}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
        />

        <textarea
          name="courseDescription"
          placeholder="Course Description"
          value={formData.courseDescription}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
        ></textarea>

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
        />

        {/* Updated Tags Section */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Add a tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            className="w-full p-2 rounded bg-zinc-700 text-white"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        {/* Tags Display with Remove Functionality */}
        <div className="mb-4 flex flex-wrap gap-2">
          {formData.tag.map((t, index) => (
            <span
              key={index}
              className="inline-flex items-center bg-zinc-600 text-white px-2 py-1 rounded"
            >
              {t}
              <button
                type="button"
                onClick={() => handleRemoveTag(t)}
                className="ml-2 text-red-300 hover:text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={formData.contact}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
        />

        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
        />

        {isFormValid && (
           <motion.button
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           type="submit"
           className="w-full bg-green-500 text-white py-2 rounded mt-4"
           disabled={!isFormValid}
         >
           Submit
         </motion.button>
        )}
      </motion.form>
    </div>
  );
};

export default UploadItemForm;