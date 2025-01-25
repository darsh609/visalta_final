// import React, { useState , useRef,useEffect } from 'react';
// import { Heart, Package, Camera, LogOut, Settings } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// // import { useSelector } from 'react-redux';
// import { useDispatch, useSelector } from "react-redux"

// import { updateDisplayPicture } from "../services/operations/SettingsAPI"


// const Card = ({ children, className = '', delay = 0 }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ 
//       duration: 0.5,
//       delay,
//       ease: [0.4, 0, 0.2, 1]
//     }}
//     whileHover={{ 
//       scale: 1.02,
//       transition: { duration: 0.2 }
//     }}
//     className={`
//       bg-zinc-800/70 
//       backdrop-blur-xl 
//       border border-zinc-700/50 
//       rounded-xl 
//       shadow-[0_8px_32px_rgba(0,0,0,0.5)]
//       hover:shadow-[0_16px_48px_rgba(0,0,0,0.7)]
//       transition-all 
//       duration-300
//       ${className}
//     `}
//   >
//     {children}
//   </motion.div>
// );

// const LogoutModal = ({ isOpen, onClose, onLogout }) => {
//   if (!isOpen) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
//     >
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.9, opacity: 0 }}
//         className="bg-zinc-800 rounded-lg p-6 max-w-sm w-full"
//       >
//         <h2 className="text-xl font-semibold text-white mb-2">Confirm Logout</h2>
//         <p className="text-zinc-400 mb-6">Are you sure you want to logout?</p>
//         <div className="flex justify-end space-x-3">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={onClose}
//             className="px-4 py-2 rounded-lg bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
//           >
//             Cancel
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={onLogout}
//             className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
//           >
//             Logout
//           </motion.button>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// const ProfileComponent = () => {
//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)
//   const dispatch = useDispatch()

//   const [loading, setLoading] = useState(false)
//   const [imageFile, setImageFile] = useState(null)
//   const [previewSource, setPreviewSource] = useState(null)

//   const fileInputRef = useRef(null)

//   const handleClick = () => {
//     fileInputRef.current.click()
//   }


//   //////////

//   const navigate = useNavigate();



//   const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
//   const [profileImage, setProfileImage] = useState(null);
  
  
//   const profileData = {
//     firstName: user?.firstName,
//     lastName: user?.lastName,
//     email: user?.email,
//     phone: user?.additionalDetails.contactNumber
//   };

//   // const handleImageUpload = (e) => {
//   //   const file = e.target.files[0];
//   //   if (file) {
//   //     const reader = new FileReader();
//   //     reader.onloadend = () => {
//   //       setProfileImage(reader.result);
//   //     };
//   //     reader.readAsDataURL(file);
//   //   }
//   // };

//   const handleLogout = () => {
//     console.log('Logging out...');
//     setIsLogoutModalOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex justify-center">
//       <div className="w-full max-w-3xl px-4 py-8 flex flex-col">
//         <motion.h1 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-3xl font-bold text-white mb-8 text-center"
//         >
//           My Profile
//         </motion.h1>

//         <div className="flex-grow space-y-6">
//           {/* Personal Information Card */}
//           <Card delay={0.1}>
//             <div className="p-6">
//               <div className="mb-6">
//                 <h3 className="text-[#1db954] text-xl font-semibold">Personal Information</h3>
//               </div>

//               <div className="flex flex-col items-center mb-8">
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                   className="relative group"
//                 >
//                   <div className="h-32 w-32 rounded-full bg-gradient-to-r from-[#1db954] to-[#1db954]/70 p-1">
//                     <div className="h-full w-full rounded-full bg-zinc-800 flex items-center justify-center text-3xl font-bold text-white relative overflow-hidden">
//                       {/* {profileImage ? (
//                         <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
//                       ) : (
//                         'TP'
//                       )} */}
//                       <img src={user?.image} alt="Profile" className="h-full w-full object-cover" />
//                       <motion.label 
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         className="absolute right-1 bottom-1 p-2 rounded-full bg-[#1db954] cursor-pointer hover:bg-[#1db954]/80 transition-colors"
//                       >
//                         <input
//                           type="file"
//                           accept="image/*"
//                           className="hidden"
//                           ref={fileInputRef}
//                 onChange={handleFileChange}

//                           // onChange={handleImageUpload}
//                         />
//                         <Camera size={18} className="text-white" />
//                       </motion.label>
//                     </div>
//                   </div>
//                 </motion.div>
//               </div>

//               <div className="grid grid-cols-2 gap-6">
//                 {[
//                   { label: 'First Name', name: 'firstName' },
//                   { label: 'Last Name', name: 'lastName' },
//                   { label: 'Email', name: 'email' },
//                   { label: 'Phone', name: 'phone' }
//                 ].map((field, index) => (
//                   <motion.div 
//                     key={field.name}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.2 + index * 0.1 }}
//                     className="space-y-1"
//                   >
//                     <p className="text-sm text-zinc-500">{field.label}</p>
//                     <p className="text-white">{profileData[field.name] || 'Not set'}</p>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </Card>

//           {/* Overview Cards */}
//           <div className="space-y-4">
//             <motion.h3 
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.3 }}
//               className="text-[#1db954] text-lg font-semibold"
//             >
//               Overview
//             </motion.h3>
//             <div className="grid grid-cols-2 gap-4">
//               {/* Favorites Card */}
//               <Card delay={0.4}>
//                 <motion.button 
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="w-full p-4"
//                 >
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center space-x-3">
//                       <Heart size={24} className="text-[#1db954]" />
//                       <span className="text-zinc-400">Favorites</span>
//                     </div>
//                     <span className="text-white text-xl font-semibold">28</span>
//                   </div>
//                 </motion.button>
//               </Card>

//               {/* Products Card */}
//               <Card delay={0.5}>
//                 <motion.button 
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="w-full p-4"
//                 >
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center space-x-3">
//                       <Package size={24} className="text-[#1db954]" />
//                       <span className="text-zinc-400">Products</span>
//                     </div>
//                     <span className="text-white text-xl font-semibold">12</span>
//                   </div>
//                 </motion.button>
//               </Card>
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="space-y-4">
//             <motion.h3 
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.6 }}
//               className="text-[#1db954] text-lg font-semibold"
//             >
//               Quick Actions
//             </motion.h3>
//             <Card delay={0.7}>
//               <motion.button 
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => navigate("settings")} 
//                 className="w-full text-left p-4"
//               >
//                 <div className="flex items-center space-x-3">
//                   <Settings size={24} className="text-[#1db954]" />
//                   <div>
//                     <h4 className="text-white font-medium">Settings</h4>
//                     <p className="text-sm text-zinc-400">Manage your account settings</p>
//                   </div>
//                 </div>
//               </motion.button>
//             </Card>
//           </div>
//         </div>

//         {/* Logout Button */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.8 }}
//           className="mt-6"
//         >
//           <motion.button
//             whileHover={{ scale: 1.02, backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => setIsLogoutModalOpen(true)}
//             className="w-full p-3 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 flex items-center justify-center space-x-3"
//           >
//             <LogOut size={20} />
//             <span>Logout</span>
//           </motion.button>
//         </motion.div>

//         {/* Custom Logout Modal */}
//         <LogoutModal
//           isOpen={isLogoutModalOpen}
//           onClose={() => setIsLogoutModalOpen(false)}
//           onLogout={handleLogout}
//         />
//       </div>
//     </div>
//   );
// };

// export default ProfileComponent;



import React, { useState, useRef } from 'react';
import { Heart, Package, Camera, LogOut, Settings, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from "react-redux";
import { updateDisplayPicture } from "../services/operations/SettingsAPI";
import { logout } from "../services/operations/authAPI"

// Card component remains same
const Card = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.5,
      delay,
      ease: [0.4, 0, 0.2, 1]
    }}
    whileHover={{ 
      scale: 1.02,
      transition: { duration: 0.2 }
    }}
    className={`
      bg-zinc-800/70 
      backdrop-blur-xl 
      border border-zinc-700/50 
      rounded-xl 
      shadow-[0_8px_32px_rgba(0,0,0,0.5)]
      hover:shadow-[0_16px_48px_rgba(0,0,0,0.7)]
      transition-all 
      duration-300
      ${className}
    `}
  >
    {children}
  </motion.div>
);

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-zinc-800 rounded-lg p-6 max-w-sm w-full"
      >
        <h2 className="text-xl font-semibold text-white mb-2">Confirm Logout</h2>
        <p className="text-zinc-400 mb-6">Are you sure you want to logout?</p>
        <div className="flex justify-end space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};


const ProfileComponent = () => {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const profileData = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phone: user?.additionalDetails.contactNumber
  };

  const [loading, setLoading] = useState(false);
  const [secondaryLoading, setSecondaryLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [secondaryImageFile, setSecondaryImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [secondaryPreviewSource, setSecondaryPreviewSource] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const secondaryFileInputRef = useRef(null);

  const handleClick = (ref) => {
    ref.current.click();
  };

  //const fileInputRef = useRef(null);

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
  const previewFile = (file, setPreview) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
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
    } finally {
      setLoading(false);
    }
  };


  const handleLogout = () => {
    console.log('Logging out...');
    dispatch(logout(navigate))
    setIsLogoutModalOpen(false);
  };

    return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex justify-center">
      <div className="w-full max-w-3xl px-4 py-8 flex flex-col">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white mb-8 text-center"
        >
          My Profile
        </motion.h1>

        <div className="flex-grow space-y-6">
          {/* Personal Information Card */}
          <Card delay={0.1}>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-[#1db954] text-xl font-semibold">Personal Information</h3>
              </div>

              <div className="flex flex-col items-center mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative group"
                >
                  <div className="h-48 w-48 rounded-full bg-gradient-to-r from-[#1db954] to-[#1db954]/70 p-1.5">
                    <div className="h-full w-full rounded-full bg-zinc-800 flex items-center justify-center text-3xl font-bold text-white relative overflow-hidden shadow-2xl">
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
                            <Check size={20} />
                            Uploaded
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'First Name', name: 'firstName' },
                  { label: 'Last Name', name: 'lastName' },
                  { label: 'Email', name: 'email' },
                  { label: 'Phone', name: 'phone' }
                ].map((field, index) => (
                  <motion.div 
                    key={field.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="space-y-1"
                  >
                    <p className="text-sm text-zinc-500">{field.label}</p>
                    <p className="text-white">{profileData[field.name] || 'Not set'}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>

          {/* Overview Cards */}
          <div className="space-y-4">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[#1db954] text-lg font-semibold"
            >
              Overview
            </motion.h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Favorites Card */}
              <Card delay={0.4}>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <Heart size={24} className="text-[#1db954]" />
                      <span className="text-zinc-400">Liked Items</span>
                    </div>
                    <span className="text-white text-xl font-semibold">28</span>
                  </div>
                </motion.button>
              </Card>

              {/* Products Card */}
              <Card delay={0.5}>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <Package size={24} className="text-[#1db954]" />
                      <span className="text-zinc-400">Products</span>
                    </div>
                    <span className="text-white text-xl font-semibold">12</span>
                  </div>
                </motion.button>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="text-[#1db954] text-lg font-semibold"
            >
              Quick Actions
            </motion.h3>
            <Card delay={0.7}>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("settings")} 
                className="w-full text-left p-4"
              >
                <div className="flex items-center space-x-3">
                  <Settings size={24} className="text-[#1db954]" />
                  <div>
                    <h4 className="text-white font-medium">Settings</h4>
                    <p className="text-sm text-zinc-400">Manage your account settings</p>
                  </div>
                </div>
              </motion.button>
            </Card>
          </div>
        </div>

        {/* Logout Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6"
        >
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full p-3 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 flex items-center justify-center space-x-3"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </motion.button>
        </motion.div>

        {/* Custom Logout Modal */}
        <LogoutModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
};

export default ProfileComponent;
