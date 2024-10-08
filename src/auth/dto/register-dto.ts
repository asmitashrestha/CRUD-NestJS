import { IsEmail, IsNotEmpty,IsString, MinLength } from "class-validator";


export class registerDto {
  @IsNotEmpty()
  @IsString()
  readonly firstName:string;

  @IsNotEmpty()
  @IsString()
  readonly lastName:string;

  @IsNotEmpty()
  @IsEmail({},{message:"Please enter correct email"})
  readonly email:string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password:string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly confirmPassword:string;

  
}