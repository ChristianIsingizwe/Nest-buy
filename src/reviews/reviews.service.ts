import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly productService:ProductsService
  ) {}
  async create(createReviewDto: CreateReviewDto, currentUser: UserEntity):Promise<ReviewEntity> {
    const product = await this.productService.findOne(createReviewDto.productId)
    let review = await this.findOneByUserAndProduct(currentUser.id, createReviewDto.productId)
    if(!review){
      review = this.reviewRepository.create(createReviewDto)
      review.user = currentUser
      review.product = product
    }
    else{
      review.comment = createReviewDto.comments,
      review.ratings = createReviewDto.ratings
    }

    return await this.reviewRepository.save(review);
  }

  findAll() {
    return `This action returns all reviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }


  async findOneByUserAndProduct(userId:number, productId:number){
    return await this.reviewRepository.findOne({
      where:{
        user:{
          id:userId
        },
        product:{
          id: productId
        }
      },
      relations:{
        user:true,
        product:{
          category:true
        }
      }
    })
  }
}
