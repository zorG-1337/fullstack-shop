import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ColorDto } from './dto/color.dto';

@Injectable()
export class ColorService {
    public constructor(private readonly prisma: PrismaService) {}

    async getByStoreId(storeId: string) {  // Получение цветов для конкретного магазина
        return await this.prisma.color.findMany({
            where: {
                storeId
            }
        })
    }

    async getById(id: string) {
        const color = await this.prisma.color.findUnique({
            where: {
                id
            }    
        })

        if(!color) {
            throw new NotFoundException("Цвет не найден.")
        }

        return color
    }

    async create(storeId: string, dto: ColorDto) {
        return await this.prisma.color.create({
            data: {
                name: dto.name,
                value: dto.value,
                storeId
            }
        })
    }

    async update(id: string, dto: ColorDto) {
        await this.getById(id)

        return await this.prisma.color.update({
            where: {
                id
            },
            data: dto
        })
    }

    async delete(id: string) {
        await this.getById(id)

        return await this.prisma.color.delete({
            where: {
                id
            }
        })
    }
}
