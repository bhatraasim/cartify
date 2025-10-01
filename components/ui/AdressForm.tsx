'use client'

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { addAddress } from '@/app/actions/address';
import { IAddress } from '@/model/Address';
import { Types } from 'mongoose';

// Form data type (without MongoDB-specific fields)
type AddressFormData = Omit<IAddress, '_id' | 'userId' | 'createdAt' | 'updatedAt'>;

interface AddressFormProps {
  onSubmit?: (addressData: AddressFormData) => void;
  initialData?: Partial<IAddress>;
  isEditing?: boolean;
  onSuccess?: () => void;
}

export default function AddressForm({ 
  onSubmit, 
  initialData, 
  isEditing = false, 
  onSuccess 
}: AddressFormProps) {
  const [isPending, startTransition] = useTransition();
  
  // Form state with proper typing
  const [formData, setFormData] = useState<AddressFormData>({
    addressLine1: initialData?.addressLine1 || '',
    addressLine2: initialData?.addressLine2 || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    postalCode: initialData?.postalCode || '',
    country: initialData?.country || 'India',
    phone: initialData?.phone || ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AddressFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof AddressFormData, string>> = {};
    
    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    }
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }
    if (!formData.phone?.trim()) {
      newErrors.phone = 'phone number is required';
    }
    
    // Phone validation - make it required if you want
    if (formData.phone && !/^[\+]?[0-9\s\-\(\)]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    startTransition(async () => {
      try {
        const result = await addAddress(formData);
        
        if (result.success) {
          // Success feedback
          console.log('Address saved successfully!');
          
          // Reset form if adding new address
          if (!isEditing) {
            setFormData({
              addressLine1: '',
              addressLine2: '',
              city: '',
              state: '',
              postalCode: '',
              country: 'India',
              phone: ''
            });
          }
          
          // Call success callback
          if (onSuccess) onSuccess();
          
          // Call onSubmit prop if provided
          if (onSubmit) onSubmit(formData);
          
        } else {
          console.error('Failed to save address:', result.message);
        }
      } catch (error) {
        console.error('Form submission error:', error);
      }
    });
  };


  const handleInputChange = (field: keyof AddressFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-yellow-400  rounded-t-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold">
              {isEditing ? 'Edit Address' : 'Add New Address'}
            </h2>
            <p className="text-white/90 text-sm">
              Enter your complete shipping address
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-b-2xl shadow-xl border-t border-yellow-100">
        <div className="p-6 space-y-6">

          {/* Address Line 1 */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
              Street Address *
            </label>
            <input
              type="text"
              value={formData.addressLine1}
              onChange={(e) => handleInputChange('addressLine1', e.target.value)}
              placeholder="123 Main Street"
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-gray-50 focus:bg-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none ${
                errors.addressLine1 ? 'border-red-300' : 'border-gray-200'
              }`}
            />
            {errors.addressLine1 && (
              <p className="text-red-500 text-sm flex items-center">
                <span className="mr-1">⚠️</span> {errors.addressLine1}
              </p>
            )}
          </div>


          {/* Address Line 2 */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center">
              <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
              Apartment, Suite, etc. (Optional)
            </label>
            <input
              type="text"
              value={formData.addressLine2 || ''}
              onChange={(e) => handleInputChange('addressLine2', e.target.value)}
              placeholder="Apt 4B, Suite 100"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 transition-all duration-200 bg-gray-50 focus:bg-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none"
            />
          </div>

          {/* City and State Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                City *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Srinagar"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-gray-50 focus:bg-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none ${
                  errors.city ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.city && <p className="text-red-500 text-sm">⚠️ {errors.city}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                State / Province *
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                placeholder="Jammu & Kashmir"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-gray-50 focus:bg-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none ${
                  errors.state ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.state && <p className="text-red-500 text-sm">⚠️ {errors.state}</p>}
            </div>
          </div>

          {/* Postal Code and Country Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                Postal Code *
              </label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                placeholder="190001"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-gray-50 focus:bg-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none ${
                  errors.postalCode ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.postalCode && <p className="text-red-500 text-sm">⚠️ {errors.postalCode}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                Country *
              </label>
              <select
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-gray-50 focus:bg-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none ${
                  errors.country ? 'border-red-300' : 'border-gray-200'
                }`}
              >
                <option value="India">India</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
              {errors.country && <p className="text-red-500 text-sm">⚠️ {errors.country}</p>}
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center">
              <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+91 9876543210"
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-gray-50 focus:bg-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none ${
                errors.phone ? 'border-red-300' : 'border-gray-200'
              }`}
            />
            {errors.phone && <p className="text-red-500 text-sm">⚠️ {errors.phone}</p>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex space-x-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1 py-3 border-2 border-gray-300 hover:border-gray-400 bg-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="flex-1 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isPending ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2"></div>
                Saving...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span>{isEditing ? 'Update Address' : 'Save Address'}</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
