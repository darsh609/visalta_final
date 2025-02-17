// import React, { useState } from 'react';
// import travel from '../datas/weekend.json';
// import { Link, Navigate, useNavigate } from 'react-router-dom';
// import { FiMap } from "react-icons/fi";
// import TravelForm from './TravelForm';

// const Travel = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showSearchResults, setShowSearchResults] = useState(false);

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     setShowSearchResults(value.length > 0);
//   };

//   const searchResults = travel.filter(place => {
//     const name = place.PlaceName.toLowerCase();
//     return name.startsWith(searchTerm.toLowerCase());
//   }).slice(0, 10);

//   const openMap = (location) => {
//     window.open(location, '_blank');
//   };

//   return (
//     <div className="min-h-screen bg-zinc-900 text-white">
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-5xl font-bold text-center mb-8 text-white">
//           Discover Places
//           <span className="block text-lg font-normal text-zinc-400 mt-2">Telangana Tourism</span>
//         </h1>

//         {/* Search Row */}
//         <div className="flex gap-4 items-center mb-8 max-w-4xl mx-auto relative">
//           <div className="flex-1 relative">
//             <input
//               type="text"
//               className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 text-white border border-zinc-700 focus:outline-none focus:border-[#FF6B6B] backdrop-blur-sm"
//               placeholder="Search places..."
//               value={searchTerm}
//               onChange={handleSearch}
//             />
            
//             {showSearchResults && searchTerm && (
//               <div className="absolute z-20 w-full mt-2 bg-zinc-800/90 backdrop-blur-md rounded-lg shadow-xl border border-zinc-700">
//                 {searchResults.map((place, idx) => (
//                   <div
//                     key={idx}
//                     className="px-4 py-2 hover:bg-[#FF6B6B]/20 cursor-pointer"
//                     onClick={() => {
//                       setSearchTerm(place.PlaceName);
//                       setShowSearchResults(false);
//                     }}
//                   >
//                     {place.PlaceName}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         <div>
//           <TravelForm />
//         </div>

//         {/* Places Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {(searchTerm ? searchResults : travel).map((place, idx) => (
//             <div
//               key={idx}
//               onClick={() => openMap(place.Location)}
//               className="group cursor-pointer bg-zinc-800/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 border border-zinc-700/50"
//             >
//               <div className="relative">
//                 {place.Image ? (
//                   <img
//                     src={place.Image}
//                     alt={place.PlaceName}
//                     className="w-full h-48 object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-48 bg-zinc-700 flex items-center justify-center">
//                     <span className="text-zinc-500">No image available</span>
//                   </div>
//                 )}
//                 <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
//               </div>
//               <div className="p-4">
//                 <h3 className="text-xl font-bold mb-2 group-hover:text-[#FF6B6B] transition-colors">
//                   {place.PlaceName}
//                 </h3>
//                 {place.Timing && (
//                   <p className="text-zinc-400 mb-2">{place.Timing}</p>
//                 )}
//                 {place.Ticket && (
//                   <p className="text-zinc-300 mb-4">{place.Ticket}</p>
//                 )}
//                 <div className="flex items-center gap-2 text-[#FF6B6B] group-hover:text-white transition-colors">
//                   <FiMap />
//                   <span>View on Map</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Travel;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiMap, FiTrash2 } from "react-icons/fi";
import TravelForm from "./TravelForm";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const Travel = () => {
  const { user } = useSelector((state) => state.profile);
  console.log("---->",user)
  const isAdmin = user?.accountType === "Admin";
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [weekendData, setWeekendData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  // Fetch weekend data from backend API
  useEffect(() => {
    const fetchWeekendData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/weekend/get`
        );
        setWeekendData(response.data);
      } catch (error) {
        toast.error("Failed to fetch places data!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeekendData();
  }, []);

  // Handle search input changes
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSearchResults(value.length > 0);
  };

  // Filter results based on search term (limit to 10)
  const searchResults = weekendData
    .filter((place) =>
      place.placeName.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
    .slice(0, 10);

  // Open location in new tab (Google Maps or any URL)
  const openMap = (location) => {
    window.open(location, "_blank");
  };

  // Delete a weekend card
  const handleDelete = async () => {
    if (!deleteModal.id) return;

    toast.loading("Deleting place...", { id: "deleteToast" });
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/weekend/delete/${deleteModal.id}`
      );
      toast.success("Place deleted successfully!", { id: "deleteToast" });
      setWeekendData((prevData) =>
        prevData.filter((place) => place._id !== deleteModal.id)
      );
    } catch (error) {
      toast.error("Failed to delete place!", { id: "deleteToast" });
    } finally {
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-8 text-white">
          Discover Epic-Journeys
          <span className="block text-lg font-normal text-zinc-400 mt-2">
            Telangana Tourism
          </span>
        </h1>

        {/* Search Row */}
        <div className="flex gap-4 items-center mb-8 max-w-4xl mx-auto relative">
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 text-white border border-zinc-700 focus:outline-none focus:border-[#FF6B6B] backdrop-blur-sm"
              placeholder="Search places..."
              value={searchTerm}
              onChange={handleSearch}
            />

            {showSearchResults && searchTerm && (
              <div className="absolute z-20 w-full mt-2 bg-zinc-800/90 backdrop-blur-md rounded-lg shadow-xl border border-zinc-700">
                {searchResults.map((place, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 hover:bg-[#FF6B6B]/20 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(place.placeName);
                      setShowSearchResults(false);
                    }}
                  >
                    {place.placeName}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Travel Form (remains unchanged) */}
        {
          isAdmin &&(<div>
            <TravelForm />
          </div>)
}
        

        {/* Loading State or Places Grid */}
        {isLoading ? (
          <p className="text-center text-zinc-400">Loading places...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {(searchTerm ? searchResults : weekendData).map((place) => (
              <div
                key={place._id}
                className="group relative bg-zinc-800/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-zinc-700/50"
                onClick={() => openMap(place.location)}
              >
                <div className="relative">
                  {place.imageUrl ? (
                    <img
                      src={place.imageUrl}
                      alt={place.placeName}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-zinc-700 flex items-center justify-center">
                      <span className="text-zinc-500">
                        No image available
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#FF6B6B] transition-colors">
                    {place.placeName}
                  </h3>
                  {place.timing && (
                    <p className="text-zinc-400 mb-2">{place.timing}</p>
                  )}
                  {place.ticket && (
                    <p className="text-zinc-300 mb-4">{place.ticket}</p>
                  )}
                  <div className="flex items-center gap-2 text-[#FF6B6B] group-hover:text-white transition-colors">
                    <FiMap />
                    <span>View on Map</span>
                  </div>
                </div>

                {/* Delete Icon */}
                {
                  isAdmin &&( <div
                    className="absolute bottom-4 right-4 bg-red-500/80 p-2 rounded-full cursor-pointer shadow-lg hover:bg-red-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the card click event (openMap) from triggering
                      setDeleteModal({ isOpen: true, id: place._id });
                    }}
                  >
                    <FiTrash2 className="w-5 h-5 text-white" />
                  </div>)
                }
               
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-zinc-800 rounded-lg shadow-xl p-6 max-w-sm w-full">
              <h2 className="text-xl font-bold text-white mb-4">
                Confirm Deletion
              </h2>
              <p className="text-zinc-400 mb-6">
                Are you sure you want to delete this place? This action
                cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() =>
                    setDeleteModal({ isOpen: false, id: null })
                  }
                  className="px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 transition-colors text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition-colors text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Travel;
