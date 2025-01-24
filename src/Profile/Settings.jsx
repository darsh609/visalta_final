import React, { useState,useRef,useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera ,Eye, EyeOff  } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import toast from 'react-hot-toast';
import { updateDisplayPicture } from "../services/operations/SettingsAPI";
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
      p-4
      sm:p-6
      ${className}
    `}
  >
    {children}
  </motion.div>
);
const Settings = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const fileInputRef = useRef(null);


  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [profileImage, setProfileImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  // const [profileData, setProfileData] = useState({
  //   firstName: user?.firstName || "",
  //   lastName: user?.lastName || "",
  //   dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
  //   gender: user?.additionalDetails?.gender || "",
  //   contactNumber: user?.additionalDetails?.contactNumber || ""
  // });
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    hostel:""
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        dateOfBirth: user.additionalDetails?.dateOfBirth || "",
        gender: user.additionalDetails?.gender || "",
        contactNumber: user.additionalDetails?.contactNumber || "",
        hostel:user.additionalDetails?.hostel || ""
      });
    }
  }, [user]);

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: ''
  });

  // ... (previous handlers remain the same)



  const handleDeleteAccount = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/profile/deleteProfile`,
        config
      );
      
      if (response.data.success) {
        toast.success("Account deleted successfully");
        // Clear local storage
        localStorage.clear();
        // You might want to redirect to home page or login page
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error(error.response?.data?.message || "Failed to delete account");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };


  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };


  // const [passwords, setPasswords] = useState({
  //   currentPassword: '',
  //   newPassword: ''
  // });

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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
        setUploadSuccess(false);
      };
    }
  };

  const handleFileUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("displayPicture", imageFile);
      await dispatch(updateDisplayPicture(token, formData));
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        setImageFile(null);
      }, 2000);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
      toast.error("Failed to update profile picture");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleUpdateProfile = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      setLoading(true);
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/profile/updateProfile`,
        profileData,
        config
      );
      
      if (response.data.success) {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };
  // const handlePasswordChange = (e) => {
  //   const { name, value } = e.target;
  //   setPasswords(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };

  const handleUpdatePassword = async () => {
    try {
      // Validation
      if (!passwords.oldPassword || !passwords.newPassword) {
        toast.error("Please fill in both password fields");
        return;
      }

      const token = JSON.parse(localStorage.getItem("token"));
      
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      setPasswordLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/changepassword`,
        {
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword
        },
        config
      );
      
      if (response.data.success) {
        toast.success("Password updated successfully");
        // Clear password fields after successful update
        setPasswords({
          oldPassword: '',
          newPassword: ''
        });
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(error.response?.data?.message || "Failed to update password");
    } finally {
      setPasswordLoading(false);
    }
  };



  // const handleDeleteAccount = () => {
  //   console.log('Account deleted');
  //   setIsDeleteModalOpen(false);
  // };

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
    className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-3 sm:p-6"
  >
    <div className="container mx-auto max-w-3xl">
      <motion.h1 
        {...fadeInUp} 
        className="text-xl sm:text-2xl font-bold text-white mb-6"
      >
        Settings
      </motion.h1>

      {/* Profile Picture Section */}
      <Card>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg sm:text-xl text-[#1db954] font-semibold mb-4"
          >
            Change Profile Picture
          </motion.h2>
          <div className="flex flex-col items-center space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative group"
            >
              <div className="h-48 w-48 rounded-full bg-gradient-to-r from-[#1db954] to-[#1db954]/70 p-1.5">
                <div className="h-full w-full rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden relative">
                  <motion.img 
                    src={previewSource || user?.image} 
                    alt="Profile"
                    className="h-full w-full object-cover"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <AnimatePresence>
                    {!imageFile && (
                      <motion.label
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute bottom-4 right-4 p-3 rounded-full bg-[#1db954] cursor-pointer hover:bg-[#1db954]/80 transition-all shadow-lg"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                        />
                        <Camera size={24} className="text-white" />
                      </motion.label>
                    )}

                    {imageFile && !uploadSuccess && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleFileUpload}
                        disabled={loading}
                        className="absolute bottom-4 right-4 px-6 py-3 rounded-full text-sm bg-[#1db954] text-white font-medium shadow-lg hover:bg-[#1db954]/80 transition-all"
                      >
                        {loading ? "Uploading..." : "Upload"}
                      </motion.button>
                    )}

                    {uploadSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute bottom-4 right-4 px-6 py-3 rounded-full text-sm bg-[#1db954] text-white font-medium shadow-lg flex items-center gap-2"
                      >
                        {/* <Check size={20} /> */}
                        Uploaded
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </Card>

      {/* Profile Information Section */}
      <Card>
        <motion.h2 className="text-lg sm:text-xl text-[#1db954] font-semibold mb-4">
          Profile Information
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'First Name', name: 'firstName' },
            { label: 'Last Name', name: 'lastName' },
            { label: 'Hostel-Name', name: 'hostel' },
            { label: 'Date of Birth', name: 'dateOfBirth', type: 'date' },
            { label: 'Gender', name: 'gender', type: 'select', options: ['Male', 'Female', 'Other'] },
            { label: 'Contact Number', name: 'contactNumber', type: 'tel', colspan: true }
          ].map((field, index) => (
            <motion.div 
              key={field.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`space-y-1 ${field.colspan ? 'sm:col-span-2' : ''}`}
            >
              <label className="text-sm text-zinc-400">{field.label}</label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={profileData[field.name]}
                  onChange={handleProfileChange}
                  className="w-full bg-zinc-700/30 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1db954] appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '1.5em 1.5em'
                  }}
                >
                  <option value="" className="bg-zinc-800">Select {field.label}</option>
                  {field.options.map(option => (
                    <option key={option} value={option} className="bg-zinc-800">{option}</option>
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
        <motion.div className="mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
          <motion.button 
            whileHover={buttonHover}
            onClick={() => setProfileData({
              firstName: user?.firstName || "",
              lastName: user?.lastName || "",
              dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
              gender: user?.additionalDetails?.gender || "",
              contactNumber: user?.additionalDetails?.contactNumber || "",
              hostel:user?.additionalDetails?.hostel || ""
            })}
            className="w-full sm:w-auto px-4 py-2 bg-zinc-700/30 text-zinc-400 rounded-lg hover:bg-zinc-700/50"
            disabled={loading}
          >
            Cancel
          </motion.button>
          <motion.button 
            whileHover={buttonHover}
            onClick={handleUpdateProfile}
            className="w-full sm:w-auto px-4 py-2 bg-[#1db954] text-white rounded-lg hover:bg-[#1db954]/90"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </motion.button>
        </motion.div>
      </Card>

      {/* Password Section */}
      <Card>
        <motion.h2 
          {...fadeInUp}
          className="text-lg sm:text-xl text-[#1db954] font-semibold mb-4"
        >
          Change Password
        </motion.h2>
        <div className="space-y-4">
          {[
            { label: 'Current Password', name: 'oldPassword', show: showOldPassword, setShow: setShowOldPassword },
            { label: 'New Password', name: 'newPassword', show: showNewPassword, setShow: setShowNewPassword }
          ].map((field, index) => (
            <motion.div 
              key={field.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-1"
            >
              <label className="text-sm text-zinc-400">{field.label}</label>
              <div className="relative">
                <input
                  type={field.show ? "text" : "password"}
                  name={field.name}
                  value={passwords[field.name]}
                  onChange={handlePasswordChange}
                  className="w-full bg-zinc-700/30 text-white p-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1db954]"
                />
                <button
                  type="button"
                  onClick={() => field.setShow(!field.show)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white focus:outline-none"
                >
                  {field.show ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
          <motion.div 
            {...fadeInUp}
            className="mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3"
          >
            <motion.button 
              whileHover={buttonHover}
              onClick={() => setPasswords({ oldPassword: '', newPassword: '' })}
              className="w-full sm:w-auto px-4 py-2 bg-zinc-700/30 text-zinc-400 rounded-lg hover:bg-zinc-700/50"
              disabled={passwordLoading}
            >
              Cancel
            </motion.button>
            <motion.button 
              whileHover={buttonHover}
              onClick={handleUpdatePassword}
              className="w-full sm:w-auto px-4 py-2 bg-[#1db954] text-white rounded-lg hover:bg-[#1db954]/90"
              disabled={passwordLoading}
            >
              {passwordLoading ? "Updating..." : "Update Password"}
            </motion.button>
          </motion.div>
        </div>
      </Card>

      {/* Delete Account Section */}
      <Card className="border-red-500/30">
      <motion.h2 
        {...fadeInUp}
        className="text-lg sm:text-xl text-red-500 font-semibold mb-4"
      >
        Delete My Account
      </motion.h2>
      <motion.p 
        {...fadeInUp}
        className="text-sm sm:text-base text-zinc-400 mb-4"
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
          className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
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

<AnimatePresence>
      {isDeleteModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setIsDeleteModalOpen(false)}
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
              Are you sure you want to delete your account? This action cannot be undone. 
              This will permanently delete your account and remove your data from our servers.
            </p>
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-full sm:w-auto px-4 py-2 bg-zinc-700 text-white rounded-lg"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={handleDeleteAccount}
                className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Delete Account
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
  );
};

export default Settings;