import { STORE_URL } from "@/config/url.config"
import { productService } from "@/services/auth/product.service"
import { colorService } from "@/services/color.service"
import { IColorInput } from "@/shared/types/color.interface"
import { IProductInput } from "@/shared/types/product.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { useMemo } from "react"
import toast from "react-hot-toast"

export const useUpdateColor = () => {
    const params = useParams<{colorId: string}>()

    const queryClient = useQueryClient()

    const {mutate: updateColor, isPending: isLoadingUpdate} = useMutation({
        mutationKey: ['delete color'],
        mutationFn: (data: IColorInput) => colorService.update(params.colorId, data),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['get colors for store dashboard']
            })
            toast.success("Цвет обновлён")
        },
        onError() {
            toast.error("Ошибка при обновлении цвета")
        }
    })

    return useMemo(() => ({updateColor, isLoadingUpdate}), [updateColor, isLoadingUpdate])
}