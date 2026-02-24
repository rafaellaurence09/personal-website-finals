import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateGuestbookDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(100, { message: 'Name must be less than 100 characters' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Message is required' })
  @MinLength(5, { message: 'Message must be at least 5 characters' })
  @MaxLength(500, { message: 'Message must be less than 500 characters' })
  message: string;
}