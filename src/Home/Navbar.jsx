import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
// import { PiShoppingCart } from "react-icons/pi";

function Navbar() {
  const navigate=useNavigate();

  return (
    <nav className='Navbar fixed z-[10] w-full p-8 font-["Neue Montreal"] flex justify-between items-center'>
      
        <div className='logo'> xxxxxxxxx</div>

        <div className='links flex items-center  gap-4 ml-[60%] blur-none'>
            <div onClick={()=> navigate("insight")} className='text-lg capatalize font-light cursor-pointer'>Insight</div>
            <div onClick={()=> navigate("update")} className='text-lg capatalize font-light cursor-pointer'>Updates</div>
            <div onClick={()=> navigate("contact")} className='text-lg capatalize font-light cursor-pointer'>contact</div>
            <div onClick={()=> navigate("login")} className={`text-lg capatalize font-light cursor-pointer`}>Login</div>
            
            {/* mobile hamb burger menu section */}
                
        </div>
    </nav>
  )
}

export default Navbar