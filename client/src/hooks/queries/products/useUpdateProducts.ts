import { STORE_URL } from "@/config/url.config"
import { productService } from "@/services/auth/product.service"
import { IProductInput } from "@/shared/types/product.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { useMemo } from "react"
import toast from "react-hot-toast"

export const useUpdateProducts = () => {
    const params = useParams<{storeId: string}>()

    const queryClient = useQueryClient()

    const {mutate: updateProduct, isPending: isLoadingUpdate} = useMutation({
        mutationKey: ['update product'],
        mutationFn: (data: IProductInput) => productService.update(params.storeId, data),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['get products for store dashboard']
            })
            toast.success("Товар обновлён")
        },
        onError() {
            toast.error("Ошибка при обновлении товара")
        }
    })

    return useMemo(() => ({updateProduct, isLoadingUpdate}), [updateProduct, isLoadingUpdate])
}