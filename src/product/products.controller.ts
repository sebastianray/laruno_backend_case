import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Query, Put } from '@nestjs/common';
import { ProductsService } from "./products.service";
import { CreateProductDTO } from "./dto/product.dto";
import { ApiConsumes } from '@nestjs/swagger';

@Controller('product')
export class ProductsController {

    constructor(private productService: ProductsService) { }

    // Add Product: /product/create
    @Post('/create')
    async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        const product = await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Product Successfully Created',
            product
        });
    }

    // Get Products /product
    @Get('/all')
    async getProducts(@Res() res) {
        const products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json(products);
    }

    // GET single product: /product/5c9d46100e2e5c44c444b2d1
    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID) {
        const product = await this.productService.getProduct(productID);
        if (!product) throw new NotFoundException('Product does not exist!');
        return res.status(HttpStatus.OK).json(product);
    }

    // Delete Product: /delete?productID=5c9d45e705ea4843c8d0e8f7
    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID') productID) {
        const productDeleted = await this.productService.deleteProduct(productID);
        if (!productDeleted) throw new NotFoundException('Product does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Product Deleted Successfully',
            productDeleted
        });
    }

    // Update Product: /update?productID=5c9d45e705ea4843c8d0e8f7
    @Put('/update')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productID') productID) {
        const updatedProduct = await this.productService.updateProduct(productID, createProductDTO);
        if (!updatedProduct) throw new NotFoundException('Product does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Product Updated Successfully',
            updatedProduct 
        });
    }
     // Delete Product: /deletemultiple?category_id=5c9d45e705ea4843c8d0e8f7
     @Delete('/deletemultiple')
     async deleteMultipleProduct(@Res() res, @Query('category_id') category_id) {
         const productDeleted = await this.productService.deleteMultipleProduct(category_id);
         if (!productDeleted) throw new NotFoundException('Product does not exist!');
         return res.status(HttpStatus.OK).json({
             message: 'Products Deleted Successfully',
             productDeleted
         });
     }
}