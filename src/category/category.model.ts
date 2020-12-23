import { Document, Types, ObjectId } from 'mongoose';
import { Products } from 'src/product/products.schema';

export interface Category extends Document {
    name:String,
    products:Types.ObjectId
} 