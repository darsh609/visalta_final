import React, { useState, useEffect } from 'react';
import food from '../datas/food.json';
import { Link, useNavigate } from 'react-router-dom';
import { Foodcompo } from './Foodcompo';

export const Food = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="text-center py-10">
        {/* EYE-CATCHING HEADER */}
        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 text-transparent bg-clip-text">
          Welcome to the Food Section
        </h1>
        <h2 className="text-xl mt-4">KAZIPET &mdash; WARANGAL</h2>
        <div
          onClick={() => navigate('/food/filters')}
          className="mt-8 cursor-pointer bg-red-500 px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-600 transition"
        >
          Explore with Filters
        </div>
      </div>
      <Foodcompo food={food} />
    </div>
  );
};
export default Food;