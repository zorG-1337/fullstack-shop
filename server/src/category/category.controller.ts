import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Auth()
  @Get('by-storeId/:storeId')
  async getByStoreId(@Param('storeId') storeId: string) {
    return this.categoryService.getByStoreId(storeId)
  }

  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.categoryService.getById(id)
  }


  @HttpCode(HttpStatus.OK)
  @Auth()
  @Post(':storeId')
  async create(@Param('storeId') storeId: string, @Body() dto: CategoryDto) {
    return this.categoryService.create(storeId, dto)
  }

  @HttpCode(HttpStatus.OK)
  @Auth()
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: CategoryDto) {
    return this.categoryService.update(id, dto)
  }

  @HttpCode(HttpStatus.OK)
  @Auth()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(id)
  }
}
