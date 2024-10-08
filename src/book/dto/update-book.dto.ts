import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Category } from "../schemas/book.schema";


export class updateBookDto {
  @IsOptional()
  @IsString()
  readonly title:string;

  @IsOptional()
  @IsString()
  readonly description:string;

  @IsOptional()
  @IsString()
  readonly author:string;

  @IsOptional()
  @IsNumber()
  readonly price:number;

  @IsOptional()
  @IsEnum(Category, {message:'Please enter a correct category'})
  readonly category:Category;
}