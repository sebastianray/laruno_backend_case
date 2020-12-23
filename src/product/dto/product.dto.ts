import { IsNotEmpty } from 'class-validator';

export class CreateProductDTO {
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    readonly category_id: string;
}