import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ReviewDto } from './dto/review.dto';
import { CurrentUser } from 'src/user/decorators/user.decorator';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Auth()
  @Get('by-storeId/:storeId')
  async getByStoreId(@Param('storeId') storeId: string) {
    return this.reviewService.getByStoreId(storeId)
  }

  @HttpCode(HttpStatus.OK)
  @Auth()
  @Post(':productId/:storeId')
  @Post(':productId')
  async create(@Param('storeId') storeId: string, @Body() dto: ReviewDto, @CurrentUser('id') userId: string, @Param('productId') productId: string) {
    return this.reviewService.create(userId, productId, storeId, dto)
  }

  @Auth()
  @Delete(":id")
  async delete(@Param() id: string, @CurrentUser('id') userId: string) {
    return this.reviewService.delete(id, userId)
  }
}
