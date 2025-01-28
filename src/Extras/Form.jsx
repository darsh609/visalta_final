// import React, { useState } from 'react';
// import axios from 'axios';
// import { filterData } from '../datas/filters';
// import { RxCross1 } from "react-icons/rx";
// import { FiUpload, FiMapPin } from "react-icons/fi";

// const Form = () => {
//   const [formData, setFormData] = useState({
//     Name: '',
//     Timing: '',
//     Img: null,
//     location: '',
//     filters: []
//   });
//   const [imagePreview, setImagePreview] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState({ type: '', content: '' });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({
//         ...prev,
//         Img: file
//       }));

//       // Create preview URL
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleFilterToggle = (filterTitle) => {
//     setFormData(prev => ({
//       ...prev,
//       filters: prev.filters.includes(filterTitle)
//         ? prev.filters.filter(f => f !== filterTitle)
//         : [...prev.filters, filterTitle]
//     }));
//   };

//   const handleLocationSearch = () => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, '_blank');
//       });
//     } else {
//       window.open('https://www.google.com/maps', '_blank');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage({ type: '', content: '' });

//     try {
//       // Create FormData object for multipart/form-data submission
//       const submitData = new FormData();
//       submitData.append('Name', formData.Name);
//       submitData.append('Timing', formData.Timing);
//       submitData.append('location', formData.location);
//       submitData.append('filters', JSON.stringify(formData.filters));
//       if (formData.Img) {
//         submitData.append('Img', formData.Img);
//       }

//       // Replace with your API endpoint
//       const response = await axios.post('/api/restaurants', submitData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       setMessage({
//         type: 'success',
//         content: 'Restaurant added successfully!'
//       });

//       // Clear form
//       setFormData({
//         Name: '',
//         Timing: '',
//         Img: null,
//         location: '',
//         filters: []
//       });
//       setImagePreview(null);
//     } catch (error) {
//       setMessage({
//         type: 'error',
//         content: error.response?.data?.message || 'Error adding restaurant'
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-zinc-900 text-white">
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-5xl font-bold text-center mb-8 text-white">
//           Add Restaurant
//           <span className="block text-lg font-normal text-zinc-400 mt-2">Admin Panel</span>
//         </h1>

//         <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
//           {/* Message Display */}
//           {message.content && (
//             <div className={`p-4 rounded-lg ${
//               message.type === 'success' ? 'bg-[#1DB954]/20' : 'bg-red-500/20'
//             }`}>
//               {message.content}
//             </div>
//           )}

//           {/* Restaurant Name */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Restaurant Name</label>
//             <input
//               type="text"
//               name="Name"
//               value={formData.Name}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 text-white border border-zinc-700 focus:outline-none focus:border-[#1DB954] backdrop-blur-sm"
//               required
//             />
//           </div>

//           {/* Timing */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Opening Hours</label>
//             <input
//               type="text"
//               name="Timing"
//               value={formData.Timing}
//               onChange={handleInputChange}
//               placeholder="e.g., 10:00 AM - 10:00 PM"
//               className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 text-white border border-zinc-700 focus:outline-none focus:border-[#1DB954] backdrop-blur-sm"
//               required
//             />
//           </div>

//           {/* Location */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Location</label>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleInputChange}
//                 placeholder="Enter restaurant location"
//                 className="flex-1 px-4 py-3 rounded-lg bg-zinc-800/50 text-white border border-zinc-700 focus:outline-none focus:border-[#1DB954] backdrop-blur-sm"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={handleLocationSearch}
//                 className="px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-700 transition-colors"
//                 title="Open Google Maps"
//               >
//                 <FiMapPin className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           {/* Image Upload */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Restaurant Image</label>
//             <div className="flex flex-col items-center p-6 border-2 border-dashed border-zinc-700 rounded-lg hover:border-[#1DB954] transition-colors">
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden"
//                 id="image-upload"
//                 required={!formData.Img}
//               />
//               <label
//                 htmlFor="image-upload"
//                 className="cursor-pointer flex flex-col items-center"
//               >
//                 {imagePreview ? (
//                   <div className="relative w-full">
//                     <img
//                       src={imagePreview}
//                       alt="Preview"
//                       className="w-full h-48 object-cover rounded-lg"
//                     />
//                     <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
//                       <FiUpload className="w-8 h-8" />
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center">
//                     <FiUpload className="w-8 h-8 mb-2" />
//                     <span className="text-sm text-zinc-400">Click to upload image</span>
//                   </div>
//                 )}
//               </label>
//             </div>
//           </div>

//           {/* Filters */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Categories</label>
//             <div className="flex flex-wrap gap-2">
//               {filterData.map((filter) => (
//                 <button
//                   type="button"
//                   key={filter.id}
//                   className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
//                     formData.filters.includes(filter.title)
//                       ? 'bg-[#1DB954] text-white'
//                       : 'bg-zinc-800/50 text-zinc-300 border border-zinc-700'
//                   }`}
//                   onClick={() => handleFilterToggle(filter.title)}
//                 >
//                   {filter.title}
//                   {formData.filters.includes(filter.title) && (
//                     <RxCross1 className="w-4 h-4" />
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
//               isSubmitting
//                 ? 'bg-zinc-700 cursor-not-allowed'
//                 : 'bg-[#1DB954] hover:bg-[#1DB954]/90'
//             }`}
//           >
//             {isSubmitting ? 'Adding Restaurant...' : 'Add Restaurant'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Form;



import React, { useState } from 'react';
import axios from 'axios';
import { filterData } from '../datas/filters';
import { RxCross1 } from "react-icons/rx";
import { FiUpload, FiMapPin } from "react-icons/fi";
import { Toaster, toast } from 'react-hot-toast';


const Form = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Timing: '',
    Img: null,
    location: '',
    filters: []
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFilterToggle = (filterTitle) => {
    setFormData(prev => ({
      ...prev,
      filters: prev.filters.includes(filterTitle)
        ? prev.filters.filter(f => f !== filterTitle)
        : [...prev.filters, filterTitle]
    }));
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
  
    const loadingToastId = toast.loading('Submitting restaurant...');
  
    try {
      const submitData = new FormData();
      submitData.append('name', formData.Name);
      submitData.append('openingHours', formData.Timing);
      submitData.append('location', formData.location);
      
      // Simply append the categories array as is
      submitData.append('categories', formData.filters);
  
      if (formData.Img) {
        submitData.append('image', formData.Img);
      }
  
      console.log("Submitting data:", {
        name: formData.Name,
        openingHours: formData.Timing,
        location: formData.location,
        categories: formData.filters
      });
  
      const response = await axios.post('http://localhost:4000/api/v1/restraunts/add', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      toast.success('Restaurant added successfully!', { id: loadingToastId });
  
      setFormData({
        Name: '',
        Timing: '',
        Img: null,
        location: '',
        filters: [],
      });
      setImagePreview(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding restaurant', { id: loadingToastId });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-8 text-white">
          Add Restaurant
          <span className="block text-lg font-normal text-zinc-400 mt-2">Admin Panel</span>
        </h1>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          {/* Restaurant Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Restaurant Name</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 text-white border border-zinc-700 focus:outline-none focus:border-[#1DB954] backdrop-blur-sm"
              required
            />
          </div>

          {/* Timing */}
          <div>
            <label className="block text-sm font-medium mb-2">Opening Hours</label>
            <input
              type="text"
              name="Timing"
              value={formData.Timing}
              onChange={handleInputChange}
              placeholder="e.g., 10:00 AM - 10:00 PM"
              className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 text-white border border-zinc-700 focus:outline-none focus:border-[#1DB954] backdrop-blur-sm"
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
                placeholder="Enter restaurant location"
                className="flex-1 px-4 py-3 rounded-lg bg-zinc-800/50 text-white border border-zinc-700 focus:outline-none focus:border-[#1DB954] backdrop-blur-sm"
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
            <label className="block text-sm font-medium mb-2">Restaurant Image</label>
            <div className="flex flex-col items-center p-6 border-2 border-dashed border-zinc-700 rounded-lg hover:border-[#1DB954] transition-colors">
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

          {/* Filters */}
          <div>
            <label className="block text-sm font-medium mb-2">Categories</label>
            <div className="flex flex-wrap gap-2">
              {filterData.map((filter) => (
                <button
                  type="button"
                  key={filter.id}
                  className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
                    formData.filters.includes(filter.title)
                      ? 'bg-[#1DB954] text-white'
                      : 'bg-zinc-800/50 text-zinc-300 border border-zinc-700'
                  }`}
                  onClick={() => handleFilterToggle(filter.title)}
                >
                  {filter.title}
                  {formData.filters.includes(filter.title) && (
                    <RxCross1 className="w-4 h-4" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
              isSubmitting
                ? 'bg-zinc-700 cursor-not-allowed'
                : 'bg-[#1DB954] hover:bg-[#1DB954]/90'
            }`}
          >
            {isSubmitting ? 'Adding Restaurant...' : 'Add Restaurant'}
          </button>
        </form>

        {/* Toast Container */}
        {/* <div>
          <Toaster position="top-right" reverseOrder={false} />
        </div> */}
      </div>
    </div>
  );
};

export default Form;
