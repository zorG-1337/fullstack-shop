import { axiosClassic, axiosWithAuth } from "@/api/api.interceptors";
import { API_URL } from "@/config/api.config";
import { ICategory, ICategoryInput } from "@/shared/types/category.interface";

class CategoryService {

    async getByStoreId(id: string) {
        const { data } = await axiosWithAuth<ICategory[]>({
            url: API_URL.categories(`/by-storeId/${id}`),
            method: 'GET'
        })

        return data
    }

    async getById(id: string) {
        const { data } = await axiosClassic<ICategory>({
            url: API_URL.categories(`/by-id/${id}`),
            method: 'GET'
        })

        return data
    }

    async create(data: ICategoryInput, storeId: string) {
        const response = await axiosWithAuth<ICategory>({
            url: API_URL.categories(`/${storeId}`),
            method: 'POST',
            data
        })

        return response.data
    }

    async update(id: string, data: ICategoryInput) {
        const response = await axiosWithAuth<ICategory>({
            url: API_URL.categories(`/${id}`),
            method: 'PUT',
            data
        })

        return response.data
    }

    async delete(id: string) {
        const response = await axiosWithAuth<ICategory>({
            url: API_URL.categories(`/${id}`),
            method: 'DELETE'
        })

        return response.data
    }
}

export const categoryService = new CategoryService()