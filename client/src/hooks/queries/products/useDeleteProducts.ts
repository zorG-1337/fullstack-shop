import { STORE_URL } from "@/config/url.config"
import { productService } from "@/services/auth/product.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { useMemo } from "react"
import toast from "react-hot-toast"

export const useDeleteProducts = () => {
    const params = useParams<{storeId: string}>()
    const { push } = useRouter()

    const queryClient = useQueryClient()

    const {mutate: deleteProduct, isPending: isLoadingDelete} = useMutation({
        mutationKey: ['delete product'],
        mutationFn: () => productService.delete(params.storeId),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['get products for store dashboard']
            })
            toast.success("Товар удалён")
            push(STORE_URL.products(params.storeId))
        },
        onError() {
            toast.error("Ошибка при удалении товара")
        }
    })

    return useMemo(() => ({deleteProduct, isLoadingDelete}), [deleteProduct, isLoadingDelete])
}