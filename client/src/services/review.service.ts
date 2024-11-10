import { axiosWithAuth } from "@/api/api.interceptors"
import { API_URL } from "@/config/api.config"
import { IReview, IReviewInput } from "@/shared/types/review.interface"

class ReviewService {
    async getByStoreId(id: string) {
        const response = await axiosWithAuth<IReview[]>({
            url: API_URL.reviews(`by-storeId/${id}`),
            method: 'GET'
        })

        return response.data
    }

    async create(data: IReviewInput, productId: string, storeId: string) {
        const response = await axiosWithAuth<IReview>({
            url: API_URL.reviews(`/productId/storeId`),
            method: 'POST',
            data
        })

        return response.data
    }

    async delete(id: string) {
        const response = await axiosWithAuth<IReview>({
            url: API_URL.reviews(`/${id}`),
            method: 'DELETE'
        })

        return response.data
    }
}

export const reviewService = new ReviewService()