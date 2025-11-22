import React, { useState } from 'react';
import { UserCircle, User, Mail, Phone, Lock, X } from 'lucide-react';
import { useAuth } from '../helper/AuthContext';

function RegistrationModal() {
    const { closeModal, openLoginModal } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-xl font-semibold text-blue-900 flex items-center gap-2">
                            <UserCircle className="size-6" />
                            Parent Registration
                        </h2>
                        <p className="text-sm text-gray-500">
                            Create your parent account to get started with SOF Prep Excellence
                        </p>
                    </div>
                    <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <X className="size-5" />
                    </button>
                </div>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                        <div className="relative"><User className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" /><input id="name" type="text" placeholder="Enter your full name" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} className={`pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : ''}`} /></div>
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                        <div className="relative"><Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" /><input id="email" type="email" placeholder="parent@example.com" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className={`pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`} /></div>
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                        <div className="relative"><Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" /><input id="phone" type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className={`pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : ''}`} /></div>
                        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
                        <div className="relative"><Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" /><input id="password" type="password" placeholder="Create a password (min. 6 characters)" value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} className={`pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`} /></div>
                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
                        <div className="relative"><Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" /><input id="confirmPassword" type="password" placeholder="Re-enter your password" value={formData.confirmPassword} onChange={(e) => handleInputChange('confirmPassword', e.target.value)} className={`pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword ? 'border-red-500' : ''}`} /></div>
                        {errors.confirmPassword && (<p className="text-sm text-red-500">{errors.confirmPassword}</p>)}
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-2">
                        <p className="text-sm text-blue-900"><strong>Parent Account Benefits:</strong></p>
                        <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                            <li>Create and manage multiple child accounts</li>
                            <li>Access to resource library and study materials</li>
                            <li>Generate custom tests for your children</li>
                            <li>Monitor performance and track progress</li>
                        </ul>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-700">
                            <strong>Note:</strong> Student accounts are created by parents. After registration, you can add your children from the parent dashboard.
                        </p>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md cursor-pointer">
                        Create Parent Account
                    </button>
                </form>

                <div className="pt-4 mt-4 border-t">
                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <button type="button" onClick={() => { closeModal(); openLoginModal(); }} className="text-blue-600 hover:underline font-medium cursor-pointer">
                            Login here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegistrationModal