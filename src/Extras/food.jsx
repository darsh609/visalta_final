import React, { useState, useEffect } from 'react';
import food from '../datas/food.json';
import { filterData } from '../datas/filters';
import { RxCross1 } from "react-icons/rx";
import { FiFilter, FiMap } from "react-icons/fi";

export const Food = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (activeFilters.length === 0) {
      setRestaurants(food);
      return;
    }

    const filteredRestaurants = food.filter(restaurant =>
      activeFilters.every(filter => restaurant.filters.includes(filter))
    );
    setRestaurants(filteredRestaurants);
  }, [activeFilters]);

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

  const searchResults = restaurants.filter(restaurant => {
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

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(searchTerm ? searchResults : restaurants).map((restaurant, idx) => (
            <div
              key={idx}
              onClick={() => openMap(restaurant.Name + " Kazipet Warangal")}
              className="group cursor-pointer bg-zinc-800/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 border border-zinc-700/50"
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
                <div className="flex items-center gap-2 text-[#1DB954] group-hover:text-white transition-colors">
                  <FiMap />
                  <span>View on Map</span>
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