import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router,Routes, Route, useNavigate,Link } from 'react-router-dom';
import Papa from 'papaparse';
import { LayoutDashboard, User, Info, FileText,Pill, Search } from 'lucide-react';
import type { Word } from './type';
import Profile from './profile';
import About from './Aboutus';
import Policy from './policy';
import Dashboard from '../components/Dashboard';

export default function Home() {
 
  const [words, setWords] = useState<Word[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [error, setError] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  

  useEffect(() => {
    const loadWords = async () => {
      const response = await fetch('/src/data/words.csv');
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          setWords(results.data as Word[]);
        },
      });
    };

    loadWords();
  }, []);

  const searchWord = () => {
    const foundWord = words.find(
      (word) => word.word.toLowerCase() === searchTerm.toLowerCase()
    );

    if (foundWord) {
      setCurrentWord(foundWord);
      setError('');
    } else {
      setError('Medicine not found in our library');
    }
  };

  
  
  
 
  
  return (
      <div className="min-h-screen bg-teal-200">
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
    <main>
      <Routes>
        <Route
         path="/"
         element={ 
         <div className="min-h-[calc(100vh-4rem)]">
          <header className="bg-teal-100 shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Welcome to Medicine Generator</h1>
            </div>
          </header>
          
              <div className="min-h-screen bg-teal-100">
                <div className="max-w-2xl mx-auto p-6">
                  <header className="flex items-center gap-2 mb-8">
                    <Pill className="w-8 h-8 text-teal-600 animate-spin" />
                    <h1 className="text-2xl font-bold text-gray-800">Medicine Generator</h1>
                  </header>

                  <div className="flex gap-2 mb-8">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && searchWord()}
                      placeholder="Type a word..."
                      className="flex-1 px-4 py-2 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      onClick={searchWord}
                      className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
                    >
                      <Search className="w-4 h-4" />
                      Search
                    </button>
                  </div>

                  {error && <div className="text-red-500 mb-4">{error}</div>}

                  {currentWord && (
                    <div className="bg-green-50 rounded-xl p-6 shadow-sm">
                      <div className="grid grid-cols-[1fr,120px] gap-6">
                        <div>
                          <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            {currentWord.meaning}
                          </h2>
                          <div className="bg-white p-4 rounded-lg">
                            <p className="text-gray-700 italic">"{currentWord.example}"</p>
                          </div>
                        </div>

                        <div className="w-[120px] h-[120px] rounded-lg overflow-hidden">
                          <img
                            src={currentWord.image}
                            alt={currentWord.word}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                     )}
                     </div>
                   </div>
                  </div>
         }
         />
          <Route path="/profile" element={<Profile />} />
          
            <Route path="/about" element={<About />} />
            <Route path="/policy" element={<Policy />} />
            <Route
                          path="/dashboard"
                          element={<Dashboard /> }
                        />
          
            </Routes>

         
   
      </main>
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
                © {new Date().getFullYear()} MediCare. All rights reserved.Powered By MEDTECH.
              </p>
            </div>
          </div>
        </div>
      </footer>
     </div>
  );
}
