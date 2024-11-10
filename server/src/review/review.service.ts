import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductService } from 'src/product/product.service';
import { ReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewService {
    constructor(private readonly prisma: PrismaService, private readonly productService: ProductService) {}

    async getByStoreId(storeId: string) {  // Получение цветов для конкретного магазина
        return this.prisma.review.findMany({
            where: {
                storeId
            },
            include: {
                user: true
            }
        })
    }

    async getById(id: string, userId: string) {
        const review = await this.prisma.review.findUnique({
            where: {
                id,
                userId
            },
            select: {
                user: true
            }    
        })

        if(!review) {
            throw new NotFoundException("Отзыв не найден или вы его не написали.")
        }

        return review
    }

    async create(userId: string, productId: string, storeId: string, dto: ReviewDto) {
        await this.productService.getById(productId)

        return this.prisma.review.create({
            data: {
                ...dto,
                product: {
                    connect: {
                        id: productId
                    }
                },
                user: {
                    connect: {
                        id: userId
                    }
                },
                store: {
                    connect: {
                        id: storeId
                    }
                }
            }
        })
    }

    async delete(id: string, userId: string) {
        await this.getById(id, userId)

        return this.prisma.review.delete({
            where: {
                id
            }
        })
    }
}
