import { STORE_URL } from "@/config/url.config"
import { productService } from "@/services/auth/product.service"
import { IProductInput } from "@/shared/types/product.service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { useMemo } from "react"
import toast from "react-hot-toast"

export const useGetProducts = () => {
    const params = useParams<{storeId: string}>()

    const {data: products, isLoading} = useQuery({
        queryKey: ['get products for store dashboard'],
        queryFn: () => productService.getByStoreId(params.storeId)
    })

    return useMemo(() => ({products, isLoading}), [products, isLoading])
}