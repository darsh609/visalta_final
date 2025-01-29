// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Menu } from 'lucide-react';

// const Rough = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   return (
//     <div className="relative">
//       {/* Navbar */}
//       <div className="flex justify-between items-center p-4 bg-transparent text-black">
//         <h1 className="text-2xl font-bold">Navbar</h1>
//         <button
//           onClick={toggleMenu}
//           className="block lg:hidden focus:outline-none focus:ring-2 focus:ring-gray-500"
//         >
//           <Menu size={28} />
//         </button>
//         <nav className={`hidden lg:flex space-x-8 text-lg font-medium`}>
//           {['Home', 'Event', 'Proshow', 'Gallery', 'Team', 'FAQ'].map((item) => (
//             <motion.a
//               href={`#${item.toLowerCase()}`}
//               key={item}
//               whileHover={{
//                 scale: 1.1,
//                 textShadow: "0px 0px 8px rgba(255, 215, 0, 1)",
//                 color: '#FFD700',
//               }}
//               className="hover:text-yellow-400 cursor-pointer transition-all duration-300"
//             >
//               {item}
//             </motion.a>
//           ))}
//         </nav>
//       </div>

//       {/* Mobile Menu */}
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -50 }}
//         className={`${menuOpen ? 'block' : 'hidden'} lg:hidden absolute top-16 left-0 w-full bg-black bg-opacity-70 text-black text-lg font-medium`}
//       >
//         <ul className="flex flex-col space-y-4 p-4">
//           {['Home', 'Event', 'Proshow', 'Gallery', 'Team', 'FAQ'].map((item) => (
//             <motion.li
//               key={item}
//               whileHover={{
//                 scale: 1.1,
//                 textShadow: "0px 0px 8px rgba(255, 215, 0, 1)",
//                 color: '#FFD700',
//               }}
//               className="hover:text-yellow-400 cursor-pointer transition-all duration-300"
//             >
//               <a href={`#${item.toLowerCase()}`}>{item}</a>
//             </motion.li>
//           ))}
//         </ul>
//       </motion.div>
//     </div>
//   );
// };

// export default Rough;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

const Rough = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="absolute top-0 left-0 w-full z-50">
      {/* Navbar */}
      <div className="flex justify-between items-center p-4 bg-transparent text-black">
        <h1 className="text-3xl font-extrabold tracking-wide">Navbar</h1>
        <button
          onClick={toggleMenu}
          className="focus:outline-none focus:ring-2 focus:ring-gray-500 lg:hidden"
        >
          <Menu size={32} />
        </button>
        <motion.nav
          className={`hidden lg:flex items-center space-x-8 text-lg font-semibold`}
        >
          {['Home', 'Event', 'Proshow', 'Gallery', 'Team', 'FAQ'].map((item) => (
            <motion.a
              href={`#${item.toLowerCase()}`}
              key={item}
              whileHover={{
                scale: 1.2,
                textShadow: "0px 0px 8px rgba(0, 0, 0, 0.7)",
                color: '#FFD700',
              }}
              className="hover:text-yellow-500 cursor-pointer transition-all duration-300 uppercase"
            >
              {item}
            </motion.a>
          ))}
        </motion.nav>
      </div>

      {/* Menu for all screen sizes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: menuOpen ? 1 : 0, scale: menuOpen ? 1 : 0.95 }}
        className={`${menuOpen ? 'flex' : 'hidden'} flex-col lg:flex-row lg:justify-center lg:items-center lg:space-x-8 absolute lg:static top-16 left-0 w-full lg:w-auto bg-black lg:bg-transparent bg-opacity-90 text-white lg:text-black text-lg font-semibold p-4 lg:p-0`}
      >
        {['Home', 'Event', 'Proshow', 'Gallery', 'Team', 'FAQ'].map((item) => (
          <motion.a
            href={`#${item.toLowerCase()}`}
            key={item}
            whileHover={{
              scale: 1.2,
              textShadow: "0px 0px 8px rgba(0, 0, 0, 0.7)",
              color: '#FFD700',
            }}
            className="hover:text-yellow-500 cursor-pointer transition-all duration-300 uppercase mb-4 lg:mb-0"
          >
            {item}
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default Rough;
