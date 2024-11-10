import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ColorService } from './color.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ColorDto } from './dto/color.dto';

@Controller('colors')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Auth()
  @Get('by-storeId/:storeId')
  async getByStoreId(@Param('storeId') storeId: string) {
    return this.colorService.getByStoreId(storeId)
  }

  @Auth()
  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.colorService.getById(id)
  }


  @HttpCode(HttpStatus.OK)
  @Auth()
  @Post(':storeId')
  async create(@Param('storeId') storeId: string, @Body() dto: ColorDto) {
    return this.colorService.create(storeId, dto)
  }

  @HttpCode(HttpStatus.OK)
  @Auth()
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: ColorDto) {
    return this.colorService.update(id, dto)
  }

  @HttpCode(HttpStatus.OK)
  @Auth()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.colorService.delete(id)
  }
}
