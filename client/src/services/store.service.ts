import { axiosWithAuth } from "@/api/api.interceptors";
import { API_URL } from "@/config/api.config";
import { IColorInput } from "@/shared/types/color.interface";
import { IStore, IStoreCreate, IStoreEdit } from "@/shared/types/store.interface";

class StoreService {

    async getById(id: string) {
        const { data } = await axiosWithAuth<IStore>({
            url: API_URL.stores(`/by-id/${id}`),
            method: 'GET'
        })

        return data
    }

    async create(data: IStoreCreate) {
        const response = await axiosWithAuth<IStore>({
            url: API_URL.stores(''),
            method: 'POST',
            data
        })

        return response.data
    }

    async update(id: string, data: IStoreEdit) {
        const response = await axiosWithAuth<IStore>({
            url: API_URL.stores(`/${id}`),
            method: 'PUT',
            data
        })

        return response.data
    }

    async delete(id: string) {
        const response = await axiosWithAuth<IStore>({
            url: API_URL.stores(`/${id}`),
            method: 'DELETE'
        })

        return response.data
    }
}

export const storeService = new StoreService()