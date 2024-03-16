import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userInfoSchema = new Schema({
    fullname: {
        require: true,
        type: String
    },
    userEmail: {
        require: true,
        type: String,
        unique: true
    },
    phoneNumber: {
      require: true,
      type: String
    },
    userImg: String,
    cartsIdForBasket: {
        require: true,
        type: Array
    },
    "_id": {
        require: true,
        type: String,
        unique: true 
    }
});

const UserInfo = model('userinfos', userInfoSchema);

export default UserInfo;