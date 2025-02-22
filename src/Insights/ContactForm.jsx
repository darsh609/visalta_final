import React, { useState, useEffect } from 'react';
import { apiConnector } from "../services/apiConnector";
import { contactusEndpoint } from "../services/apis";
import countryCodes from "../datas/countrycode.json";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ContactForm = () => {
  const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(1000px)' });
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xRotation = ((y - rect.height / 2) / rect.height) * 10;
    const yRotation = ((x - rect.width / 2) / rect.width) * -10;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease'
    });
  };
  
  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease'
    });
  };

  const submitContactForm = async (data) => {
    const loadingToastId = toast.loading("Sending your message...");
    
    try {
      setLoading(true);
      const res = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
      toast.success("Message sent successfully!", { id: loadingToastId });
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
      toast.error("Failed to send message", { id: loadingToastId });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-8">
        {/* Contact Info Card */}
        <div className="bg-zinc-900 text-zinc-100 p-6 sm:p-8 rounded-lg w-full md:w-[380px] lg:w-[420px] shadow-lg">
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Chat on us</h3>
              <p className="text-sm sm:text-base text-zinc-400">Our friendly team is here to help.</p>
              <p className="text-sm sm:text-base text-zinc-400">teamvisalta@gmail.com</p>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Visit us</h3>
              <p className="text-sm sm:text-base text-zinc-400">Come and say hello at our office HQ.</p>
              <p className="text-sm sm:text-base text-zinc-400">Room 1349, 1k hostel, NIT Warangal</p>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Call us</h3>
              <p className="text-sm sm:text-base text-zinc-400">Mon - Fri From 8am to 5pm</p>
              <p className="text-sm sm:text-base text-zinc-400">+91 8081792286</p>
              <p className="text-sm sm:text-base text-zinc-400">+91 8273463662</p>
            </div>
          </div>
        </div>

        {/* Contact Form Card */}
        <div 
          className="bg-zinc-900 text-zinc-100 p-6 sm:p-8 rounded-lg w-full md:w-[580px] lg:w-[640px] shadow-lg transition-all duration-300"
          style={tiltStyle}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center md:text-left">Got a Idea? We've got the skills.</h2>
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center md:text-left">Let's team up</h3>
          <p className="text-sm sm:text-base text-zinc-400 mb-6 sm:mb-8 text-center md:text-left">Tell us more about yourself and what you're got in mind.</p>
          
          <form onSubmit={handleSubmit(submitContactForm)} className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm mb-2">First Name</label>
                <input
                  type="text"
                  className="w-full bg-zinc-800 rounded-md p-2 sm:p-3 text-sm sm:text-base text-zinc-100 border border-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors"
                  placeholder="Enter first name"
                  required
                  {...register("firstname", { required: true })}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm mb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full bg-zinc-800 rounded-md p-2 sm:p-3 text-sm sm:text-base text-zinc-100 border border-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors"
                  placeholder="Enter last name"
                  required
                  {...register("lastname")}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm mb-2">Email Address</label>
              <input
                type="email"
                className="w-full bg-zinc-800 rounded-md p-2 sm:p-3 text-sm sm:text-base text-zinc-100 border border-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors"
                placeholder="Enter email address"
                required
                {...register("email", { required: true })}
              />
            </div>
            
            <div>
              <label className="block text-sm mb-2">Phone Number</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <select 
                  className="bg-zinc-800 rounded-md p-2 sm:p-3 text-sm sm:text-base text-zinc-100 border border-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors w-full sm:w-40"
                  required
                  {...register("countrycode", { required: true })}
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code} {country.country}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  className="flex-1 bg-zinc-800 rounded-md p-2 sm:p-3 text-sm sm:text-base text-zinc-100 border border-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors"
                  placeholder="12345 67890"
                  required
                  {...register("phoneNo", {
                    required: true,
                    maxLength: 12,
                    minLength: 10,
                  })}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm mb-2">Message</label>
              <textarea
                className="w-full bg-zinc-800 rounded-md p-2 sm:p-3 text-sm sm:text-base text-zinc-100 border border-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors h-24 sm:h-32 resize-none"
                placeholder="Enter your message here"
                required
                {...register("message", { required: true })}
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-zinc-100 text-zinc-900 py-2 sm:py-3 px-4 sm:px-6 rounded-md text-sm sm:text-base font-semibold 
                       hover:bg-zinc-200 active:bg-zinc-300 transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-900
                       disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;