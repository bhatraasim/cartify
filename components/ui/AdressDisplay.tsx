'use client'
import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import AddressForm from './AdressForm';

interface AddressDisplayProps {
  initialAddresses: Array<{
    _id: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
  }>;
}

export default function AddressDisplay({ initialAddresses }: AddressDisplayProps) {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [isPending, startTransition] = useTransition();
  const [formOpen, setFormOpen] = useState<boolean>(false)

  const handleEdit = (addressId: string) => {
    console.log('Edit address:', addressId);
    // Add edit functionality here
  };

  const handleDelete = (addressId: string) => {
    startTransition(() => {
      // Add delete server action here
      setAddresses(addresses.filter(addr => addr._id !== addressId));
    });
  };

  const handleSetDefault = (addressId: string) => {
    console.log('Set as default:', addressId);
    // Add set default functionality here
  };

  if (addresses.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Addresses Found</h3>
          
        </div>
      </div>
    );
  }

  
    if(!formOpen){
      return ( 
        <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
          <p className="text-gray-600">Manage your shipping addresses</p>
        </div>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold" onClick={()=> setFormOpen( prev => !prev)}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Address
        </Button>
      </div>

      {/* Address Cards Grid */}
      <div className="grid gap-6  md:grid-cols-2 lg:grid-cols-3 ">
        {addresses.map((address, index) => (
          <div
            key={address._id}
            className="group relative bg-white rounded-2xl  shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-yellow-300"
          >
            {/* Default Badge */}
            {index === 0 && (
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                <span className="mr-1">⭐</span>
                Default
              </div>
            )}

            {/* Address Content */}
            <div className="space-y-3">
              {/* Primary Address */}
              <div className="space-y-1">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                      {address.addressLine1}
                    </h3>
                    {address.addressLine2 && (
                      <p className="text-gray-600 text-sm leading-tight">
                        {address.addressLine2}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div className="space-y-2 ml-4">
                <div className="flex items-center text-gray-700">
                  <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-medium">
                    {address.city}, {address.state} {address.postalCode}
                  </span>
                </div>

                <div className="flex items-center text-gray-700">
                  <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium">{address.country}</span>
                </div>

                {address.phone && (
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm font-medium">{address.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-gray-100 ">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  
                  
                  {index !== 0 && (
                    <button
                      onClick={() => handleSetDefault(address._id)}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      Default
                    </button>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(address._id)}
                  disabled={isPending}
                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-full hover:bg-red-100 transition-colors disabled:opacity-50"
                >
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>

            {/* Hover Effect Gradient */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
      )
    }
    else{
      return(
        <AddressForm />
      )
    }
    
  
}
