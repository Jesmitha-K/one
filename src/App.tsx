import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Auth from './components/Auth';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import Profile from './pages/profile';
import About from './pages/Aboutus';
import Policy from './pages/policy';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" />;
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
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
          <Toaster position="top-right" />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;