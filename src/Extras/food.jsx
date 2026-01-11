

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { filterData } from '../datas/filters';
import { RxCross1 } from "react-icons/rx";
import { FiFilter, FiMap, FiTrash2 } from "react-icons/fi";
import Form from './Form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';  
export const Food = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { user } = useSelector((state) => state.profile);
  console.log("---->",user)
  const isAdmin = user?.accountType === "Admin";
  // Fetch restaurants from API
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/restraunts/get`);
      const transformedData = response.data.map(restaurant => ({
        id: restaurant._id,
        Name: restaurant.name,
        Timing: restaurant.openingHours,
        Img: restaurant.imageUrl,
        filters: restaurant.categories,
        location: restaurant.location
      }));
      setAllRestaurants(transformedData);
      setFilteredRestaurants(transformedData);
    } 
    catch (error) {
      console.error('Error fetching restaurants:', error);
      toast.error('Failed to fetch restaurants');
    }
  };

  useEffect(
    () => {
    fetchRestaurants();

  }, []);

  // Handle delete restaurant with confirmation
  const handleDelete = async (e, id, restaurantName) => {
    e.stopPropagation(); // Prevent triggering the parent onClick (map opening)
    
    // Show confirmation toast
    toast((t) => (
      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium">
          Are you sure you want to delete "{restaurantName}"?
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            onClick={async () => {
              try {
                await axios.delete(`${process.env.REACT_APP_BASE_URL}/restraunts/delete/${id}`);
                toast.success('Restaurant deleted successfully');
                fetchRestaurants(); // Refresh the list
                toast.dismiss(t.id);
              } catch (error) {
                console.error('Error deleting restaurant:', error);
                toast.error('Failed to delete restaurant');
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      position: 'top-center',
      style: {
        background: '#27272a',
        color: '#fff',
        minWidth: '300px',
      },
    });
  };

  useEffect(() => {
    if (activeFilters.length === 0) {
      setFilteredRestaurants(allRestaurants);
      return;
    }

    const filtered = allRestaurants.filter(restaurant =>
      activeFilters.every(filter => restaurant.filters.includes(filter))
    );
    setFilteredRestaurants(filtered);
  }, [activeFilters, allRestaurants]);

  const handleFilterToggle = (filterTitle) => {
    if (activeFilters.includes(filterTitle)) {
      setActiveFilters(prev => prev.filter(f => f !== filterTitle));
    } else {
      setActiveFilters(prev => [...prev, filterTitle]);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSearchResults(value.length > 0);
  };

  const openMap = (location) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
  };

  const searchResults = filteredRestaurants.filter(restaurant => {
    const name = restaurant.Name.toLowerCase();
    return name.startsWith(searchTerm.toLowerCase());
  }).slice(0, 10);

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-8 text-white">
          Discover Restaurants
          <span className="block text-lg font-normal text-zinc-400 mt-2">Kazipet-Warangal</span>
        </h1>

        {/* Search and Filter Row */}
        <div className="flex gap-4 items-center mb-8 max-w-4xl mx-auto relative">
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 text-white border border-zinc-700 focus:outline-none focus:border-[#1DB954] backdrop-blur-sm"
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={handleSearch}
            />
            
            {showSearchResults && searchTerm && (
              <div className="absolute z-20 w-full mt-2 bg-zinc-800/90 backdrop-blur-md rounded-lg shadow-xl border border-zinc-700">
                {searchResults.map((restaurant, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 hover:bg-[#1DB954]/20 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(restaurant.Name);
                      setShowSearchResults(false);
                    }}
                  >
                    {restaurant.Name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
              activeFilters.length > 0 
                ? 'bg-[#1DB954] text-white' 
                : 'bg-zinc-800/50 text-white border border-zinc-700'
            }`}
          >
            <FiFilter className="w-5 h-5" />
            Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
          </button>
        </div>

        {/* Horizontal Scrolling Filters */}
        {showFilters && (
          <div className="relative mb-8 max-w-4xl mx-auto">
            <div className="mx-4">
              <div className="relative">
                <div className="overflow-x-auto py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <div className="flex gap-2 whitespace-nowrap px-4">
                    <button
                      className={`px-4 py-2 rounded-full transition-all duration-300 ${
                        activeFilters.length === 0
                          ? 'bg-[#1DB954] text-white'
                          : 'bg-zinc-800/50 text-zinc-300 border border-zinc-700'
                      }`}
                      onClick={() => setActiveFilters([])}
                    >
                      All Restaurants
                    </button>
                    {filterData.map((filter) => (
                      <button
                        key={filter.id}
                        className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
                          activeFilters.includes(filter.title)
                            ? 'bg-[#1DB954] text-white'
                            : 'bg-zinc-800/50 text-zinc-300 border border-zinc-700'
                        }`}
                        onClick={() => handleFilterToggle(filter.title)}
                      >
                        {filter.title}
                        {activeFilters.includes(filter.title) && (
                          <RxCross1 className="w-4 h-4" />
                        )}
                      </button>
                    ))}
                    <div className="pr-4" />
                  </div>
                </div>
                {/* Left fade */}
                <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-zinc-900 to-transparent pointer-events-none" />
                {/* Right fade */}
                <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-zinc-900 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        )}
        {
          isAdmin && ( <div>
            <Form />
          </div>)
        }
       

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(searchTerm ? searchResults : filteredRestaurants).map((restaurant, idx) => (
            <div
              key={idx}
              // onClick={() => openMap(restaurant.location || restaurant.Name + " Kazipet Warangal")}'
              onClick={() => window.open(`${restaurant.location}`, "_blank")}
              className="group cursor-pointer bg-zinc-800/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 border border-zinc-700/50 relative"
            >
              <div className="relative">
                <img
                  src={restaurant.Img}
                  alt={restaurant.Name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#1DB954] transition-colors">
                  {restaurant.Name}
                </h3>
                <p className="text-zinc-400 mb-2">{restaurant.Timing}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {restaurant.filters.map((filter, fidx) => (
                    <span
                      key={fidx}
                      className="px-2 py-1 bg-zinc-700/50 rounded-full text-sm text-zinc-300"
                    >
                      {filter}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#1DB954] group-hover:text-white transition-colors">
                    <FiMap />
                    <span>View on Map</span>
                  </div>
                  {
                    isAdmin && (<button
                      onClick={(e) => handleDelete(e, restaurant.id, restaurant.Name)}
                      className="p-2 text-red-500 hover:text-red-400 transition-colors"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>)
                  }
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Food;