import React,{useState} from 'react'
import travel from '../datas/Oneday.json';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FiMap } from "react-icons/fi";
import TravelForm from './TravelForm';

const Oneday = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSearchResults(value.length > 0);
  };

  const searchResults = travel.filter(place => {
    const name = place.PlaceName.toLowerCase();
    return name.startsWith(searchTerm.toLowerCase());
  }).slice(0, 10);

  const openMap = (location) => {
    window.open(location, '_blank');
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-8 text-white">
          Discover Places
          <span className="block text-lg font-normal text-zinc-400 mt-2">Telangana Tourism</span>
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
                      setSearchTerm(place.PlaceName);
                      setShowSearchResults(false);
                    }}
                  >
                    {place.PlaceName}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <TravelForm />
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(searchTerm ? searchResults : travel).map((place, idx) => (
            <div
              key={idx}
              onClick={() => openMap(place.Location)}
              className="group cursor-pointer bg-zinc-800/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 border border-zinc-700/50"
            >
              <div className="relative">
                {place.Image ? (
                  <img
                    src={place.Image}
                    alt={place.PlaceName}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-zinc-700 flex items-center justify-center">
                    <span className="text-zinc-500">No image available</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#FF6B6B] transition-colors">
                  {place.PlaceName}
                </h3>
                {place.Timing && (
                  <p className="text-zinc-400 mb-2">{place.Timing}</p>
                )}
                {/* {place.Ticket && (
                  <p className="text-zinc-300 mb-4">{place.Ticket}</p>
                )} */}
                <div className="flex items-center gap-2 text-[#FF6B6B] group-hover:text-white transition-colors">
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

export default Oneday;