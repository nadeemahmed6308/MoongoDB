import mongoose from 'mongoose';
const { Schema } = mongoose;

const adsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    category: {
    required: true,
    type: String
  },
  date: {
    required: true,
    type: Number
  },
  firstname: {
    required: true,
    type: String
  },
  lastname: {
    required: true,
    type: String
  },
  images: {
    required: true,
    type: Array
  },
  latitude: {
    required: true,
    type: String
  },
  longitude: {
    required: true,
    type: String
  },
  productId: {
    required: true,
    type: String
  },
  thumbnail: {
    required: true,
    type: String
  },
  userEmail: {
    required: true,
    type: String,
    unique: true
  },
  userImg: String
});

const Ads = mongoose.model('ads', adsSchema);

export default Ads
