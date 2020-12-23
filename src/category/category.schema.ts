import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Products } from 'src/product/products.schema';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Products'})
  products: mongoose.Schema.Types.ObjectId;
}

export const categorySchema = SchemaFactory.createForClass(Category);