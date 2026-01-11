const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address.']
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, 'First name must be at least 2 characters long.']
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters long.']
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, 'Message must be at least 10 characters long.']
  },
  phoneNo: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Phone number must be a valid 10-digit number.']
  },
  countrycode: {
    type: String,
    required: true,
    match: [/^\+\d{1,4}$/, 'Country code must start with a + followed by up to 4 digits.']
  }
},
{ timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
