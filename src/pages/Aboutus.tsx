import React, { useState, useEffect } from 'react';
import { Heart, Shield, Stethoscope, Clock, ChevronLeft, ChevronRight, Star,LayoutDashboard, User, Info, FileText,PlusCircle,Pill } from 'lucide-react';
import { BrowserRouter as Router,Routes, Route, useNavigate,Link } from 'react-router-dom';

const testimonials = [
  {
    name: "David Wilson",
    text: "The care and attention I received was exceptional. The entire team went above and beyond.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Maria Garcia",
    text: "State-of-the-art facilities and compassionate staff. Couldn't ask for better care.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "James Thompson",
    text: "The doctors here are not just skilled, they truly care about their patients' well-being.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80",
  }
];

const teamMembers = [
  {
    name: "Priyanka K P",
    role: "Backend Developer",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQGoxz9E3MlsIw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728915891970?e=1743033600&v=beta&t=FBAHEvOBg-XevgtSmFYV-C3YJZ2ymaRdyyC8me8gTfs",
    description: ""
  },
  {
    name: "Jesmitha K",
    role: "Front end developer",
    image: "https://media.licdn.com/dms/image/v2/D5603AQFpsVa4VRdFcw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725185335344?e=1743033600&v=beta&t=-1tbUoMCX4Yh4zYf53Jn-aPz6OhMXokcrTuwVemLHn8",
    description: ""
  },
  {
    name: "Ghanashyam",
    role: "OCR developer",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQGhnOQBnUf5sA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729426954494?e=1743033600&v=beta&t=zvuTgC6Seuc2B28-TPWgOZR61GKNYWV-WYnU6x096xk",
    description: ""
  }
];


 export default function About() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
   const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
     <nav className="bg-teal-700 p-4 relative shadow-sm">
                       
                         <button
                           onClick={() => setIsMenuOpen(!isMenuOpen)}
                           className="p-2 hover:bg-green-200 rounded-lg transition-colors duration-200 ease-in-out"
                         >
                           <LayoutDashboard className="h-6 w-6 text-teal-200" />
                         </button>
               
                         {isMenuOpen && (
                           <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-3 z-10 transform transition-all duration-200 ease-in-out">
                             <div className="px-4 py-3 border-b border-gray-100">
                               <h3 className="text-sm font-semibold text-gray-500 uppercase">Dashboard Menu</h3>
                             </div>
                             
                             <Link
                               to="/dashboard"
                               className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors duration-200 gap-3"
                               onClick={() => setIsMenuOpen(false)}
                             >
                               <Pill className="h-5 w-5 text-green-600" />
                               <div>
                                 <p className="font-medium">Dosage Tracker</p>
                                 <p className="text-sm text-gray-500">Track Your Dosage</p>
                               </div>
                             </Link>
                             <Link
                               to="/profile"
                               className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors duration-200 gap-3"
                               onClick={() => setIsMenuOpen(false)}
                             >
                               <User className="h-5 w-5 text-green-600" />
                               <div>
                                 <p className="font-medium">User Profile Details</p>
                                 <p className="text-sm text-gray-500">View and edit your profile</p>
                               </div>
                             </Link>
                             <Link
                               to="/about"
                               className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors duration-200 gap-3"
                               onClick={() => setIsMenuOpen(false)}
                             >
                               <Info className="h-5 w-5 text-green-600" />
                               <div>
                                 <p className="font-medium">About Us</p>
                                 <p className="text-sm text-gray-500">Learn more about our company</p>
                               </div>
                             </Link>
                             
                             <Link
                               to="/policy"
                               className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors duration-200 gap-3"
                               onClick={() => setIsMenuOpen(false)}
                             >
                               <FileText className="h-5 w-5 text-green-600" />
                               <div>
                                 <p className="font-medium">Our Policy</p>
                                 <p className="text-sm text-gray-500">Review our terms and policies</p>
                               </div>
                             </Link>
                              <Link
                                  to="/"
                                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors duration-200 gap-3"
                                  onClick={() => setIsMenuOpen(false)}
                                  >
                                  <FileText className="h-5 w-5 text-green-600" />
                                  <div>
                                  <p className="font-medium">Home Page</p>
                                  <p className="text-sm text-gray-500">Go back to home page</p>
                                   </div>
                              </Link>
                             
                           </div>
                         )}
                       </nav> 
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-teal-300 to-teal-400 flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=2000&q=80" 
            alt="Modern medical facility" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Caring for Your Health</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Providing exceptional healthcare with compassion and expertise
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="group p-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors duration-300">
              <Heart className="w-6 h-6 text-blue-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Compassionate Care</h3>
            <p className="text-gray-600">Treating every patient with empathy</p>
          </div>
          
          <div className="group p-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors duration-300">
              <Shield className="w-6 h-6 text-green-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Care</h3>
            <p className="text-gray-600">Leading medical expertise</p>
          </div>
          
          <div className="group p-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-500 transition-colors duration-300">
              <Stethoscope className="w-6 h-6 text-purple-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Cheaper alternate medicine</h3>
            <p className="text-gray-600">Alternate medicine which is of low cost</p>
          </div>

          <div className="group p-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors duration-300">
              <Clock className="w-6 h-6 text-orange-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 Care</h3>
            <p className="text-gray-600">Can contact us for any queries</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Developer Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-gray-300">{member.role}</p>
                    <p className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {member.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div className="bg-green-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Patient Testimonials</h2>
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex items-center justify-center">
                <button 
                  onClick={prevTestimonial}
                  className="absolute left-0 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
                >
                  <ChevronLeft className="w-6 h-6 text-blue-600" />
                </button>
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-12">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonials[currentTestimonial].image} 
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{testimonials[currentTestimonial].name}</h3>
                      <div className="flex text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">{testimonials[currentTestimonial].text}</p>
                </div>
                <button 
                  onClick={nextTestimonial}
                  className="absolute right-0 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
                >
                  <ChevronRight className="w-6 h-6 text-blue-600" />
                </button>
              </div>
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentTestimonial ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">123 Medical Center Drive</p>
              <p className="text-gray-400">Healthcare City, HC 12345</p>
              <p className="text-gray-400">Phone: (555) 123-4567</p>
              <p className="text-gray-400">Email: info@medicare.com</p>
            </div>
            <div>
             
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Emergency</h3>
              <p className="text-gray-400">For medical emergencies, please dial 911 immediately.</p>
              <p className="text-gray-400 mt-2">24/7 Nurse Hotline: (555) 999-8888</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="text-sm text-gray-400">
              <p className="font-semibold mb-2">Medical Disclaimer:</p>
              <p>
                © {new Date().getFullYear()} MediCare. All rights reserved.Powered By MEDTECH
              </p>
            </div>
          </div>
        </div>
      </footer>
      
    </div>
  );
}

