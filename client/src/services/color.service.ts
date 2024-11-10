import { axiosClassic, axiosWithAuth } from "@/api/api.interceptors";
import { API_URL } from "@/config/api.config";
import { IColor, IColorInput } from "@/shared/types/color.interface";

class ColorService {

    async getByStoreId(id: string) {
        const { data } = await axiosWithAuth<IColor[]>({
            url: API_URL.colors(`/by-storeId/${id}`),
            method: 'GET'
        })

        return data
    }

    async getById(id: string) {
        const { data } = await axiosWithAuth<IColor>({
            url: API_URL.colors(`/by-id/${id}`),
            method: 'GET'
        })

        return data
    }

    async create(data: IColorInput, storeId: string) {
        const response = await axiosWithAuth<IColor>({
            url: API_URL.colors(`/${storeId}`),
            method: 'POST',
            data
        })

        return response.data
    }

    async update(id: string, data: IColorInput) {
        const response = await axiosWithAuth<IColor>({
            url: API_URL.colors(`/${id}`),
            method: 'PUT',
            data
        })

        return response.data
    }

    async delete(id: string) {
        const response = await axiosWithAuth<IColor>({
            url: API_URL.colors(`/${id}`),
            method: 'DELETE'
        })

        return response.data
    }
}

export const colorService = new ColorService()