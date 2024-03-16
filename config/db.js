import mongoose from 'mongoose'
import { MONGO_URI } from './environment.js'
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(MONGO_URI)

export default mongoose





