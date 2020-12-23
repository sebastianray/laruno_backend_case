import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Query, Put } from '@nestjs/common';
import { CategoryService } from "./category.service";

import { CreateCategoryDTO } from "./dto/category.dto";

@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService) { }

    // Add Category: /category/create
    @Post('/create')
    async createCategory(@Res() res, @Body() createCategoryDTO: CreateCategoryDTO) {
        const category = await this.categoryService.createCategory(createCategoryDTO);
        return res.status(HttpStatus.OK).json({
            message: 'category Successfully Created',
            category
        });
    }

    // Get Categories /category/all
    @Get('/all')
    async getCategories(@Res() res) {
        const categories = await this.categoryService.getCategories();
        return res.status(HttpStatus.OK).json(categories);
    }

    // GET single category: /category/5c9d46100e2e5c44c444b2d1
    @Get('/:categoryID')
    async getCategory(@Res() res, @Param('categoryID') categoryID) {
        const category = await this.categoryService.getCategory(categoryID);
        if (!category) throw new NotFoundException('category does not exist!');
        return res.status(HttpStatus.OK).json(category);
    }

    // Delete Category: /delete?categoryID=5c9d45e705ea4843c8d0e8f7
    @Delete('/delete')
    async deleteCategory(@Res() res, @Query('categoryID') categoryID) {
        const categoryDeleted = await this.categoryService.deleteCategory(categoryID);
        if (!categoryDeleted) throw new NotFoundException('Category does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Category Deleted Successfully',
            categoryDeleted
        });
    }

    // Update Category: /update?categoryID=5c9d45e705ea4843c8d0e8f7
    @Put('/update')
    async updateCategory(@Res() res, @Body() createCategoryDTO: CreateCategoryDTO, @Query('categoryID') categoryID) {
        const updatedCategory = await this.categoryService.updateCategory(categoryID, createCategoryDTO);
        if (!updatedCategory) throw new NotFoundException('Category does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Category Updated Successfully',
            updatedCategory 
        });
    }

}