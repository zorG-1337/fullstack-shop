import { statisticsService } from "@/services/statistics.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export function useGetStatistics() {
    const params = useParams<{storeId: string}>()

    const {data: main} = useQuery({
        queryKey: ['get main statisctics'],
        queryFn: () => statisticsService.getMain(params.storeId)
    })

    const {data: middle} = useQuery({
        queryKey: ['get middle statisctics'],
        queryFn: () => statisticsService.getMiddle(params.storeId)
    })

    return useMemo(() => ({main, middle}), [main, middle])
}