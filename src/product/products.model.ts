import { Document } from 'mongoose';

export interface Products extends Document {
    name:String,
    category_id:String
} 