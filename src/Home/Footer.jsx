// // import React from "react";
// // import { FaArrowUpLong } from "react-icons/fa6";

// // const Footer = () => {
// //  return (
// //    <footer className="bg-[#D2D2D2] text-gray-800 py-10 space-y-44">
// //      <div className="max-w-6xl mx-auto">
// //        <div className="flex justify-between">
// //          {/* Left Section: Social Links */}
// //          <div className="space-y-6">
// //            <h2 className="text-sm font-light tracking-tighter">JOIN OUR SOCIALS</h2>
// //            <div className=" text-3xl">
// //              <div>Instagram</div>
// //              <div>Facebook</div>
// //              <div>LinkedIn</div>
// //            </div>
// //          </div>

// //          {/* Right Section: Contact and Form */}
// //          <div className="space-y-12">
// //            <div className="space-y-6">
// //              <div className="text-sm font-light tracking-tighter">MONDAY–FRIDAY, 9AM–6PM</div>
// //              <div className="text-3xl">visalta@gmail.com</div>
// //            </div>

// //            <div className="space-y-7">
// //              <div className="text-sm font-light uppercase tracking-tighter">We respond within a few hours</div>
             
// //              <div className="text-3xl flex gap-2">
// //                <span>827</span>
// //                <span>346</span>
// //                <span>3662</span>
// //              </div>
// //              <div className="text-sm font-light tracking-tighter flex flex-col">
// //                <span>NIT Warangal,</span>
// //                <span>1K Hostel,</span> 
// //                <span>Telangana 506004</span>
// //              </div>
// //            </div>
// //          </div>
// //        </div>
// //      </div>
// //      <div className="flex justify-between max-w-6xl mx-auto">
// //        <form className="space-y-4">
// //          <div className="text-3xl flex flex-col">
// //            <span className="relative">
// //              <span>Leave a request and</span>
// //            </span>
// //            <span className="relative">
// //              <span>we'll call you.</span>
// //            </span>
// //          </div>
// //          <div className="flex">
// //            <div className="flex justify-between gap-56">
// //              <div className="flex flex-col w-full">
// //                <label className="text-sm font-md text-black mb-2">
// //                  FULL NAME
// //                </label>
// //                <input
// //                  type="text"
// //                  placeholder="Name"
// //                  className="
// //                    w-full 
// //                    border-b 
// //                    border-gray-400 
// //                    text-sm 
// //                    uppercase 
// //                    py-2 
// //                    px-0 
// //                    focus:outline-none 
// //                    focus:border-black
// //                    bg-transparent
// //                  "
// //                />
// //              </div>
// //              <div className="flex flex-col w-full">
// //                <label className="text-sm font-md text-black mb-2">
// //                  PHONE NUMBER
// //                </label>
// //                <input
// //                  type="text"
// //                  placeholder="Phone"
// //                  className="
// //                    w-full 
// //                    border-b 
// //                    border-gray-400 
// //                    text-sm 
// //                    uppercase 
// //                    py-2 
// //                    px-0 
// //                    focus:outline-none 
// //                    focus:border-black
// //                    bg-transparent
// //                  "
// //                />
// //              </div>
// //              <div className="flex flex-col w-full">
// //                <label className="text-sm font-md text-black mb-2">
// //                  EMAIL
// //                </label>
// //                <input
// //                  type="email"
// //                  placeholder="Email"
// //                  className="
// //                    w-full 
// //                    border-b 
// //                    border-gray-400 
// //                    text-sm 
// //                    uppercase 
// //                    py-2 
// //                    px-0 
// //                    focus:outline-none 
// //                    focus:border-black
// //                    bg-transparent
// //                  "
// //                />
// //              </div>
// //            </div>

// //            <div
// //              className='px-5 py-2 border-[1px] border-zinc-400 rounded-full font-lighter text-sm uppercase tracking-tighter hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2 group cursor-pointer'
// //            >
// //              Leave a request
// //              <div className='w-2 h-2 bg-black rounded-full group-hover:w-5 group-hover:h-5 group-hover:rotate-[50deg] transition-all duration-500 flex items-center justify-center'>
// //                <FaArrowUpLong className='opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
// //              </div>
// //            </div>
// //          </div>
// //        </form>
// //      </div>

// //      <div className="mt-10 text-center text-sm text-gray-500">
// //        <div className="flex justify-between px-4 -mb-4">
// //          <p>VISALTA, INC. © 2024</p>
// //          <a href="#" className="hover:text-blue-500">TERMS AND CONDITIONS</a>
// //          <a href="#" className="hover:text-blue-500">COOKIES POLICY</a>
// //          <a href="#" className="hover:text-blue-500">WARRANTY AGREEMENT</a>
// //        </div>
// //      </div>
// //    </footer>
// //  );
// // };

// // export default Footer;

// import React, { useState } from "react";
// import { FaArrowUpLong } from "react-icons/fa6";

// const Footer = () => {
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     email: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch(`${process.env.REACT_APP_BASE_URL}/requests/submit`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(form),
//       });

//       if (response.ok) {
//         alert("Request submitted successfully! We'll call you shortly.");
//         setForm({ name: "", phone: "", email: "" });
//       } else {
//         alert("Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error submitting the request:", error);
//       alert("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <footer className="bg-[#D2D2D2] text-gray-800 py-10 space-y-44">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex justify-between">
//           {/* Left Section: Social Links */}
//           <div className="space-y-6">
//             <h2 className="text-sm font-light tracking-tighter">JOIN OUR SOCIALS</h2>
//             <div className=" text-3xl">
//               <div>Instagram</div>
//               <div>Facebook</div>
//               <div>LinkedIn</div>
//             </div>
//           </div>

//           {/* Right Section: Contact and Form */}
//           <div className="space-y-12">
//             <div className="space-y-6">
//               <div className="text-sm font-light tracking-tighter">MONDAY–FRIDAY, 9AM–6PM</div>
//               <div className="text-3xl">visalta@gmail.com</div>
//             </div>

//             <div className="space-y-7">
//               <div className="text-sm font-light uppercase tracking-tighter">We respond within a few hours</div>

//               <div className="text-3xl flex gap-2">
//                 <span>827</span>
//                 <span>346</span>
//                 <span>3662</span>
//               </div>
//               <div className="text-sm font-light tracking-tighter flex flex-col">
//                 <span>NIT Warangal,</span>
//                 <span>1K Hostel,</span>
//                 <span>Telangana 506004</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-between max-w-6xl mx-auto">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="text-3xl flex flex-col">
//             <span className="relative">
//               <span>Leave a request and</span>
//             </span>
//             <span className="relative">
//               <span>we'll call you.</span>
//             </span>
//           </div>
//           <div className="flex">
//             <div className="flex justify-between gap-56">
//               <div className="flex flex-col w-full">
//                 <label className="text-sm font-md text-black mb-2">FULL NAME</label>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   value={form.name}
//                   onChange={handleChange}
//                   className="
//                     w-full 
//                     border-b 
//                     border-gray-400 
//                     text-sm 
//                     uppercase 
//                     py-2 
//                     px-0 
//                     focus:outline-none 
//                     focus:border-black
//                     bg-transparent
//                   "
//                 />
//               </div>
//               <div className="flex flex-col w-full">
//                 <label className="text-sm font-md text-black mb-2">PHONE NUMBER</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="Phone"
//                   value={form.phone}
//                   onChange={handleChange}
//                   className="
//                     w-full 
//                     border-b 
//                     border-gray-400 
//                     text-sm 
//                     uppercase 
//                     py-2 
//                     px-0 
//                     focus:outline-none 
//                     focus:border-black
//                     bg-transparent
//                   "
//                 />
//               </div>
//               <div className="flex flex-col w-full">
//                 <label className="text-sm font-md text-black mb-2">EMAIL</label>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={form.email}
//                   onChange={handleChange}
//                   className="
//                     w-full 
//                     border-b 
//                     border-gray-400 
//                     text-sm 
//                     uppercase 
//                     py-2 
//                     px-0 
//                     focus:outline-none 
//                     focus:border-black
//                     bg-transparent
//                   "
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="
//                 px-5 py-2 border-[1px] border-zinc-400 rounded-full font-lighter text-sm uppercase tracking-tighter 
//                 hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2 group cursor-pointer
//               "
//               disabled={loading}
//             >
//               {loading ? "Submitting..." : "Leave a request"}
//               <div className="w-2 h-2 bg-black rounded-full group-hover:w-5 group-hover:h-5 group-hover:rotate-[50deg] transition-all duration-500 flex items-center justify-center">
//                 <FaArrowUpLong className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </div>
//             </button>
//           </div>
//         </form>
//       </div>

//       <div className="mt-10 text-center text-sm text-gray-500">
//         <div className="flex justify-between px-4 -mb-4">
//           <p>VISALTA, INC. © 2024</p>
//           <a href="#" className="hover:text-blue-500">TERMS AND CONDITIONS</a>
//           <a href="#" className="hover:text-blue-500">COOKIES POLICY</a>
//           <a href="#" className="hover:text-blue-500">WARRANTY AGREEMENT</a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React, { useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";
import { toast } from "react-hot-toast";

const Footer = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.loading("Submitting your request...");

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/requests/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        toast.dismiss();
        toast.success("Request submitted successfully! We'll call you shortly.");
        setForm({ name: "", phone: "", email: "" });
      } else {
        toast.dismiss();
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the request:", error);
      toast.dismiss();
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#D2D2D2] text-gray-800 py-10 space-y-44">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between">
          {/* Left Section: Social Links */}
          <div className="space-y-6">
            <h2 className="text-sm font-light tracking-tighter">JOIN OUR SOCIALS</h2>
            <div className=" text-3xl">
              <div>Instagram</div>
              <div>Facebook</div>
              <div>LinkedIn</div>
            </div>
          </div>

          {/* Right Section: Contact and Form */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="text-sm font-light tracking-tighter">MONDAY–FRIDAY, 9AM–6PM</div>
              <div className="text-3xl">visalta@gmail.com</div>
            </div>

            <div className="space-y-7">
              <div className="text-sm font-light uppercase tracking-tighter">We respond within a few hours</div>

              <div className="text-3xl flex gap-2">
                <span>827</span>
                <span>346</span>
                <span>3662</span>
              </div>
              <div className="text-sm font-light tracking-tighter flex flex-col">
                <span>NIT Warangal,</span>
                <span>1K Hostel,</span>
                <span>Telangana 506004</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between max-w-6xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-3xl flex flex-col">
            <span className="relative">
              <span>Leave a request and</span>
            </span>
            <span className="relative">
              <span>we'll call you.</span>
            </span>
          </div>
          <div className="flex">
            <div className="flex justify-between gap-56">
              <div className="flex flex-col w-full">
                <label className="text-sm font-md text-black mb-2">FULL NAME</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  className="
                    w-full 
                    border-b 
                    border-gray-400 
                    text-sm 
                    uppercase 
                    py-2 
                    px-0 
                    focus:outline-none 
                    focus:border-black
                    bg-transparent
                  "
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm font-md text-black mb-2">PHONE NUMBER</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="
                    w-full 
                    border-b 
                    border-gray-400 
                    text-sm 
                    uppercase 
                    py-2 
                    px-0 
                    focus:outline-none 
                    focus:border-black
                    bg-transparent
                  "
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm font-md text-black mb-2">EMAIL</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="
                    w-full 
                    border-b 
                    border-gray-400 
                    text-sm 
                    uppercase 
                    py-2 
                    px-0 
                    focus:outline-none 
                    focus:border-black
                    bg-transparent
                  "
                />
              </div>
            </div>

            <button
              type="submit"
              className="
                px-5 py-2 border-[1px] border-zinc-400 rounded-full font-lighter text-sm uppercase tracking-tighter 
                hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2 group cursor-pointer
              "
              disabled={loading}
            >
              {loading ? "Submitting..." : "Leave a request"}
              <div className="w-2 h-2 bg-black rounded-full group-hover:w-5 group-hover:h-5 group-hover:rotate-[50deg] transition-all duration-500 flex items-center justify-center">
                <FaArrowUpLong className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </button>
          </div>
        </form>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        <div className="flex justify-between px-4 -mb-4">
          <p>VISALTA, INC. © 2024</p>
          <a href="#" className="hover:text-blue-500">TERMS AND CONDITIONS</a>
          <a href="#" className="hover:text-blue-500">COOKIES POLICY</a>
          <a href="#" className="hover:text-blue-500">WARRANTY AGREEMENT</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

