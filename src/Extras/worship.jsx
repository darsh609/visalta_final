

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiMap, FiTrash2 } from "react-icons/fi";
import TempleForm from "./TempleForm";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
const Worship = () => {
  const { user } = useSelector((state) => state.profile);
  console.log("---->",user)
  const isAdmin = user?.accountType === "Admin";
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [worshipData, setWorshipData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  useEffect(() => {
    const fetchWorshipData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/worship/get`);
        setWorshipData(response.data);
      } catch (error) {
        toast.error("Failed to fetch temples data!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorshipData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSearchResults(value.length > 0);
  };

  const searchResults = worshipData.filter((temple) => {
    const name = temple.name.toLowerCase();
    return name.startsWith(searchTerm.toLowerCase());
  });

  const openMap = (location) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location + " Temple Kazipet Warangal")}`,
      "_blank"
    );
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;

    toast.loading("Deleting temple...", { id: "deleteToast" });
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/worship/delete/${deleteModal.id}`);
      toast.success("Temple deleted successfully!", { id: "deleteToast" });
      setWorshipData((prevData) => prevData.filter((temple) => temple._id !== deleteModal.id));
    } catch (error) {
      toast.error("Failed to delete temple!", { id: "deleteToast" });
    } finally {
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-8 text-white">
          Discover Divine-Destinations
          <span className="block text-lg font-normal text-zinc-400 mt-2">
            Kazipet-Warangal
          </span>
        </h1>

        {/* Search Row */}
        <div className="flex gap-4 items-center mb-8 max-w-4xl mx-auto relative">
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 text-white border border-zinc-700 focus:outline-none focus:border-[#FF6B6B] backdrop-blur-sm"
              placeholder="Search temples..."
              value={searchTerm}
              onChange={handleSearch}
            />

            {showSearchResults && searchTerm && (
              <div className="absolute z-20 w-full mt-2 bg-zinc-800/90 backdrop-blur-md rounded-lg shadow-xl border border-zinc-700">
                {searchResults.map((temple, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 hover:bg-[#FF6B6B]/20 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(temple.name);
                      setShowSearchResults(false);
                    }}
                  >
                    {temple.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Temple Form */}
        {
          isAdmin &&(<div>
            <TempleForm />
          </div>)
}

        {/* Loading State */}
        {isLoading ? (
          <p className="text-center text-zinc-400">Loading temples...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {(searchTerm ? searchResults : worshipData).map((temple) => (
              <div
                key={temple._id}
                className="group cursor-pointer relative bg-zinc-800/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-zinc-700/50"
                onClick={() => window.open(`${temple.location}`, "_blank")}
              >
                <div className="relative">
                  <img
                    src={temple.imageUrl}
                    alt={temple.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#FF6B6B] transition-colors">
                    {temple.name}
                  </h3>
                  {temple.timings && (
                    <p className="text-zinc-400 mb-2">{temple.timings}</p>
                  )}
                  {temple.description && (
                    <p className="text-zinc-300 mb-4 line-clamp-2">
                      {temple.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-[#FF6B6B] group-hover:text-white transition-colors">
                    <FiMap />
                    <span>View on Map</span>
                  </div>
                </div>

                {/* Delete Icon */}
                {
                  isAdmin &&(<div
                    className="absolute bottom-4 right-4 bg-red-500/80 p-2 rounded-full cursor-pointer shadow-lg hover:bg-red-600 transition-colors"
                    onClick={() => setDeleteModal({ isOpen: true, id: temple._id })}
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
                Are you sure you want to delete this temple? This action cannot
                be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setDeleteModal({ isOpen: false, id: null })}
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

export default Worship;
