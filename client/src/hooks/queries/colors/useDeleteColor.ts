import { STORE_URL } from "@/config/url.config"
import { productService } from "@/services/auth/product.service"
import { colorService } from "@/services/color.service"
import { IColorInput } from "@/shared/types/color.interface"
import { IProductInput } from "@/shared/types/product.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { useMemo } from "react"
import toast from "react-hot-toast"

export const useDeleteColor = () => {
    const params = useParams<{storeId: string, colorId: string}>()
    const { push } = useRouter()

    const queryClient = useQueryClient()

    const {mutate: deleteColor, isPending: isLoadingDelete} = useMutation({
        mutationKey: ['delete color'],
        mutationFn: () => colorService.delete(params.colorId),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['get colors for store dashboard']
            })
            toast.success("Цвет удалён")
            push(STORE_URL.products(params.storeId))
        },
        onError() {
            toast.error("Ошибка при удалении цвета")
        }
    })

    return useMemo(() => ({deleteColor, isLoadingDelete}), [deleteColor, isLoadingDelete])
}