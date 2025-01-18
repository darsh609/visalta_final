import React, { useState } from 'react';

const ContactForm = () => {
  const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(1000px)' });
  
  // Country codes data
  const countryCodes = [
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'India' },
    { code: '+61', country: 'Australia' },
    { code: '+86', country: 'China' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+81', country: 'Japan' },
    { code: '+7', country: 'Russia' },
    { code: '+55', country: 'Brazil' },
    { code: '+34', country: 'Spain' },
    { code: '+39', country: 'Italy' },
    { code: '+82', country: 'South Korea' },
    { code: '+31', country: 'Netherlands' },
    { code: '+64', country: 'New Zealand' },
    { code: '+65', country: 'Singapore' },
    { code: '+46', country: 'Sweden' },
    { code: '+41', country: 'Switzerland' },
    { code: '+52', country: 'Mexico' },
    { code: '+971', country: 'UAE' }
  ].sort((a, b) => a.country.localeCompare(b.country));
  
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Contact Info Card */}
        <div className="bg-zinc-900 text-zinc-100 p-8 rounded-lg w-full md:w-[380px] shadow-lg">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Chat on us</h3>
              <p className="text-zinc-400">Our friendly team is here to help.</p>
              <p className="text-zinc-400">darshkumar0609@gmail.com</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Visit us</h3>
              <p className="text-zinc-400">Come and say hello at our office HQ.</p>
              <p className="text-zinc-400">Room 1349, 1k hostel, NIT Warangal, Hanamkonda, Telangana</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Call us</h3>
              <p className="text-zinc-400">Mon - Fri From 8am to 5pm</p>
              <p className="text-zinc-400">+91 8081792286</p>
            </div>
          </div>
        </div>

        {/* Contact Form Card with Tilt Effect */}
        <div 
          className="bg-zinc-900 text-zinc-100 p-8 rounded-lg w-full md:w-[580px] shadow-lg"
          style={tiltStyle}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <h2 className="text-3xl font-bold mb-2">Got a Idea? We've got the skills.</h2>
          <h3 className="text-2xl font-bold mb-6">Let's team up</h3>
          <p className="text-zinc-400 mb-8">Tell us more about yourself and what you're got in mind.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm mb-2">First Name</label>
                <input
                  type="text"
                  className="w-full bg-zinc-800 rounded-md p-3 text-zinc-100 border border-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors"
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm mb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full bg-zinc-800 rounded-md p-3 text-zinc-100 border border-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors"
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm mb-2">Email Address</label>
              <input
                type="email"
                className="w-full bg-zinc-800 rounded-md p-3 text-zinc-100 border border-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors"
                placeholder="Enter email address"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm mb-2">Phone Number</label>
              <div className="flex gap-4">
                <select 
                  className="bg-zinc-800 rounded-md p-3 text-zinc-100 border border-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors w-40"
                  required
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code} {country.country}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  className="flex-1 bg-zinc-800 rounded-md p-3 text-zinc-100 border border-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors"
                  placeholder="12345 67890"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm mb-2">Message</label>
              <textarea
                className="w-full bg-zinc-800 rounded-md p-3 text-zinc-100 border border-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors h-32 resize-none"
                placeholder="Enter your message here"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-zinc-100 text-zinc-900 py-3 px-6 rounded-md font-semibold 
                         hover:bg-zinc-200 active:bg-zinc-300 transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
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