import { STORE_URL } from "@/config/url.config"
import { productService } from "@/services/auth/product.service"
import { colorService } from "@/services/color.service"
import { IColorInput } from "@/shared/types/color.interface"
import { IProductInput } from "@/shared/types/product.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { useMemo } from "react"
import toast from "react-hot-toast"

export const useCreateColor = () => {
    const params = useParams<{storeId: string}>()
    const { push } = useRouter()

    const queryClient = useQueryClient()

    const {mutate: createColor, isPending: isLoadingCreate} = useMutation({
        mutationKey: ['create color'],
        mutationFn: (data: IColorInput) => colorService.create(data, params.storeId),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['get colors for store dashboard']
            })
            toast.success("Цвет создан")
            push(STORE_URL.products(params.storeId))
        },
        onError() {
            toast.error("Ошибка при создании цвета")
        }
    })

    return useMemo(() => ({createColor, isLoadingCreate}), [createColor, isLoadingCreate])
}