import { colorService } from "@/services/color.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export function useGetColors() {
    const params = useParams<{storeId: string}>()

    const {data: colors, isLoading} = useQuery({
        queryKey: ['get colors for store dashboard'],
        queryFn: () => colorService.getByStoreId(params.storeId)
    })

    return useMemo(() => ({colors, isLoading}), [colors, isLoading])
}