import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { productsSchema } from './product/products.schema';
import { ProductsController } from './product/products.controller'
import { ProductsService } from './product/products.service'
import { categorySchema } from './category/category.schema';
import { CategoryController } from './category/category.controller'
import { CategoryService } from './category/category.service'

@Module({
  imports: [
    MongooseModule.forFeature([{
    name:'Products',
    schema:productsSchema,
    collection:'Products-dev'
  }]), 
    MongooseModule.forFeature([{
    name:'Category',
    schema:categorySchema,
    collection:'Category-dev'
  }]),
  MongooseModule.forRoot("mongodb://localhost:27017/ProductCategoryDB")
],
  controllers: [AppController, ProductsController, CategoryController],
  providers: [AppService, ProductsService, CategoryService],
})
export class AppModule {}
