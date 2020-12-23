import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.model'
import { CreateCategoryDTO } from "./dto/category.dto";

@Injectable()
export class CategoryService {

    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) {}

    // Get all Categorys
    async getCategories(): Promise<Category[]> {
        const categories = await this.categoryModel.find();
        return categories;
    }
    
    // Get a single Categories
    async getCategory(categoryID: string): Promise<Category> {
        const category = await this.categoryModel
        .findById(categoryID).populate('products')
        return category;
    }

    // Post a single Category
    async createCategory(CreateCategoryDTO: CreateCategoryDTO): Promise<Category> {
        const newCategory = new this.categoryModel(CreateCategoryDTO);
        return newCategory.save();
    }

    // Delete Category
    async deleteCategory(categoryID): Promise<any> {
        const deletedCategory = await this.categoryModel.findOneAndDelete(categoryID);
        return deletedCategory;
    }

    // Put a single Category
    async updateCategory(categoryID: string, CreateCategoryDTO : CreateCategoryDTO): Promise<Category> {
        const updatedCategory = await this.categoryModel.findByIdAndUpdate(categoryID, CreateCategoryDTO, {new: true});
        return updatedCategory;
    }

}