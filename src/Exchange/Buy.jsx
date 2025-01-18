import React from "react";
import { motion } from "framer-motion";

const BuyPage = () => {
  const categories = ["Books", "Electronics", "Stationery", "Furniture", "Miscellaneous"];
  const items = [
    { id: 1, name: "Mathematics Book", price: "₹500", category: "Books", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Laptop", price: "₹45,000", category: "Electronics", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Study Table", price: "₹2,500", category: "Furniture", image: "https://via.placeholder.com/150" },
    { id: 4, name: "Notebook Pack", price: "₹200", category: "Stationery", image: "https://via.placeholder.com/150" },
    { id: 5, name: "Graphing Calculator", price: "₹1,200", category: "Electronics", image: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <header className="py-10 text-center">
        <motion.h1
          className="text-4xl font-bold text-yellow-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to the Student Marketplace
        </motion.h1>
        <motion.p
          className="text-gray-300 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Buy and sell items from fellow students!
        </motion.p>
        <motion.button
          className="mt-6 bg-yellow-400 text-gray-900 px-6 py-2 rounded-md font-semibold hover:bg-yellow-500 transition duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Start Shopping
        </motion.button>
      </header>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mt-10">
        <motion.input
          type="text"
          placeholder="Search for items..."
          className="w-full px-4 py-2 rounded-md text-gray-900"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        />
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto mt-10 px-4">
        <h2 className="text-2xl font-semibold text-yellow-400">Categories</h2>
        <div className="flex flex-wrap gap-4 mt-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-4 rounded-md text-center cursor-pointer hover:bg-gray-700 transition duration-300"
              whileHover={{ scale: 1.1 }}
            >
              {category}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto mt-10 px-4">
        <h2 className="text-2xl font-semibold text-yellow-400">Available Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              className="bg-gray-800 rounded-md overflow-hidden shadow-lg hover:shadow-yellow-400 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-yellow-400">{item.name}</h3>
                <p className="text-gray-300">{item.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-10 text-center border-t border-gray-700">
        <p className="text-sm text-gray-400">
          &copy; 2025 Student Marketplace. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default BuyPage;
