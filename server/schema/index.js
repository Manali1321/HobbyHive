const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});
const Category = mongoose.model('Category', CategorySchema);
const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});
const Service = mongoose.model('Service', ServiceSchema);

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true
  },
  last_name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  phone: {
    type: Number,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  role: {
    type: String,
    enum: ['buyer', 'seller', 'admin'],
    default: 'buyer'
  }
});
const User = mongoose.model('User', UserSchema);

const BuyerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  }
});
const Buyer = mongoose.model('Buyer', BuyerSchema);

const SellerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
    required: true,
  },
  seller_image: {
    type: String,
    required: true
  },
  workpermit: {
    type: String,
    required: true
  },
  sin: {
    type: String,
    required: true
  },
  business_number: {
    type: String,
    required: true
  },
  resume: {
    type: String,
    required: false
  },
  portfolio: {
    type: String,
    required: false
  }
})

const Seller = mongoose.model("Seller", SellerSchema);
module.exports = { Service, Category, User, Buyer, Seller };