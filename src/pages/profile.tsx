
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { LayoutDashboard, User, Info, FileText,Pill, Search } from 'lucide-react';
import { BrowserRouter as Router,Routes, Route, useNavigate,Link } from 'react-router-dom';
import About from './Aboutus';
import Policy from './policy';
import Dashboard from '../components/Dashboard';
import Home from './Home';
interface UserProfile {
  full_name: string;
  phone: string;
  emergency_contact: string;
  medical_conditions: string;
  allergies: string;
}
 

export default function Profile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile>({
    full_name: '',
    phone: '',
    emergency_contact: '',
    medical_conditions: '',
    allergies: '',
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      if (data) {
        setUserProfile(data);
      }
    } catch (error) {
      toast.error('Error fetching profile');
    }
  };

  const updateUserProfile = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user?.id,
          ...userProfile,
        });

      if (error) throw error;
      setIsEditingProfile(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  React.useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="bg-teal-50 shadow sm:rounded-lg ">
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
      <div 
        className="relative bg-gradient-to-r from-teal-600 to-teal-800 text-white py-20"
        style={{
          backgroundImage: 'url("https://tse3.mm.bing.net/th?id=OIP.6EYeBxW0t9ZoXPrSwmbmrQHaE7&pid=Api&P=0&h=180")',
          backgroundBlendMode: 'overlay',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative">
  <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
    User Details
  </h1>
  <p className="text-xl opacity-90 max-w-2xl mb-8">
    Upon submitting your user details you are agreeing to our terms and conditions...
  </p>
</div>

      </div>
     


      {isEditingProfile ? (
        <form onSubmit={(e) => { e.preventDefault(); updateUserProfile(); }}>
          <div className="p-6 bg-green-100 rounded-xl shadow-lg max-w-lg mx-auto mt-8">
  <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Profile</h2>
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    {/* Full Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Full Name</label>
      <div className="relative">
        <input
          type="text"
          value={userProfile.full_name}
          onChange={(e) => setUserProfile({ ...userProfile, full_name: e.target.value })}
          className="mt-1 block w-full pl-10 border border-gray-300 rounded-lg shadow-sm p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          placeholder="Enter your full name"
        />
        <div className="absolute left-3 top-2.5 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a5 5 0 100-10 5 5 0 000 10zm-7 7a7 7 0 0114 0H3z" />
          </svg>
        </div>
      </div>
    </div>

    {/* Phone Number */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Phone Number</label>
      <div className="relative">
        <input
          type="tel"
          value={userProfile.phone}
          onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
          className="mt-1 block w-full pl-10 border border-gray-300 rounded-lg shadow-sm p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          placeholder="Enter phone number"
        />
        <div className="absolute left-3 top-2.5 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884l8 4.8a.5.5 0 00.494 0l8-4.8A.5.5 0 0018 5.5v9a.5.5 0 00-.256.433v.067c0 2.484-2.239 4.5-5 4.5H7c-2.761 0-5-2.016-5-4.5V5.5a.5.5 0 00-.256-.433v-.067z" />
          </svg>
        </div>
      </div>
    </div>

    {/* Emergency Contact */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
      <div className="relative">
        <input
          type="text"
          value={userProfile.emergency_contact}
          onChange={(e) => setUserProfile({ ...userProfile, emergency_contact: e.target.value })}
          className="mt-1 block w-full pl-10 border border-gray-300 rounded-lg shadow-sm p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          placeholder="Enter emergency contact"
        />
        <div className="absolute left-3 top-2.5 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 7H7v2h6V7zm-6 4h6v2H7v-2z" />
          </svg>
        </div>
      </div>
    </div>

    {/* Medical Conditions */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Medical Conditions</label>
      <textarea
        value={userProfile.medical_conditions}
        onChange={(e) => setUserProfile({ ...userProfile, medical_conditions: e.target.value })}
        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        placeholder="List medical conditions"
        
      />
    </div>

    {/* Allergies */}
    <div className="sm:col-span-2">
      <label className="block text-sm font-medium text-gray-700">Allergies</label>
      <textarea
        value={userProfile.allergies}
        onChange={(e) => setUserProfile({ ...userProfile, allergies: e.target.value })}
        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        placeholder="List allergies"
        
      />
    </div>
  </div>

  {/* Buttons */}
  <div className="mt-6 flex justify-end space-x-3">
    <button
      type="button"
      onClick={() => setIsEditingProfile(false)}
      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-300"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="px-4 py-2 rounded-lg shadow-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-300"
    >
      Save
    </button>
  </div>
</div>

         

        </form>
      ) : (
        <div className="p-6 bg-green-100 rounded-lg shadow-md max-w-md mx-auto space-y-6 mt-8 mb-8">
  <h2 className="text-lg font-semibold text-gray-800 border-b pb-3">User Profile</h2>
  <div>
    <h3 className="text-sm font-medium text-teal-600">Full Name</h3>
    <p className="mt-1 text-sm text-gray-900">{userProfile.full_name || 'Not set'}</p>
  </div>
  <div>
    <h3 className="text-sm font-medium text-teal-600">Phone Number</h3>
    <p className="mt-1 text-sm text-gray-900">{userProfile.phone || 'Not set'}</p>
  </div>
  <div>
    <h3 className="text-sm font-medium text-teal-600">Emergency Contact</h3>
    <p className="mt-1 text-sm text-gray-900">{userProfile.emergency_contact || 'Not set'}</p>
  </div>
  <div>
    <h3 className="text-sm font-medium text-teal-600">Medical Conditions</h3>
    <p className="mt-1 text-sm text-gray-900">{userProfile.medical_conditions || 'None listed'}</p>
  </div>
  <div className="relative">
    <div>
      <h3 className="text-sm font-medium text-teal-600">Allergies</h3>
      <p className="mt-1 text-sm text-gray-900">{userProfile.allergies || 'None listed'}</p>
    </div>
    {!isEditingProfile && (
      <button
        onClick={() => setIsEditingProfile(true)}
        className="absolute top-0 right-0 px-4 py-2 text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 shadow-md"
      >
        Edit Profile
      </button>
    )}
  </div>
</div>


      )}
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


