import React, { useState } from 'react';
import { UserCircle, User, Shield, X } from 'lucide-react';
import { useAuth } from '../helper/AuthContext';

export default function LoginModal() {
  const { closeModal, openRegisterModal } = useAuth();
  const [activeTab, setActiveTab] = useState('parent');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPassword, setParentPassword] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold text-blue-900">Login to SOF Prep Excellence</h2>
            <p className="text-sm text-gray-500">Enter your credentials to access your account</p>
          </div>
          <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X className="size-5" />
          </button>
        </div>

        <div>
          <div className="flex border-b mb-4">
            <button
              onClick={() => setActiveTab('parent')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium ${activeTab === 'parent' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <UserCircle className="size-4" />
              Parent
            </button>
            <button
              onClick={() => setActiveTab('student')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium ${activeTab === 'student' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <User className="size-4" />
              Student
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium ${activeTab === 'admin' ? 'border-b-2 border-orange-600 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Shield className="size-4" />
              Admin
            </button>
          </div>

          {activeTab === 'parent' && (
            <form className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="parent-email" className="text-sm font-medium text-gray-700">Email</label>
                <input id="parent-email" type="email" placeholder="parent@example.com" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="space-y-1">
                <label htmlFor="parent-password" className="text-sm font-medium text-gray-700">Password</label>
                <input id="parent-password" type="password" placeholder="Enter your password" value={parentPassword} onChange={(e) => setParentPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md">
                Login as Parent
              </button>
            </form>
          )}

          {activeTab === 'student' && (
            <form className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="student-email" className="text-sm font-medium text-gray-700">Student ID / Email</label>
                <input id="student-email" type="text" placeholder="student@example.com" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div className="space-y-1">
                <label htmlFor="student-password" className="text-sm font-medium text-gray-700">Password</label>
                <input id="student-password" type="password" placeholder="Enter your password" value={studentPassword} onChange={(e) => setStudentPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md">
                Login as Student
              </button>
            </form>
          )}

          {activeTab === 'admin' && (
            <form className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="admin-email" className="text-sm font-medium text-gray-700">Admin Email</label>
                <input id="admin-email" type="email" placeholder="admin@sof.com" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div className="space-y-1">
                <label htmlFor="admin-password" className="text-sm font-medium text-gray-700">Password</label>
                <input id="admin-password" type="password" placeholder="Enter admin password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-md">
                Login as Admin
              </button>
            </form>
          )}
        </div>

        <div className="pt-4 mt-4 border-t">
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => {
                closeModal();
                openRegisterModal();
              }}
              className="text-blue-600 hover:underline font-medium"
            >
              Register as Parent
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}