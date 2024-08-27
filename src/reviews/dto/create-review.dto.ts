import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: 'ProductID cannot be empty' })
  @IsNumber({}, { message: 'ProductID should be a number' })
  productId: number;

  @IsNotEmpty({ message: 'Ratings should not be empty' })
  @IsNumber()
  ratings: number;

  @IsNotEmpty({ message: 'comments should not be empty' })
  @IsString()
  comments: string;
}
