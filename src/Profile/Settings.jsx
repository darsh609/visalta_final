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
      console.log("-------------->",token)
      
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
  
  const countryCodes = [
    { code: '+93', country: 'Afghanistan' },
    { code: '+355', country: 'Albania' },
    { code: '+213', country: 'Algeria' },
    { code: '+1-684', country: 'American Samoa' },
    { code: '+376', country: 'Andorra' },
    { code: '+244', country: 'Angola' },
    { code: '+1-264', country: 'Anguilla' },
    { code: '+1-268', country: 'Antigua and Barbuda' },
    { code: '+54', country: 'Argentina' },
    { code: '+374', country: 'Armenia' },
    { code: '+297', country: 'Aruba' },
    { code: '+61', country: 'Australia' },
    { code: '+43', country: 'Austria' },
    { code: '+994', country: 'Azerbaijan' },
    { code: '+1-242', country: 'Bahamas' },
    { code: '+973', country: 'Bahrain' },
    { code: '+880', country: 'Bangladesh' },
    { code: '+1-246', country: 'Barbados' },
    { code: '+375', country: 'Belarus' },
    { code: '+32', country: 'Belgium' },
    { code: '+501', country: 'Belize' },
    { code: '+229', country: 'Benin' },
    { code: '+1-441', country: 'Bermuda' },
    { code: '+975', country: 'Bhutan' },
    { code: '+591', country: 'Bolivia' },
    { code: '+387', country: 'Bosnia and Herzegovina' },
    { code: '+267', country: 'Botswana' },
    { code: '+55', country: 'Brazil' },
    { code: '+1-284', country: 'British Virgin Islands' },
    { code: '+673', country: 'Brunei' },
    { code: '+359', country: 'Bulgaria' },
    { code: '+226', country: 'Burkina Faso' },
    { code: '+257', country: 'Burundi' },
    { code: '+855', country: 'Cambodia' },
    { code: '+237', country: 'Cameroon' },
    { code: '+1', country: 'Canada' },
    { code: '+238', country: 'Cape Verde' },
    { code: '+1-345', country: 'Cayman Islands' },
    { code: '+236', country: 'Central African Republic' },
    { code: '+235', country: 'Chad' },
    { code: '+56', country: 'Chile' },
    { code: '+86', country: 'China' },
    { code: '+57', country: 'Colombia' },
    { code: '+269', country: 'Comoros' },
    { code: '+242', country: 'Congo (Republic)' },
    { code: '+243', country: 'Congo (Democratic Republic)' },
    { code: '+682', country: 'Cook Islands' },
    { code: '+506', country: 'Costa Rica' },
    { code: '+385', country: 'Croatia' },
    { code: '+53', country: 'Cuba' },
    { code: '+357', country: 'Cyprus' },
    { code: '+420', country: 'Czech Republic' },
    { code: '+45', country: 'Denmark' },
    { code: '+253', country: 'Djibouti' },
    { code: '+1-767', country: 'Dominica' },
    { code: '+1-809', country: 'Dominican Republic' },
    { code: '+670', country: 'East Timor (Timor-Leste)' },
    { code: '+593', country: 'Ecuador' },
    { code: '+20', country: 'Egypt' },
    { code: '+503', country: 'El Salvador' },
    { code: '+240', country: 'Equatorial Guinea' },
    { code: '+291', country: 'Eritrea' },
    { code: '+372', country: 'Estonia' },
    { code: '+251', country: 'Ethiopia' },
    { code: '+500', country: 'Falkland Islands' },
    { code: '+298', country: 'Faroe Islands' },
    { code: '+679', country: 'Fiji' },
    { code: '+358', country: 'Finland' },
    { code: '+33', country: 'France' },
    { code: '+594', country: 'French Guiana' },
    { code: '+689', country: 'French Polynesia' },
    { code: '+241', country: 'Gabon' },
    { code: '+220', country: 'The Gambia' },
    { code: '+995', country: 'Georgia' },
    { code: '+49', country: 'Germany' },
    { code: '+233', country: 'Ghana' },
    { code: '+350', country: 'Gibraltar' },
    { code: '+30', country: 'Greece' },
    { code: '+299', country: 'Greenland' },
    { code: '+1-473', country: 'Grenada' },
    { code: '+590', country: 'Guadeloupe' },
    { code: '+1-671', country: 'Guam' },
    { code: '+502', country: 'Guatemala' },
    { code: '+224', country: 'Guinea' },
    { code: '+245', country: 'Guinea-Bissau' },
    { code: '+592', country: 'Guyana' },
    { code: '+509', country: 'Haiti' },
    { code: '+504', country: 'Honduras' },
    { code: '+852', country: 'Hong Kong' },
    { code: '+36', country: 'Hungary' },
    { code: '+354', country: 'Iceland' },
    { code: '+91', country: 'India' },
    { code: '+62', country: 'Indonesia' },
    { code: '+98', country: 'Iran' },
    { code: '+964', country: 'Iraq' },
    { code: '+353', country: 'Ireland' },
    { code: '+972', country: 'Israel' },
    { code: '+39', country: 'Italy' },
    { code: '+1-876', country: 'Jamaica' },
    { code: '+81', country: 'Japan' },
    { code: '+962', country: 'Jordan' },
    { code: '+7', country: 'Kazakhstan' },
    { code: '+254', country: 'Kenya' },
    { code: '+686', country: 'Kiribati' },
    { code: '+383', country: 'Kosovo' },
    { code: '+965', country: 'Kuwait' },
    { code: '+996', country: 'Kyrgyzstan' },
    { code: '+856', country: 'Laos' },
    { code: '+371', country: 'Latvia' },
    { code: '+961', country: 'Lebanon' },
    { code: '+266', country: 'Lesotho' },
    { code: '+231', country: 'Liberia' },
    { code: '+218', country: 'Libya' },
    { code: '+423', country: 'Liechtenstein' },
    { code: '+370', country: 'Lithuania' },
    { code: '+352', country: 'Luxembourg' },
    { code: '+853', country: 'Macau' },
    { code: '+261', country: 'Madagascar' },
    { code: '+265', country: 'Malawi' },
    { code: '+60', country: 'Malaysia' },
    { code: '+960', country: 'Maldives' },
    { code: '+223', country: 'Mali' },
    { code: '+356', country: 'Malta' },
    { code: '+692', country: 'Marshall Islands' },
    { code: '+596', country: 'Martinique' },
    { code: '+222', country: 'Mauritania' },
    { code: '+230', country: 'Mauritius' },
    { code: '+262', country: 'Mayotte' },
    { code: '+52', country: 'Mexico' },
    { code: '+691', country: 'Micronesia' },
    { code: '+373', country: 'Moldova' },
    { code: '+377', country: 'Monaco' },
    { code: '+976', country: 'Mongolia' },
    { code: '+382', country: 'Montenegro' },
    { code: '+1-664', country: 'Montserrat' },
    { code: '+212', country: 'Morocco' },
    { code: '+258', country: 'Mozambique' },
    { code: '+95', country: 'Myanmar' },
    { code: '+264', country: 'Namibia' },
    { code: '+674', country: 'Nauru' },
    { code: '+977', country: 'Nepal' },
    { code: '+31', country: 'Netherlands' },
    { code: '+64', country: 'New Zealand' },
    { code: '+505', country: 'Nicaragua' },
    { code: '+227', country: 'Niger' },
    { code: '+234', country: 'Nigeria' },
    { code: '+683', country: 'Niue' },
    { code: '+672', country: 'Norfolk Island' },
    { code: '+850', country: 'North Korea' },
    { code: '+389', country: 'North Macedonia' },
    { code: '+1-670', country: 'Northern Mariana Islands' },
    { code: '+47', country: 'Norway' },
    { code: '+968', country: 'Oman' },
    { code: '+92', country: 'Pakistan' },
    { code: '+680', country: 'Palau' },
    { code: '+970', country: 'Palestine' },
    { code: '+507', country: 'Panama' },
    { code: '+675', country: 'Papua New Guinea' },
    { code: '+595', country: 'Paraguay' },
    { code: '+51', country: 'Peru' },
    { code: '+63', country: 'Philippines' },
    { code: '+48', country: 'Poland' },
    { code: '+351', country: 'Portugal' },
    { code: '+1-787', country: 'Puerto Rico' },
    { code: '+974', country: 'Qatar' },
    { code: '+262', country: 'Réunion' },
    { code: '+40', country: 'Romania' },
    { code: '+7', country: 'Russia' },
    { code: '+250', country: 'Rwanda' },
    { code: '+1-869', country: 'Saint Kitts and Nevis' },
    { code: '+1-758', country: 'Saint Lucia' },
    { code: '+1-784', country: 'Saint Vincent and the Grenadines' },
    { code: '+685', country: 'Samoa' },
    { code: '+378', country: 'San Marino' },
    { code: '+239', country: 'Sao Tome and Principe' },
    { code: '+966', country: 'Saudi Arabia' },
    { code: '+221', country: 'Senegal' },
    { code: '+381', country: 'Serbia' },
    { code: '+248', country: 'Seychelles' },
    { code: '+232', country: 'Sierra Leone' },
    { code: '+65', country: 'Singapore' },
    { code: '+421', country: 'Slovakia' },
    { code: '+386', country: 'Slovenia' },
    { code: '+677', country: 'Solomon Islands' },
    { code: '+252', country: 'Somalia' },
    { code: '+27', country: 'South Africa' },
    { code: '+82', country: 'South Korea' },
    { code: '+211', country: 'South Sudan' },
    { code: '+34', country: 'Spain' },
    { code: '+94', country: 'Sri Lanka' },
    { code: '+249', country: 'Sudan' },
    { code: '+597', country: 'Suriname' },
    { code: '+46', country: 'Sweden' },
    { code: '+41', country: 'Switzerland' },
    { code: '+963', country: 'Syria' },
    { code: '+886', country: 'Taiwan' },
    { code: '+992', country: 'Tajikistan' },
    { code: '+255', country: 'Tanzania' },
    { code: '+66', country: 'Thailand' },
    { code: '+228', country: 'Togo' },
    { code: '+690', country: 'Tokelau' },
    { code: '+676', country: 'Tonga' },
    { code: '+1-868', country: 'Trinidad and Tobago' },
    { code: '+216', country: 'Tunisia' },
    { code: '+90', country: 'Turkey' },
    { code: '+993', country: 'Turkmenistan' },
    { code: '+688', country: 'Tuvalu' },
    { code: '+256', country: 'Uganda' },
    { code: '+380', country: 'Ukraine' },
    { code: '+971', country: 'United Arab Emirates' },
    { code: '+44', country: 'United Kingdom' },
    { code: '+1', country: 'United States' },
    { code: '+598', country: 'Uruguay' },
    { code: '+998', country: 'Uzbekistan' },
    { code: '+678', country: 'Vanuatu' },
    { code: '+379', country: 'Vatican City' },
    { code: '+58', country: 'Venezuela' },
    { code: '+84', country: 'Vietnam' },
    { code: '+1-340', country: 'U.S. Virgin Islands' },
    { code: '+681', country: 'Wallis and Futuna' },
    { code: '+967', country: 'Yemen' },
    { code: '+260', country: 'Zambia' },
    { code: '+263', country: 'Zimbabwe' }
  ];
  
  return (
<motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-3 sm:p-6 md:p-8 lg:p-10"
  >
    <div className="container mx-auto max-w-3xl">
      <motion.h1 
        {...fadeInUp} 
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 md:mb-8"
      >
        Settings
      </motion.h1>

      {/* Profile Picture Section */}
      <Card>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg sm:text-xl md:text-2xl text-[#1db954] font-semibold mb-2 sm:mb-3 md:mb-4"
          >
            Change Profile Picture
          </motion.h2>
          <div className="flex flex-col items-center space-y-2 sm:space-y-3 md:space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative group"
            >
              <div className="h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 rounded-full bg-gradient-to-r from-[#1db954] to-[#1db954]/70 p-1 sm:p-1.5">
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
                        className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 p-2 sm:p-2.5 md:p-3 rounded-full bg-[#1db954] cursor-pointer hover:bg-[#1db954]/80 transition-all shadow-lg"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                        />
                        <Camera size={20} className="text-white sm:h-5 sm:w-5 md:h-6 md:w-6" />
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
                        className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full text-xs sm:text-sm bg-[#1db954] text-white font-medium shadow-lg hover:bg-[#1db954]/80 transition-all"
                      >
                        {loading ? "Uploading..." : "Upload"}
                      </motion.button>
                    )}

                    {uploadSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full text-xs sm:text-sm bg-[#1db954] text-white font-medium shadow-lg flex items-center gap-1 sm:gap-2"
                      >
                        {/* <Check size={16} className="sm:h-5 sm:w-5 md:h-6 md:w-6" /> */}
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
        <motion.h2 className="text-lg sm:text-xl md:text-2xl text-[#1db954] font-semibold mb-2 sm:mb-3 md:mb-4">
          Profile Information
        </motion.h2>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
  {[
    { label: 'First Name', name: 'firstName' },
    { label: 'Last Name', name: 'lastName' },
    { 
      label: 'Hostel-Name', 
      name: 'hostel',
      type: 'select',
      options: [
        'Azad Hall (Ist Block)', 'Bose Hall (2nd Block)', 'Ambedkar Hall (3rd Block)', 'Babha Hall (4th Block)', 
        'Gandhi Hall (5th Block)', 'Gokhale Hall (5th Block)', 'Radhakrishnan Hall (6th Block)', 'Raman Hall (7th Block)', 
        'Nehru Hall (8th Block)', 'Patel Hall (9th Block)', 'Tagore Hall (10th Block)', 'Viswesvraya Hall (11th Block)', 
        'Rajendra Prasad Hall (12th Block)', 'Vikram Sarabhai Hall (14th Block)', '1K Hall of Residence (1K)', 
        '1.8K Ultra Mega Hostel (1.8K)', 'International Students Hall (ISH)', 'Priyadarshini Hall', 'Sarojini Hall', 
        'NEW LADIES HOSTEL-A', 'NEW LADIES HOSTEL-B', 'NEW LADIES HOSTEL-C', 'Nearby Kazipet', 'Nearby Hanamkonda', 'Other'
      ]
    },
    { label: 'Date of Birth', name: 'dateOfBirth', type: 'date' },
    { label: 'Gender', name: 'gender', type: 'select', options: ['Male', 'Female', 'Other'] },
    { label: 'Contact Number', name: 'contactNumber', type: 'tel', colspan: true }
  ].map((field, index) => (
    <motion.div 
      key={field.name}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`space-y-0.5 sm:space-y-1 md:space-y-1.5 ${field.colspan ? 'sm:col-span-2' : ''}`}
    >
      <label className="text-xs sm:text-sm md:text-base text-zinc-400">{field.label}</label>
      {field.type === 'select' ? (
        <select
          name={field.name}
          value={profileData[field.name]}
          onChange={handleProfileChange}
          className="w-full bg-zinc-700/30 text-white text-sm sm:text-base p-1.5 sm:p-2 md:p-2.5 rounded-lg focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-[#1db954] appearance-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.5rem center',
            backgroundSize: '1.25em 1.25em sm:1.5em 1.5em'
          }}
        >
          <option value="" className="bg-zinc-800">Select {field.label}</option>
          {field.options.map(option => (
            <option key={option} value={option} className="bg-zinc-800">{option}</option>
          ))}
        </select>
      ) : field.name === 'contactNumber' ? (
        <input
          type="tel"
          name="contactNumber"
          value={profileData.contactNumber || '+91'}
          onChange={(e) => {
            let val = e.target.value;
            // If the input doesn't start with a plus sign, prepend "+91"
            if (val[0] !== '+') {
              val = '+' + val;
            }
            handleProfileChange({ target: { name: 'contactNumber', value: val } });
          }}
          className="w-full bg-zinc-700/30 text-white text-sm sm:text-base p-1.5 sm:p-2 md:p-2.5 rounded-lg focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-[#1db954]"
        />
      ) : (
        <input
          type={field.type || 'text'}
          name={field.name}
          value={profileData[field.name]}
          onChange={handleProfileChange}
          className="w-full bg-zinc-700/30 text-white text-sm sm:text-base p-1.5 sm:p-2 md:p-2.5 rounded-lg focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-[#1db954]"
        />
      )}
    </motion.div>
  ))}
</div>

        <motion.div className="mt-4 sm:mt-5 md:mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-3">
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
            className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-zinc-700/30 text-zinc-400 text-sm sm:text-base rounded-lg hover:bg-zinc-700/50"
            disabled={loading}
          >
            Cancel
          </motion.button>
          <motion.button 
            whileHover={buttonHover}
            onClick={handleUpdateProfile}
            className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-[#1db954] text-white text-sm sm:text-base rounded-lg hover:bg-[#1db954]/90"
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
          className="text-lg sm:text-xl md:text-2xl text-[#1db954] font-semibold mb-2 sm:mb-3 md:mb-4"
        >
          Change Password
        </motion.h2>
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          {[
            { label: 'Current Password', name: 'oldPassword', show: showOldPassword, setShow: setShowOldPassword },
            { label: 'New Password', name: 'newPassword', show: showNewPassword, setShow: setShowNewPassword }
          ].map((field, index) => (
            <motion.div 
              key={field.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-0.5 sm:space-y-1 md:space-y-1.5"
            >
              <label className="text-xs sm:text-sm md:text-base text-zinc-400">{field.label}</label>
              <div className="relative">
                <input
                  type={field.show ? "text" : "password"}
                  name={field.name}
                  value={passwords[field.name]}
                  onChange={handlePasswordChange}
                  className="w-full bg-zinc-700/30 text-white text-sm sm:text-base p-1.5 sm:p-2 md:p-2.5 pr-8 sm:pr-10 rounded-lg focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-[#1db954]"
                />
                <button
                  type="button"
                  onClick={() => field.setShow(!field.show)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white focus:outline-none"
                >
                  {field.show ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
          <motion.div 
            {...fadeInUp}
            className="mt-4 sm:mt-5 md:mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-3"
          >
            <motion.button 
              whileHover={buttonHover}
              onClick={() => setPasswords({ oldPassword: '', newPassword: '' })}
              className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-zinc-700/30 text-zinc-400 text-sm sm:text-base rounded-lg hover:bg-zinc-700/50"
              disabled={passwordLoading}
            >
              Cancel
            </motion.button>
            <motion.button 
              whileHover={buttonHover}
              onClick={handleUpdatePassword}
              className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-[#1db954] text-white text-sm sm:text-base rounded-lg hover:bg-[#1db954]/90"
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
        className="text-lg sm:text-xl md:text-2xl text-red-500 font-semibold mb-2 sm:mb-3 md:mb-4"
      >
        Delete My Account
      </motion.h2>
      <motion.p 
        {...fadeInUp}
        className="text-xs sm:text-sm md:text-base text-zinc-400 mb-2 sm:mb-3 md:mb-4"
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
          className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500 text-white text-sm sm:text-base rounded-lg hover:bg-red-600"
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
            className="bg-zinc-800 p-4 sm:p-5 md:p-6 rounded-lg max-w-xs sm:max-w-sm md:max-w-md w-full mx-3 sm:mx-4"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-1 sm:mb-1.5 md:mb-2">Delete Account</h2>
            <p className="text-xs sm:text-sm md:text-base text-zinc-300 mb-4 sm:mb-5 md:mb-6">
              Are you sure you want to delete your account? This action cannot be undone. 
              This will permanently delete your account and remove your data from our servers.
            </p>
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-zinc-700 text-white text-sm sm:text-base rounded-lg"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={handleDeleteAccount}
                className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500 text-white text-sm sm:text-base rounded-lg"
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