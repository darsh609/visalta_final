import React, { useState } from 'react';
import axios from 'axios';
import { FiUpload, FiMapPin } from "react-icons/fi";

const TravelForm = () => {
  const [formData, setFormData] = useState({
    PlaceName: '',
    Timing: '',
    Description: '',
    Img: null,
    location: '',
    Ticket: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        Img: file
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocationSearch = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, '_blank');
      });
    } else {
      window.open('https://www.google.com/maps', '_blank');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', content: '' });

    try {
      // Create FormData object for multipart/form-data submission
      const submitData = new FormData();
      submitData.append('PlaceName', formData.PlaceName);
      submitData.append('Timing', formData.Timing);
      submitData.append('Description', formData.Description);
      submitData.append('location', formData.location);
      submitData.append('Ticket', formData.Ticket);
      if (formData.Img) {
        submitData.append('Img', formData.Img);
      }

      // Replace with your API endpoint
      const response = await axios.post('/api/places', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage({
        type: 'success',
        content: 'Place added successfully!'
      });

      // Clear form
      setFormData({
        PlaceName: '',
        Timing: '',
        Description: '',
        Img: null,
        location: '',
        Ticket: ''
      });
      setImagePreview(null);
    } catch (error) {
      setMessage({
        type: 'error',
        content: error.response?.data?.message || 'Error adding place'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-8 text-white">
          Add Place
          <span className="block text-lg font-normal text-zinc-400 mt-2">Admin Panel</span>
        </h1>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          {/* Message Display */}
          {message.content && (
            <div className={`p-4 rounded-lg ${
              message.type === 'success' ? 'bg-[#FF6B6B]/20' : 'bg-red-500/20'
            }`}>
              {message.content}
            </div>
          )}

          {/* Place Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Place Name</label>
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
            <label className="block text-sm font-medium mb-2">Place Timings</label>
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
            <label className="block text-sm font-medium mb-2">Ticket Price</label>
            <input
              type="text"
              name="Ticket"
              value={formData.Ticket}
              onChange={handleInputChange}
              placeholder="e.g., Free or Rs.100/- per person"
              className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 text-white border border-zinc-700 focus:outline-none focus:border-[#FF6B6B] backdrop-blur-sm"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="Description"
              value={formData.Description}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 text-white border border-zinc-700 focus:outline-none focus:border-[#FF6B6B] backdrop-blur-sm"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
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
            <label className="block text-sm font-medium mb-2">Place Image</label>
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
                    <span className="text-sm text-zinc-400">Click to upload image</span>
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
                ? 'bg-zinc-700 cursor-not-allowed'
                : 'bg-[#FF6B6B] hover:bg-[#FF6B6B]/90'
            }`}
          >
            {isSubmitting ? 'Adding Place...' : 'Add Place'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TravelForm;