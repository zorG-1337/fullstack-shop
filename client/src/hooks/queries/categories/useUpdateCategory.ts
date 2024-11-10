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
    const params = useParams<{categoryId: string}>()

    const queryClient = useQueryClient()

    const {mutate: updateCategory, isPending: isLoadingUpdate} = useMutation({
        mutationKey: ['update category'],
        mutationFn: (data: ICategoryInput) => categoryService.update(params.categoryId, data),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['get categories for store dashboard']
            })
            toast.success("Категория обновлена")
        },
        onError() {
            toast.error("Ошибка при обновлении категории")
        }
    })

    return useMemo(() => ({updateCategory, isLoadingUpdate}), [updateCategory, isLoadingUpdate])
}