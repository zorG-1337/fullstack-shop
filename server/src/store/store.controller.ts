import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { StoreService } from './store.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Auth()
  @Get('by-id/:id')
  async getById(@Param('id') storeId: string, @CurrentUser('id') userId: string) {
    return this.storeService.getById(storeId, userId)
  }

  @HttpCode(HttpStatus.OK)
  @Auth()
  @Post()
  async create(@CurrentUser('id') userId: string, @Body() dto: CreateStoreDto) {
    return this.storeService.create(userId, dto)
  }

  @HttpCode(HttpStatus.OK)
  @Auth()
  @Put(':id')
  async update(@Param('id') storeId: string, @CurrentUser('id') userId: string, @Body() dto: UpdateStoreDto) {
    return this.storeService.update(storeId, userId, dto)
  }

  @HttpCode(HttpStatus.OK)
  @Auth()
  @Delete(':id')
  async delete(@Param('id') storeId: string, @CurrentUser('id') userId) {
    return this.storeService.delete(storeId, userId)
  }

}
