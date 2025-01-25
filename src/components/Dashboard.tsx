import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router,Routes, Route, useNavigate,Link } from 'react-router-dom';
import { PlusCircle, Clock, LogOut, User,LayoutDashboard, Info, FileText,Pill, Search  } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';


interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time_of_day: string[];
  notes: string;
  next_dose: string;
}
export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isAddingMed, setIsAddingMed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  
 
  const [newMed, setNewMed] = useState({
    name: '',
    dosage: '',
    frequency: 'daily',
    time_of_day: ['morning'],
    notes: ''
  });

  useEffect(() => {
    fetchMedications();
    
  }, []);

  

  

  const fetchMedications = async () => {
    try {
      const { data, error } = await supabase
        .from('medications')
        .select('*')
        .order('next_dose', { ascending: true });

      if (error) throw error;
      setMedications(data || []);
    } catch (error) {
      toast.error('Error fetching medications');
    }
  };

  const handleAddMedication = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('medications').insert([
        {
          ...newMed,
          user_id: user?.id,
          next_dose: new Date().toISOString()
        }
      ]);

      if (error) throw error;
      
      setIsAddingMed(false);
      setNewMed({
        name: '',
        dosage: '',
        frequency: 'daily',
        time_of_day: ['morning'],
        notes: ''
      });
      fetchMedications();
      toast.success('Medication added successfully');
    } catch (error) {
      toast.error('Error adding medication');
    }
  };

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
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Your Medications</h2>
                <button
                  onClick={() => setIsAddingMed(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Medication
                </button>
              </div>

              {isAddingMed && (
                <div className="mb-6 bg-white shadow sm:rounded-lg p-6">
                  <form onSubmit={handleAddMedication}>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          required
                          value={newMed.name}
                          onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Dosage</label>
                        <input
                          type="text"
                          required
                          value={newMed.dosage}
                          onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Frequency</label>
                        <select
                          value={newMed.frequency}
                          onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="as_needed">As needed</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Time of Day</label>
                        <select
                          value={newMed.time_of_day[0]}
                          onChange={(e) => setNewMed({ ...newMed, time_of_day: [e.target.value] })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        >
                          <option value="morning">Morning</option>
                          <option value="afternoon">Afternoon</option>
                          <option value="evening">Evening</option>
                          <option value="bedtime">Bedtime</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">Notes</label>
                      <textarea
                        value={newMed.notes}
                        onChange={(e) => setNewMed({ ...newMed, notes: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>
                    <div className="mt-4 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsAddingMed(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                  {medications.map((med) => (
                    <li key={med.id} className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{med.name}</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {med.dosage} - {med.frequency} ({med.time_of_day.join(', ')})
                          </p>
                          {med.notes && (
                            <p className="mt-2 text-sm text-gray-500">{med.notes}</p>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          Next dose: {new Date(med.next_dose).toLocaleString()}
                        </div>
                      </div>
                    </li>
                  ))}
                  {medications.length === 0 && (
                    <li className="p-6 text-center text-gray-500">
                      No medications added yet. Click the "Add Medication" button to get started.
                    </li>
                  )}
                </ul>
              </div>
            </>
           
        </div>
      </main>
    </div>
  );
}