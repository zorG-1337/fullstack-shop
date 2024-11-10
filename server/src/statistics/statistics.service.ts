import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { PrismaService } from 'src/prisma.service';

dayjs.locale('ru')

const monthNames = [
    'янв',
    'фев',
    'мар',
    'апр',
    'мая',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
]

@Injectable()
export class StatisticsService {
    constructor(private readonly prisma: PrismaService) {}

    async getMainStatistics(storeId: string) {
        const totalRevenue = await this.calculateTotalRevenue(storeId)

        const productCount = await this.countProduct(storeId)
        const categoriesCount = await this.countCategories(storeId)

        const averageRating = await this.calculateAverageRating(storeId)

        return [
            {id: 1, name: 'Выручка', value: totalRevenue},
            {id: 2, name: 'Товары', value: productCount},
            {id: 3, name: 'Категории', value: categoriesCount},
            {id: 4, name: 'Средний рейтинг', value: averageRating || 0},
        ]
    }

    async getMiddleStatistics(storeId: string) {
        const monthlySales = await this.calculateMonthlySales(storeId)

        const lastUsers = await this.getLastUsers(storeId)

        return {monthlySales, lastUsers}
    }

    private async calculateTotalRevenue(storeId: string) {
        const orders = await this.prisma.order.findMany({
            where: {
                items: {
                    some: {
                        store: {
                            id: storeId
                        }
                    }
                }
            },
            include: {
                items: {
                    where: {
                        storeId
                    }
                }
            }
        })

        const totalRevenue = orders.reduce((acc, order) => {
            const total = order.items.reduce((itemAcc, item) => {
                return itemAcc + item.price * item.quantity
            }, 0)
            return acc + total
        }, 0)

        return totalRevenue
    }

    private async countProduct(storeId: string) {
        const productCount = await this.prisma.product.count({
            where: {
                storeId
            }
        })

        return productCount
    }

    private async countCategories(storeId: string) {
        const categoriesCount = await this.prisma.category.count({
            where: {
                storeId
            }
        })

        return categoriesCount
    }

    private async calculateAverageRating(storeId: string) {
        const averageRating = await this.prisma.review.aggregate({
            where: {
                storeId
            },
            _avg: {
                rating: true
            }
        })

        console.log(averageRating)

        return averageRating._avg.rating
    }

    private async calculateMonthlySales(storeId: string) {
        const startDate = dayjs().subtract(30, 'days').startOf('day').toDate()
        const endDate = dayjs().endOf('day').toDate()

        const salesRaw = await this.prisma.order.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate
                },
                items: {
                    some: {
                        storeId
                    }
                }
            },
            include: {
                items: true
            }
        })

        const formatDate = (date: Date): string => {
            return `${date.getDate()} ${monthNames[date.getMonth()]}` // 22 янв
        }

        const salesByDate = new Map<string, number>()

        salesRaw.forEach(order => {
            const formattedDate = formatDate(new Date(order.createdAt))

            const total = order.items.reduce((total, item) => {
                return total + item.price * item.quantity
            }, 0)

            if(salesByDate.has(formattedDate)) {
                salesByDate.set(formattedDate, salesByDate.get(formattedDate)! + total)
            } else {
                salesByDate.set(formattedDate, total)
            }
        })

        const monthlySales = Array.from(salesByDate, ([date, value]) => ({
            date, value
        }))

        return monthlySales
    }

    private async getLastUsers(storeId: string) {
        const lastUsers = await this.prisma.user.findMany({
            where: {
                orders: {
                    some: {
                        items: {
                            some: {
                                storeId
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 5,
            include: {
                orders: {
                    where: {
                        items: {
                            some: {
                                storeId
                            }
                        }
                    },
                    include: {
                        items: {
                            where: {
                                storeId
                            },
                            select: {
                                price: true
                            }
                        }
                    }
                }
            }
        })

        return lastUsers.map(user => {
            const lastOrder = user.orders[user.orders.length - 1]
            
            const total = lastOrder.items.reduce((total, item) => {
                return total + item.price
            }, 0)

            return {
                id: user.id,
                name: user.email,
                email: user.email,
                picture: user.picture,
                total
            }
        })
    }


    
}
