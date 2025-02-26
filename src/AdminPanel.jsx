


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  Eye, ChevronDown, ChevronUp, Clock, Calendar,
    Trash2, 
    
    Mail,
    Phone,
    Loader,
    Tag,
    Activity
 } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');
const TABS = ["User-Details","Contacts", "Requests", "Feedbacks",];
const BASE_URL = process.env.REACT_APP_BASE_URL;
const token = JSON.parse(localStorage.getItem("token"));

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("Contacts");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [expandedMessages, setExpandedMessages] = useState({});

  // States for Feedbacks
  const [feedbacks, setFeedbacks] = useState([]);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);
  const [confirmFeedbackModal, setConfirmFeedbackModal] = useState(false);

  // States for Requests
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);
  const [confirmRequestModal, setConfirmRequestModal] = useState(false);

  useEffect(() => {
    if (activeTab === "Contacts") {
      fetchContacts();
    } else if (activeTab === "Feedbacks") {
      fetchFeedbacks();
    } else if (activeTab === "Requests") {
      fetchRequests();
    }
  }, [activeTab]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/contact/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(response.data.data);
      toast.success("Contacts loaded successfully!");
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Failed to load contacts.");
    }
    setLoading(false);
  };

  const fetchFeedbacks = async () => {
    setLoadingFeedback(true);
    try {
      const response = await axios.get(`${BASE_URL}/feedback/getfeedback`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks(response.data);
      toast.success("Feedbacks loaded successfully!");
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      toast.error("Failed to load feedbacks.");
    }
    setLoadingFeedback(false);
  };

  const fetchRequests = async () => {
    setLoadingRequests(true);
    try {
      const response = await axios.get(`${BASE_URL}/requests/getrequest`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(response.data);
      toast.success("Requests loaded successfully!");
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load requests.");
    }
    setLoadingRequests(false);
  };

  const initiateDelete = (contact) => {
    setContactToDelete(contact);
    setConfirmModal(true);
  };

  const deleteContact = async () => {
    try {
      await axios.delete(`${BASE_URL}/contact/contact/${contactToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(contacts.filter((contact) => contact._id !== contactToDelete._id));
      toast.success("Contact deleted successfully!");
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact.");
    }
    setConfirmModal(false);
    setContactToDelete(null);
  };

  const initiateFeedbackDelete = (feedback) => {
    setFeedbackToDelete(feedback);
    setConfirmFeedbackModal(true);
  };

  const deleteFeedback = async () => {
    try {
      await axios.delete(`${BASE_URL}/feedback/feedback/${feedbackToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks(feedbacks.filter((fb) => fb._id !== feedbackToDelete._id));
      toast.success("Feedback deleted successfully!");
    } catch (error) {
      console.error("Error deleting feedback:", error);
      toast.error("Failed to delete feedback.");
    }
    setConfirmFeedbackModal(false);
    setFeedbackToDelete(null);
  };

  const initiateRequestDelete = (request) => {
    setRequestToDelete(request);
    setConfirmRequestModal(true);
  };

  const deleteRequest = async () => {
    try {
      await axios.delete(`${BASE_URL}/requests/request/${requestToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(requests.filter((req) => req._id !== requestToDelete._id));
      toast.success("Request deleted successfully!");
    } catch (error) {
      console.error("Error deleting request:", error);
      toast.error("Failed to delete request.");
    }
    setConfirmRequestModal(false);
    setRequestToDelete(null);
  };

  const openModal = (contact) => {
    setSelectedContact(contact);
    setModalOpen(true);
  };

  const toggleMessage = (contactId) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [contactId]: !prev[contactId],
    }));
  };

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };
  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'No date';
    return timeAgo.format(new Date(timestamp));
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'No date';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    setLoadingUsers(true);
    fetch(`${BASE_URL}/users/all`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
        } else {
          setUsers([]);
        }
        setLoadingUsers(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoadingUsers(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4 md:p-6">
      <Toaster position="top-center" />

   {/* Header */}
<motion.h1
  className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#49DE80] text-center mb-8 lg:mb-10 tracking-wider"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  Admin Dashboard
</motion.h1>

{/* Toggle Buttons */}
<div className="flex justify-center flex-wrap gap-4 lg:gap-6 mb-8 lg:mb-10 px-4">
  {TABS.map((tab) => (
    <motion.button
      key={tab}
      className={`px-5 lg:px-8 py-2.5 lg:py-3 text-base lg:text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
        activeTab === tab
          ? "bg-[#49DE80] text-black shadow-lg hover:bg-[#3acc6f]"
          : "bg-zinc-700/90 text-white hover:bg-zinc-600"
      }`}
      onClick={() => setActiveTab(tab)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {tab}
    </motion.button>
  ))}
</div>

{/* Content Section */}
<div className="flex flex-col items-center px-4 lg:px-6">
  {activeTab === "Contacts" && (
    <>
      {loading ? (
        <motion.div 
          className="flex items-center gap-3 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Loader className="w-5 h-5 animate-spin" />
          Loading contacts...
        </motion.div>
      ) : contacts.length > 0 ? (
        <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {contacts.map((contact) => (
            <motion.div
              key={contact._id}
              className="bg-zinc-800/90 p-5 lg:p-6 rounded-2xl flex flex-col gap-3 shadow-lg transition-all duration-300 hover:shadow-2xl hover:bg-zinc-800 hover:translate-y-[-4px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-xl font-bold text-[#49DE80] mb-1">
                    {contact.firstname} {contact.lastname}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    {formatTimeAgo(contact.createdAt)}
                  </div>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    className="bg-blue-500 hover:bg-blue-600 p-2.5 rounded-xl shadow-md transition-colors duration-200"
                    onClick={() => openModal(contact)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-5 h-5 text-white" />
                  </motion.button>
                  <motion.button
                    className="bg-red-500 hover:bg-red-600 p-2.5 rounded-xl shadow-md transition-colors duration-200"
                    onClick={() => initiateDelete(contact)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash2 className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-300 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {contact.email}
                </p>
                <p className="text-gray-300 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {contact.countrycode}{contact.phoneNo}
                </p>
              </div>
              <div className="text-base text-gray-400 mt-2">
                <p className="leading-relaxed">
                  {expandedMessages[contact._id]
                    ? contact.message
                    : truncateText(contact.message)}
                </p>
                {contact.message.length > 100 && (
                  <motion.button
                    onClick={() => toggleMessage(contact._id)}
                    className="text-[#49DE80] flex items-center gap-1.5 mt-2 hover:text-[#3acc6f] transition-colors duration-200"
                    whileHover={{ x: 3 }}
                  >
                    {expandedMessages[contact._id] ? (
                      <>
                        Show less <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Read more <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.p 
          className="text-gray-400 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No contacts found.
        </motion.p>
      )}
    </>
  )}

  {activeTab === "Feedbacks" && (
    <>
      {loadingFeedback ? (
        <motion.div 
          className="flex items-center gap-3 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Loader className="w-5 h-5 animate-spin" />
          Loading feedbacks...
        </motion.div>
      ) : feedbacks.length > 0 ? (
        <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {feedbacks.map((feedback) => (
            <motion.div
              key={feedback._id}
              className="bg-zinc-800/90 p-5 lg:p-6 rounded-2xl flex flex-col gap-3 shadow-lg transition-all duration-300 hover:shadow-2xl hover:bg-zinc-800 hover:translate-y-[-4px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-xl font-bold text-[#49DE80] mb-1">
                    {feedback.name}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    {formatTimeAgo(feedback.createdAt)}
                  </div>
                </div>
                <motion.button
                  className="bg-red-500 hover:bg-red-600 p-2.5 rounded-xl shadow-md transition-colors duration-200"
                  onClick={() => initiateFeedbackDelete(feedback)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </motion.button>
              </div>
              <div className="space-y-2">
                <p className="text-gray-300 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {feedback.email}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-zinc-700 rounded-lg text-gray-300 text-sm flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    {feedback.category}
                  </span>
                  <span className="px-3 py-1 bg-zinc-700 rounded-lg text-gray-300 text-sm flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Impact: {feedback.impactLevel}
                  </span>
                </div>
              </div>
              <div className="text-base text-gray-400 mt-2">
                <p className="font-medium text-[#49DE80] mb-1">Suggestion:</p>
                <p className="leading-relaxed">{feedback.suggestion}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.p 
          className="text-gray-400 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No feedbacks found.
        </motion.p>
      )}
    </>
  )}

  {activeTab === "Requests" && (
    <>
      {loadingRequests ? (
        <motion.div 
          className="flex items-center gap-3 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Loader className="w-5 h-5 animate-spin" />
          Loading requests...
        </motion.div>
      ) : requests.length > 0 ? (
        <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {requests.map((req) => (
            <motion.div
              key={req._id}
              className="bg-zinc-800/90 p-5 lg:p-6 rounded-2xl flex flex-col gap-3 shadow-lg transition-all duration-300 hover:shadow-2xl hover:bg-zinc-800 hover:translate-y-[-4px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-xl font-bold text-[#49DE80] mb-1">
                    {req.name}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    {formatTimeAgo(req.createdAt)}
                  </div>
                </div>
                <motion.button
                  className="bg-red-500 hover:bg-red-600 p-2.5 rounded-xl shadow-md transition-colors duration-200"
                  onClick={() => initiateRequestDelete(req)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </motion.button>
              </div>
              <div className="space-y-2">
                <p className="text-gray-300 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {req.email}
                </p>
                <p className="text-gray-300 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {req.phone}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.p 
          className="text-gray-400 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No requests found.
        </motion.p>
      )}
    </>
  )}
  {
    activeTab==="User-Details" && (
      <>
      {/* Display total number of users at the top */}
      <div className="mb-4">
        <p className="text-xl font-bold text-white">
          Total Users: {users.length}
        </p>
      </div>

      {loadingUsers ? (
        <motion.div 
          className="flex items-center gap-3 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Loader className="w-5 h-5 animate-spin" />
          Loading users...
        </motion.div>
      ) : users.length > 0 ? (
        <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {users.slice().reverse().map((user) => (
            <motion.div
              key={user._id}
              className="bg-zinc-800/90 p-5 lg:p-6 rounded-2xl flex flex-col gap-3 shadow-lg transition-all duration-300 hover:shadow-2xl hover:bg-zinc-800 hover:translate-y-[-4px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-xl font-bold text-[#49DE80] mb-1">
                    {user.name}
                  </p>
                  {user.createdAt && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      {formatTimeAgo(user.createdAt)}
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-300 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </p>
                <p className="text-gray-300 flex items-center gap-2">
                  <span className="w-4 h-4">👤</span>
                  {user.accountType}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.p 
          className="text-gray-400 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No users found.
        </motion.p>
      )}
    </>
    )
  }

</div>


      {/* Confirmation Modal for Contacts */}
      <AnimatePresence>
        {confirmModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-zinc-800 p-6 rounded-lg shadow-lg max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-xl font-bold text-[#49DE80] mb-4">
                Confirm Deletion
              </h2>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this contact? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <motion.button
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                  onClick={() => setConfirmModal(false)}
                  whileHover={{ scale: 1.05 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={deleteContact}
                  whileHover={{ scale: 1.05 }}
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal for Feedbacks */}
      <AnimatePresence>
        {confirmFeedbackModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-zinc-800 p-6 rounded-lg shadow-lg max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-xl font-bold text-[#49DE80] mb-4">
                Confirm Deletion
              </h2>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this feedback? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <motion.button
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                  onClick={() => setConfirmFeedbackModal(false)}
                  whileHover={{ scale: 1.05 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={deleteFeedback}
                  whileHover={{ scale: 1.05 }}
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal for Requests */}
      <AnimatePresence>
        {confirmRequestModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-zinc-800 p-6 rounded-lg shadow-lg max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-xl font-bold text-[#49DE80] mb-4">
                Confirm Deletion
              </h2>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this request? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <motion.button
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                  onClick={() => setConfirmRequestModal(false)}
                  whileHover={{ scale: 1.05 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={deleteRequest}
                  whileHover={{ scale: 1.05 }}
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Details Modal for Contacts */}
      <AnimatePresence>
        {modalOpen && selectedContact && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-zinc-800 p-6 rounded-lg shadow-lg max-w-lg w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold text-[#49DE80] mb-4">
                Contact Details
              </h2>
              <div className="space-y-3">
                <p className="text-gray-300">
                  <span className="font-semibold">Name:</span>{" "}
                  {selectedContact.firstname} {selectedContact.lastname}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold">Email:</span>{" "}
                  {selectedContact.email}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold">Phone:</span>{" "}
                  {selectedContact.countrycode}
                  {selectedContact.phoneNo}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold">Message:</span>{" "}
                  {selectedContact.message}
                </p>
              </div>
              <div className="flex justify-end mt-6">
                <motion.button
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                  onClick={() => setModalOpen(false)}
                  whileHover={{ scale: 1.05 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;

