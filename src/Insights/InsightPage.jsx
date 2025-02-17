// InsightPage.js
import React from "react";
import { motion } from "framer-motion";
import ProfileCards from "./Teamslider";
import VisaltaSection from "./VisaltaSection";
import VisaltaCards from "./VisaltaCards";
import ContactForm from "./ContactForm";
import AnimatedLogo from "../Home/AnimatedLogo";
import { useNavigate } from "react-router-dom";

const InsightPage = () => {

  const navigate = useNavigate();
  return (
    <div className="bg-zinc-900 text-white min-h-screen p-6 sm:p-8 md:p-10">
    {/* About Visalta Section */}
    <div
      className="flex items-end py-6 px-2 sm:px-4 md:px-8 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <AnimatedLogo className="w-10  h-6 sm:w-12 sm:h-12 md:w-16 md:h-16" />
    </div>

    <VisaltaSection />
    <VisaltaCards />

    {/* Team Section */}
    <div className="flex items-center justify-center h-auto md:h-screen py-6">
      <ProfileCards />
    </div>

    {/* Contact Us Section */}
    <ContactForm />
  </div>

  );
};

export default InsightPage;