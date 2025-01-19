import React, { useState } from 'react';
import { Edit2, Heart, Package, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Card = ({ children, className = '' }) => (
  <div className={`
    bg-zinc-800/70 
    backdrop-blur-xl 
    border border-zinc-700/50 
    rounded-xl 
    shadow-[0_8px_32px_rgba(0,0,0,0.5)]
    hover:shadow-[0_16px_48px_rgba(0,0,0,0.7)]
    transition-all 
    duration-300
    ${className}
  `}>
    {children}
  </div>
);

const ProfileComponent = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    firstName: 'tyagi',
    lastName: 'papa',
    email: 'at760440@gmail.com',
    phone: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="container mx-auto max-w-3xl p-6">
        <div className="space-y-6">
          {/* Personal Information Card */}
          <Card className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#1db954] font-semibold">Personal Information</h3>
                <button
                  type="button"
                  className="text-zinc-400 hover:text-[#1db954]"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit2 size={18} />
                </button>
              </div>

              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-r from-[#1db954] to-[#1db954]/70 p-1">
                    <div className="h-full w-full rounded-full bg-zinc-800 flex items-center justify-center text-2xl font-bold text-white relative overflow-hidden">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        'TP'
                      )}
                      <label className="absolute -right-1 -bottom-1 p-1.5 rounded-full bg-[#1db954] cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                        <Camera size={14} className="text-white" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'First Name', name: 'firstName' },
                  { label: 'Last Name', name: 'lastName' },
                  { label: 'Email', name: 'email' },
                  { label: 'Phone', name: 'phone' }
                ].map((field) => (
                  <div key={field.name} className="space-y-1">
                    <p className="text-sm text-zinc-500">{field.label}</p>
                    {isEditing ? (
                      <input
                        type="text"
                        name={field.name}
                        value={profileData[field.name]}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-700/30 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1db954]"
                      />
                    ) : (
                      <p className="text-white">{profileData[field.name] || 'Not set'}</p>
                    )}
                  </div>
                ))}
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg bg-zinc-700/30 text-zinc-400 hover:bg-zinc-700/50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#1db954] text-white hover:bg-[#1db954]/90"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </Card>

          {/* Overview Cards Parent Div */}
          <div className="space-y-4">
            <h3 className="text-[#1db954] font-semibold">Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Favorites Card */}
              <Card className="p-4">
                <button className="w-full">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <Heart size={18} className="text-[#1db954]" />
                      <span className="text-zinc-400">Favorites</span>
                    </div>
                    <span className="text-white font-semibold">28</span>
                  </div>
                </button>
              </Card>

              {/* Products Card */}
              <Card className="p-4">
                <button className="w-full">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <Package size={18} className="text-[#1db954]" />
                      <span className="text-zinc-400">Products</span>
                    </div>
                    <span className="text-white font-semibold">12</span>
                  </div>
                </button>
              </Card>
            </div>
          </div>

          {/* Quick Actions Cards Parent Div */}
          <div className="space-y-4">
            <h3 className="text-[#1db954] font-semibold">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Settings Card */}
              <Card className="p-4">
                <button onClick={()=>navigate("settings")}  className="w-full text-left">
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">Settings</h4>
                    <p className="text-zinc-400 text-sm">Manage your account settings</p>
                  </div>
                </button>
              </Card>

              {/* My Orders Card */}
              <Card className="p-4">
                <button className="w-full text-left">
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">My Orders</h4>
                    <p className="text-zinc-400 text-sm">View your order history</p>
                  </div>
                </button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;