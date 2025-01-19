import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

const Card = ({ children, className = '' }) => (
  <div className={`
    bg-zinc-800/70 
    backdrop-blur-xl 
    border border-zinc-700/50 
    rounded-xl 
    shadow-[0_8px_32px_rgba(0,0,0,0.5)]
    mb-6
    p-6
    ${className}
  `}>
    {children}
  </div>
);

const Settings = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileData, setProfileData] = useState({
    firstName: 'tyagi',
    lastName: 'papa',
    dateOfBirth: '',
    gender: '',
    contactNumber: ''
  });
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: ''
  });

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = () => {
    if (selectedImage) {
      setProfileImage(selectedImage);
      setSelectedImage(null);
      // Here you would typically handle the actual image upload to your backend
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-6">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

        {/* Profile Picture Section */}
        <Card>
          <h2 className="text-[#1db954] font-semibold mb-4">Change Profile Picture</h2>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-[#1db954] to-[#1db954]/70 p-1">
                <div className="h-full w-full rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
                  {(selectedImage || profileImage) ? (
                    <img 
                      src={selectedImage || profileImage} 
                      alt="Profile" 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Camera className="text-white h-8 w-8" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <label className="px-4 py-2 bg-zinc-700/30 text-white rounded-lg cursor-pointer hover:bg-zinc-700/50 transition-colors">
                Select
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
              </label>
              <button
                onClick={handleImageUpload}
                className="px-4 py-2 bg-[#1db954] text-white rounded-lg hover:bg-[#1db954]/90 transition-colors"
              >
                Upload
              </button>
            </div>
          </div>
        </Card>

        {/* Profile Information Section */}
        <Card>
          <h2 className="text-[#1db954] font-semibold mb-4">Profile Information</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'First Name', name: 'firstName' },
              { label: 'Last Name', name: 'lastName' },
              { label: 'Date of Birth', name: 'dateOfBirth', type: 'date' },
              { label: 'Gender', name: 'gender', type: 'select', options: ['Male', 'Female', 'Other'] },
              { label: 'Contact Number', name: 'contactNumber', type: 'tel', colspan: true }
            ].map((field) => (
              <div key={field.name} className={`space-y-1 ${field.colspan ? 'col-span-2' : ''}`}>
                <label className="text-sm text-zinc-400">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={profileData[field.name]}
                    onChange={handleProfileChange}
                    className="w-full bg-zinc-700/30 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1db954]"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || 'text'}
                    name={field.name}
                    value={profileData[field.name]}
                    onChange={handleProfileChange}
                    className="w-full bg-zinc-700/30 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1db954]"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 bg-zinc-700/30 text-zinc-400 rounded-lg hover:bg-zinc-700/50">
              Cancel
            </button>
            <button className="px-4 py-2 bg-[#1db954] text-white rounded-lg hover:bg-[#1db954]/90">
              Save Changes
            </button>
          </div>
        </Card>

        {/* Password Section */}
        <Card>
          <h2 className="text-[#1db954] font-semibold mb-4">Change Password</h2>
          <div className="space-y-4">
            {[
              { label: 'Current Password', name: 'currentPassword' },
              { label: 'New Password', name: 'newPassword' }
            ].map((field) => (
              <div key={field.name} className="space-y-1">
                <label className="text-sm text-zinc-400">{field.label}</label>
                <input
                  type="password"
                  name={field.name}
                  value={passwords[field.name]}
                  onChange={handlePasswordChange}
                  className="w-full bg-zinc-700/30 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1db954]"
                />
              </div>
            ))}
            <div className="mt-6 flex justify-end space-x-3">
              <button className="px-4 py-2 bg-zinc-700/30 text-zinc-400 rounded-lg hover:bg-zinc-700/50">
                Cancel
              </button>
              <button className="px-4 py-2 bg-[#1db954] text-white rounded-lg hover:bg-[#1db954]/90">
                Update Password
              </button>
            </div>
          </div>
        </Card>

        {/* Delete Account Section */}
        <Card className="border-red-500/30">
          <h2 className="text-red-500 font-semibold mb-4">Delete My Account</h2>
          <p className="text-zinc-400 mb-4">
            Warning: This action cannot be undone. All your data will be permanently deleted.
          </p>
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Delete Account
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;