import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type ProductsDocument = Products & Document;

@Schema()
export class Products {
  
  @Prop({
    type: String,
    required: true
  })
  name: string; 

  @Prop()
  category_id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: mongoose.Schema.Types.ObjectId;
}

export const productsSchema = SchemaFactory.createForClass(Products);