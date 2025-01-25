import React, { useState } from 'react';
import { BrowserRouter as Router,Routes, Route, useNavigate,Link } from 'react-router-dom';
import { 
  Pill, 
  ShieldCheck, 
  Clock, 
  UserRound, 
  CreditCard, 
  Truck,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  LayoutDashboard, User, Info, FileText, Search
} from 'lucide-react';
import Profile from './profile';
import About from './Aboutus';
import Dashboard from '../components/Dashboard';
import Home from './Home';

interface PolicySection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: string;
  image?: string;
}

export default function Policy() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
   const [isMenuOpen, setIsMenuOpen] = useState(false);

  const policies: PolicySection[] = [
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: <ShieldCheck className="w-6 h-6 text-teal-600" />,
      content: 'We take your privacy seriously. All personal and medical information is protected under HIPAA guidelines and stored securely. We never share your information with third parties without your explicit consent.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80'
    },
    {
      id: 'prescription',
      title: 'Our terms and Conditions',
      icon: <Pill className="w-6 h-6 text-teal-600" />,
      content: 'Generated Medicine is only for informational purposes.For further Query Kindly contact Doctors.For any damages we are not responsible',
      image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80'
    },
    {
      id: 'hours',
      title: 'Operating Hours',
      icon: <Clock className="w-6 h-6 text-teal-600" />,
      content: 'Our services are available 24/7.For any medical emergencies kindly contact 911.',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80'
    }
   
    
   
  ];

  return (
    <div className="min-h-screen bg-gray-50">
       


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
                              <p className="text-sm text-gray-500">Track your dosage</p>
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
      <div 
        className="relative bg-gradient-to-r from-teal-600 to-teal-800 text-white py-24"
        style={{
          backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/044/525/001/non_2x/ai-generated-tube-with-spilled-tablets-generative-ai-photo.jpeg")',
          backgroundBlendMode: 'overlay',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Our Website Policies
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mb-8">
            Committed to providing quality healthcare services with transparency and care.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => document.getElementById('policies')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-teal-600 px-6 py-3 rounded-full font-semibold hover:bg-teal-50 transition-colors"
            >
              View Policies
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white py-12 shadow-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">24/7</div>
              <div className="text-gray-600">Emergency Support</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">15+</div>
              <div className="text-gray-600">Years of Service</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">100%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Sections */}
      <div id="policies" className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          {policies.map((policy) => (
            <div 
              key={policy.id}
              className={`bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 ${
                hoveredSection === policy.id ? 'scale-[1.02]' : ''
              }`}
              onMouseEnter={() => setHoveredSection(policy.id)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <button
                onClick={() => setExpandedSection(expandedSection === policy.id ? null : policy.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {policy.icon}
                  <h2 className="text-xl font-semibold text-gray-800">
                    {policy.title}
                  </h2>
                </div>
                {expandedSection === policy.id ? (
                  <ChevronUp className={`w-5 h-5 text-gray-500 transition-transform duration-300 transform ${
                    expandedSection === policy.id ? 'rotate-180' : ''
                  }`} />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {expandedSection === policy.id && (
                <div className="px-6 pb-6 pt-2">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-600 whitespace-pre-line">
                        {policy.content}
                      </p>
                    </div>
                    {policy.image && (
                      <div className="relative h-48 rounded-lg overflow-hidden">
                        <img 
                          src={policy.image} 
                          alt={policy.title}
                          className="absolute inset-0 w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-teal-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <Phone className="w-8 h-8 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">(555) 123-4567</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <Mail className="w-8 h-8 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600">info@medtech.com</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <MapPin className="w-8 h-8 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-gray-600">123 Health Street</p>
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
              <p className="text-gray-400">Email: info@medtech.com</p>
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
              <p>UPON SIGNING IN YOU WILL BE AGREEING TO OUR TERMS & CONDITIONS</p>
            </div>
          </div>
        </div>
      </footer>
      <Routes>
            <Route path="/profile" element={<Profile />} />
                    
                        <Route path="/about" element={<About />} />
                        <Route path="/policy" element={<Policy />} />
                        <Route
                                      path="/dashboard"
                                      element={<Dashboard /> }
                                    />
                      
                        </Routes>
    </div>
  );
}

