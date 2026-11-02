import { IsEmail, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Matches, Max, Min, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, {message: "Full name must be at least 3 characters long"})
  fullName: string;

  @IsNotEmpty()
  @IsEmail({},{message: "Email must be a valid email address"})
  email: string;

  @IsString()
  @MinLength(8, { message: 'password must be at least 8 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/, {
    message: 'password must contain uppercase, lowercase, number and special character',
  })
  password: string;

  @IsInt({ message: 'age must be an integer' })
  @Min(18, { message: 'age must be at least 18' })
  @Max(60, { message: 'age must not exceed 60' })
  age: number;

  @IsString()
  @Matches(/^01\d{9}$/, { message: 'phone must be exactly 11 digits and begin with 01' })
  phone: string;

  @IsIn(['student', 'teacher'], { message: 'accountType must be either student or teacher' })
  accountType: string;

  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'address must be at least 10 characters' })
  address?: string;
}
