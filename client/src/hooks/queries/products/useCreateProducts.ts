import { STORE_URL } from "@/config/url.config"
import { productService } from "@/services/auth/product.service"
import { IProductInput } from "@/shared/types/product.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { useMemo } from "react"
import toast from "react-hot-toast"

export const useCreateProducts = () => {
    const params = useParams<{storeId: string}>()
    const { push } = useRouter()

    const queryClient = useQueryClient()

    const {mutate: createProduct, isPending: isLoadingCreate} = useMutation({
        mutationKey: ['create product'],
        mutationFn: (data: IProductInput) => productService.create(data, params.storeId),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['get products for store dashboard']
            })
            toast.success("Товар создан")
            push(STORE_URL.products(params.storeId))
        },
        onError() {
            toast.error("Ошибка при создании товара")
        }
    })

    return useMemo(() => ({createProduct, isLoadingCreate}), [createProduct, isLoadingCreate])
}