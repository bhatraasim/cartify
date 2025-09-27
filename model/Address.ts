// models/User.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IAddress {
  _id?: Types.ObjectId;
  userId : Types.ObjectId;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema<IAddress>({

  userId : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required: true  , index: true } ,

  addressLine1: {
    type: String,
    required: [true, 'Address line 1 is required'],
    trim: true,
    maxlength: [100, 'Address line 1 cannot exceed 100 characters']
  },
  addressLine2: {
    type: String,
    trim: true,
    maxlength: [100, 'Address line 2 cannot exceed 100 characters']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
    maxlength: [50, 'City cannot exceed 50 characters']
  },
  state: {
    type: String,
    required: [true, 'State/Province is required'],
    trim: true,
    maxlength: [50, 'State cannot exceed 50 characters']
  },
  postalCode: {
    type: String,
    required: [true, 'Postal code is required'],
    trim: true,
    validate: {
      validator: function(v: string) {
        // Basic validation for postal codes
        return /^[A-Za-z0-9\s-]{3,10}$/.test(v);
      },
      message: 'Invalid postal code format'
    }
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
    default: 'India',
    maxlength: [50, 'Country cannot exceed 50 characters']
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function(v: string) {
        return !v || /^[\+]?[0-9\s\-\(\)]{10,15}$/.test(v);
      },
      message: 'Invalid phone number format'
    }
  }
}, {
  timestamps: true
});



const Address = mongoose.models?.Address || mongoose.model('Address', AddressSchema);
export default Address;
