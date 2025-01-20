import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera } from 'lucide-react';

// Custom Modal Component
const Modal = ({ isOpen, onClose, onConfirm }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-zinc-800 p-6 rounded-lg max-w-md w-full mx-4"
        >
          <h2 className="text-xl font-semibold text-white mb-2">Delete Account</h2>
          <p className="text-zinc-300 mb-6">
            Are you sure you want to delete your account? This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </p>
          <div className="flex justify-end space-x-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={onClose}
              className="px-4 py-2 bg-zinc-700 text-white rounded-lg"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Delete Account
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Card = ({ children, className = '' }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`
      bg-zinc-800/70 
      backdrop-blur-xl 
      border border-zinc-700/50 
      rounded-xl 
      shadow-[0_8px_32px_rgba(0,0,0,0.5)]
      mb-6
      p-6
      ${className}
    `}
  >
    {children}
  </motion.div>
);

const Settings = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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

  const handleDeleteAccount = () => {
    console.log('Account deleted');
    setIsDeleteModalOpen(false);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };

  const buttonHover = {
    scale: 1.02,
    transition: { duration: 0.2 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-6"
    >
      <div className="container mx-auto max-w-3xl">
        <motion.h1 
          {...fadeInUp} 
          className="text-2xl font-bold text-white mb-6"
        >
          Settings
        </motion.h1>

        {/* Profile Picture Section */}
        <Card>
          <motion.h2 
            {...fadeInUp} 
            className="text-[#1db954] font-semibold mb-4"
          >
            Change Profile Picture
          </motion.h2>
          <div className="flex flex-col items-center space-y-4">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-[#1db954] to-[#1db954]/70 p-1">
                <div className="h-full w-full rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
                  {(selectedImage || profileImage) ? (
                    <motion.img 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      src={selectedImage || profileImage} 
                      alt="Profile" 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Camera className="text-white h-8 w-8" />
                  )}
                </div>
              </div>
            </motion.div>
            <div className="flex space-x-3">
              <motion.label 
                whileHover={buttonHover}
                className="px-4 py-2 bg-zinc-700/30 text-white rounded-lg cursor-pointer hover:bg-zinc-700/50 transition-colors"
              >
                Select
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
              </motion.label>
              <motion.button
                whileHover={buttonHover}
                onClick={handleImageUpload}
                className="px-4 py-2 bg-[#1db954] text-white rounded-lg hover:bg-[#1db954]/90 transition-colors"
              >
                Upload
              </motion.button>
            </div>
          </div>
        </Card>

        {/* Profile Information Section */}
        <Card>
          <motion.h2 
            {...fadeInUp}
            className="text-[#1db954] font-semibold mb-4"
          >
            Profile Information
          </motion.h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'First Name', name: 'firstName' },
              { label: 'Last Name', name: 'lastName' },
              { label: 'Date of Birth', name: 'dateOfBirth', type: 'date' },
              { label: 'Gender', name: 'gender', type: 'select', options: ['Male', 'Female', 'Other'] },
              { label: 'Contact Number', name: 'contactNumber', type: 'tel', colspan: true }
            ].map((field, index) => (
              <motion.div 
                key={field.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`space-y-1 ${field.colspan ? 'col-span-2' : ''}`}
              >
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
              </motion.div>
            ))}
          </div>
          <motion.div 
            {...fadeInUp}
            className="mt-6 flex justify-end space-x-3"
          >
            <motion.button 
              whileHover={buttonHover}
              className="px-4 py-2 bg-zinc-700/30 text-zinc-400 rounded-lg hover:bg-zinc-700/50"
            >
              Cancel
            </motion.button>
            <motion.button 
              whileHover={buttonHover}
              className="px-4 py-2 bg-[#1db954] text-white rounded-lg hover:bg-[#1db954]/90"
            >
              Save Changes
            </motion.button>
          </motion.div>
        </Card>

        {/* Password Section */}
        <Card>
          <motion.h2 
            {...fadeInUp}
            className="text-[#1db954] font-semibold mb-4"
          >
            Change Password
          </motion.h2>
          <div className="space-y-4">
            {[
              { label: 'Current Password', name: 'currentPassword' },
              { label: 'New Password', name: 'newPassword' }
            ].map((field, index) => (
              <motion.div 
                key={field.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-1"
              >
                <label className="text-sm text-zinc-400">{field.label}</label>
                <input
                  type="password"
                  name={field.name}
                  value={passwords[field.name]}
                  onChange={handlePasswordChange}
                  className="w-full bg-zinc-700/30 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1db954]"
                />
              </motion.div>
            ))}
            <motion.div 
              {...fadeInUp}
              className="mt-6 flex justify-end space-x-3"
            >
              <motion.button 
                whileHover={buttonHover}
                className="px-4 py-2 bg-zinc-700/30 text-zinc-400 rounded-lg hover:bg-zinc-700/50"
              >
                Cancel
              </motion.button>
              <motion.button 
                whileHover={buttonHover}
                className="px-4 py-2 bg-[#1db954] text-white rounded-lg hover:bg-[#1db954]/90"
              >
                Update Password
              </motion.button>
            </motion.div>
          </div>
        </Card>

        {/* Delete Account Section */}
        <Card className="border-red-500/30">
          <motion.h2 
            {...fadeInUp}
            className="text-red-500 font-semibold mb-4"
          >
            Delete My Account
          </motion.h2>
          <motion.p 
            {...fadeInUp}
            className="text-zinc-400 mb-4"
          >
            Warning: This action cannot be undone. All your data will be permanently deleted.
          </motion.p>
          <motion.div 
            {...fadeInUp}
            className="flex justify-end"
          >
            <motion.button 
              whileHover={buttonHover}
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete Account
            </motion.button>
          </motion.div>
        </Card>
      </div>

      <Modal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </motion.div>
  );
};

export default Settings;