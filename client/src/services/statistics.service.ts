import { axiosWithAuth } from "@/api/api.interceptors"
import { API_URL } from "@/config/api.config"
import { IMainStatistics, IMiddleStatistics } from "@/shared/types/statistics.interface"

class StatisticsService {
    async getMain(storeId: string) {
        const { data } = await axiosWithAuth<IMainStatistics[]>({
            method: 'GET',
            url: API_URL.statistics(`/main/${storeId}`)
        })

        return data
    }

    async getMiddle(storeId: string) {
        const { data } = await axiosWithAuth<IMiddleStatistics>({
            method: 'GET',
            url: API_URL.statistics(`/middle/${storeId}`)
        })

        return data
    }
}

export const statisticsService = new StatisticsService()