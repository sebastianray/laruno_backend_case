import { ObjectId } from "mongoose";
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCategoryDTO {
    @IsNotEmpty()
    readonly name: string;
    // readonly products: Products;
}