import mongoose from "mongoose";

const { Schema, model } = mongoose;

const adIdSchema = new Schema({
  adId: {
    require: true,
    unique: true,
    type: Number
  }
});

const adId = model('productids', adIdSchema);

export default adId;