// InsightPage.js
import React from "react";
import { motion } from "framer-motion";
import ProfileCards from "./Teamslider";
import VisaltaSection from "./VisaltaSection";
import VisaltaCards from "./VisaltaCards";
import ContactForm from "./ContactForm";

const InsightPage = () => {
  return (
    <div className="bg-zinc-900 text-white min-h-screen p-6">
      {/* About Visalta Section */}
      
      <VisaltaSection/>
      <VisaltaCards/>
      {/* Team Section */}
      <div className="flex items-center justify-center h-screen" >
      <ProfileCards/>
      </div>
      
      {/* Contact Us Section */}
      <ContactForm/>
    </div>
  );
};

export default InsightPage;