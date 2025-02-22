
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
        toast.error("All fields are required.");
      }
    } catch (error) {
      console.error("Error submitting the request:", error);
      toast.dismiss();
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // import { FaArrowUpLong } from "react-icons/fa6";
    // import { FaArrowUpLong as FaArrowIcon } from "react-icons/fa6"; // Or rename as needed
    
    <footer className="bg-[#D2D2D2] text-gray-800 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Section: Social & Contact */}
        <div className="flex flex-col md:flex-row md:justify-between md:gap-20 space-y-8">
          {/* Left Section: Social Links & Map */}
          <div className="flex-1 space-y-6">
            <h2 className="text-xs md:text-sm font-light tracking-tighter">
              JOIN OUR SOCIALS
            </h2>
            <div className="flex flex-col space-y-2 text-xl md:text-3xl">
              <a
                href="https://www.instagram.com/visalta.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:text-[#1db954] transition-colors duration-300"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:text-[#1db954] transition-colors duration-300"
              >
                Facebook
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:text-[#1db954] transition-colors duration-300"
              >
                LinkedIn
              </a>
            </div>
            <div className="mt-6 md:mt-10">
              <iframe
                id="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.897116509384!2d79.53083859999998!3d17.983522999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a334fbb37aee6c3%3A0xf1b2c37fcb8fefce!2sNIT%20Warangal!5e0!3m2!1sen!2sin!4v1736005565336!5m2!1sen!2sin"
                className="w-full   h-32 md:h-56 border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
    
          {/* Right Section: Contact Info */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <div className="text-xs md:text-sm font-light tracking-tighter">
                MONDAY–FRIDAY, 10AM–6PM
              </div>
              <div className="text-xl md:text-3xl font-bold">
                <a
                  href="mailto:teamvisalta@gmail.com"
                  className="hover:text-[#1db954] transition-colors duration-300"
                >
                  teamvisalta@gmail.com
                </a>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xs md:text-sm font-light uppercase tracking-tighter">
                We respond within a few hours
              </div>
              <div className="text-xl md:text-3xl flex gap-2">
                <a
                  href="tel:8273463662"
                  className="hover:text-[#1db954] transition-colors duration-300"
                >
                  808
                </a>
                <a
                  href="tel:8273463662"
                  className="hover:text-[#1db954] transition-colors duration-300"
                >
                  179
                </a>
                <a
                  href="tel:8273463662"
                  className="hover:text-[#1db954] transition-colors duration-300"
                >
                  2286
                </a>
              </div>
              <div className="text-xs md:text-sm font-light flex flex-col">
                <span>NIT Warangal,</span>
                <span>1K Hostel,</span>
                <span>Telangana 506004</span>
              </div>
            </div>
          </div>
        </div>
    
        {/* Middle Section: Request Form */}
        <div className="mt-20 max-w-6xl mx-auto px-4">
  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Heading */}
    <div className="text-xl md:text-3xl flex flex-col">
      <span>Leave a request and</span>
      <span>we'll call you.</span>
    </div>

    {/* Inputs + Button Row */}
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      {/* Inputs Container */}
      <div className="flex flex-col md:flex-row md:gap-12 w-full">
        {/* Full Name */}
        <div className="flex flex-col w-full">
          <label className="text-xs md:text-sm text-black mb-1">FULL NAME</label>
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
              text-xs md:text-sm
              uppercase
              py-1 md:py-2
              bg-transparent
              focus:outline-none
              focus:border-black
            "
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col w-full">
          <label className="text-xs md:text-sm text-black mb-1">PHONE NUMBER</label>
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
              text-xs md:text-sm
              uppercase
              py-1 md:py-2
              bg-transparent
              focus:outline-none
              focus:border-black
            "
          />
        </div>

        {/* Email */}
        <div className="flex flex-col w-full">
          <label className="text-xs md:text-sm text-black mb-1">EMAIL</label>
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
              text-xs md:text-sm
              uppercase
              py-1 md:py-2
              bg-transparent
              focus:outline-none
              focus:border-black
            "
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="
          px-3 md:px-5
          py-1 md:py-2
          border border-zinc-400
          rounded-full
          text-xs md:text-sm
          uppercase
          tracking-tighter
          font-light
          hover:bg-black
          hover:text-white
          transition-all
          duration-300
          flex
          items-center
          gap-2
          group
          cursor-pointer
          self-start md:self-auto
        "
        disabled={loading}
      >
        {loading ? "Submitting..." : "Leave a request"}
        <div
          className="
            w-2 h-2
            bg-black
            rounded-full
            group-hover:w-4 group-hover:h-4
            group-hover:rotate-[50deg]
            transition-all
            duration-500
            flex
            items-center
            justify-center
          "
        >
          <FaArrowUpLong className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </button>
    </div>
  </form>
</div>

    
        {/* Bottom Section: Terms & Links */}
        <div className=" mt-20 text-center text-xs md:text-sm text-gray-500">
          <div className="flex flex-col md:flex-row md:justify-between md:px-4 space-y-2 md:space-y-0">
            <p>VISALTA, INC. © 2024</p>
            <a href="#" className="hover:text-[#1db954] cursor-pointer">
              TERMS AND CONDITIONS
            </a>
            <a href="#" className="hover:text-[#1db954] cursor-pointer">
              COOKIES POLICY
            </a>
            <a href="#" className="hover:text-[#1db954] cursor-pointer">
              WARRANTY AGREEMENT
            </a>
          </div>
        </div>
      </div>
    </footer>
    

  
  );
};

export default Footer;

