import { STORE_URL } from "@/config/url.config"
import { productService } from "@/services/auth/product.service"
import { categoryService } from "@/services/category.service"
import { colorService } from "@/services/color.service"
import { ICategoryInput } from "@/shared/types/category.interface"
import { IColorInput } from "@/shared/types/color.interface"
import { IProductInput } from "@/shared/types/product.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { useMemo } from "react"
import toast from "react-hot-toast"

export const useCreateCategory = () => {
    const params = useParams<{storeId: string}>()
    const { push } = useRouter()

    const queryClient = useQueryClient()

    const {mutate: createColor, isPending: isLoadingCreate} = useMutation({
        mutationKey: ['create category'],
        mutationFn: (data: ICategoryInput) => categoryService.create(data, params.storeId),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['get categories for store dashboard']
            })
            toast.success("Категория создана")
            push(STORE_URL.products(params.storeId))
        },
        onError() {
            toast.error("Ошибка при создании категории")
        }
    })

    return useMemo(() => ({createColor, isLoadingCreate}), [createColor, isLoadingCreate])
}