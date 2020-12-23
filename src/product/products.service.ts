import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from './products.model';
import { CreateProductDTO } from "./dto/product.dto";

@Injectable()
export class ProductsService {
    constructor(@InjectModel('Products') private readonly productModel: Model<Products>) {}

    // Get all products
    async getProducts(): Promise<Products[]> {
        const products = await this.productModel.find();
        return products;
    }
    
    // Get a single Product
    async getProduct(productID: string): Promise<Products> {
        const product = await this.productModel.findById(productID); 
        return product;
    }

    // Post a single product
    async createProduct(createProductDTO: CreateProductDTO): Promise<Products> {
        const newProduct = new this.productModel(createProductDTO);
        return newProduct.save();
    }

    // Delete Product
    async deleteProduct(productID): Promise<any> {
        const deletedProduct = await this.productModel.findOneAndDelete(productID);
        return deletedProduct;
    }

    // Put a single product
    async updateProduct(productID: string, createProductDTO: CreateProductDTO): Promise<Products> {
        const updatedProduct = await this.productModel.findByIdAndUpdate(productID, createProductDTO, {new: true});
        return updatedProduct;
    }

    // Delete Multiple Product
    async deleteMultipleProduct(category_id): Promise<any> {
        const deletedProduct = await this.productModel.deleteMany({"category_id" : category_id});
        return deletedProduct;
    }
}