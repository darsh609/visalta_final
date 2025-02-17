
import React, { useState } from "react";
import axios from "axios";
import { FiUpload, FiMapPin } from "react-icons/fi";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const TravelForm = () => {
  const [formData, setFormData] = useState({
    PlaceName: "",
    Timing: "",
    Ticket: "",
    location: "",
    Img: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image file input and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        Img: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Open Google Maps using current geolocation
  const handleLocationSearch = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
          "_blank"
        );
      });
    } else {
      window.open("https://www.google.com/maps", "_blank");
    }
  };

  // Handle form submission using the weekend add route
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Prepare the form data to match your Weekend model:
      // - placeName, timing, ticket, location, and image (uploaded file)
      const submitData = new FormData();
      submitData.append("placeName", formData.PlaceName);
      submitData.append("timing", formData.Timing);
      submitData.append("ticket", formData.Ticket);
      submitData.append("location", formData.location);
      if (formData.Img) {
        submitData.append("image", formData.Img);
      }

      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/weekend/add`,
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Place added successfully!");
      // Reset form
      setFormData({
        PlaceName: "",
        Timing: "",
        Ticket: "",
        location: "",
        Img: null,
      });
      setImagePreview(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error adding place"
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const { user } = useSelector((state) => state.profile);
  console.log("---->",user)
  const isAdmin = user?.accountType === "Admin";

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* <Toaster  reverseOrder={false} /> */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-8 text-white">
          Add Place
          <span className="block text-lg font-normal text-zinc-400 mt-2">
            Admin Panel
          </span>
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto space-y-6"
        >
          {/* Place Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Place Name
            </label>
            <input
              type="text"
              name="PlaceName"
              value={formData.PlaceName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 text-white border border-zinc-700 focus:outline-none focus:border-[#FF6B6B] backdrop-blur-sm"
              required
            />
          </div>

          {/* Timing */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Place Timings
            </label>
            <input
              type="text"
              name="Timing"
              value={formData.Timing}
              onChange={handleInputChange}
              placeholder="e.g., 9:00 AM - 6:00 PM"
              className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 text-white border border-zinc-700 focus:outline-none focus:border-[#FF6B6B] backdrop-blur-sm"
              required
            />
          </div>

          {/* Ticket Price */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Ticket Price
            </label>
            <input
              type="text"
              name="Ticket"
              value={formData.Ticket}
              onChange={handleInputChange}
              placeholder="e.g., Rs400/- per Adult + GST"
              className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 text-white border border-zinc-700 focus:outline-none focus:border-[#FF6B6B] backdrop-blur-sm"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Location
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter place location"
                className="flex-1 px-4 py-3 rounded-lg bg-zinc-800/50 text-white border border-zinc-700 focus:outline-none focus:border-[#FF6B6B] backdrop-blur-sm"
                required
              />
              <button
                type="button"
                onClick={handleLocationSearch}
                className="px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-700 transition-colors"
                title="Open Google Maps"
              >
                <FiMapPin className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Place Image
            </label>
            <div className="flex flex-col items-center p-6 border-2 border-dashed border-zinc-700 rounded-lg hover:border-[#FF6B6B] transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
                required={!formData.Img}
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                {imagePreview ? (
                  <div className="relative w-full">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                      <FiUpload className="w-8 h-8" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <FiUpload className="w-8 h-8 mb-2" />
                    <span className="text-sm text-zinc-400">
                      Click to upload image
                    </span>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
              isSubmitting
                ? "bg-zinc-700 cursor-not-allowed"
                : "bg-[#FF6B6B] hover:bg-[#FF6B6B]/90"
            }`}
          >
            {isSubmitting ? "Adding Place..." : "Add Place"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TravelForm;
