import { PUBLIC_URL } from "@/config/url.config";
import { storeService } from "@/services/store.service";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";

export function useDeleteStore() {
    const router = useRouter()

    const params = useParams<{storeId: string}>()

    const {mutate: deleteStore, isPending: isLoadingDelete} = useMutation({
        mutationKey: ['delete store'],
        mutationFn: () => storeService.delete(params.storeId),
        onSuccess() {
            toast.success('Магазин удалён')
            router.push(PUBLIC_URL.home())
        },
        onError() {
            toast.error('Ошибка при удалении магазина')
        }
    })

    return useMemo(() => ({ deleteStore, isLoadingDelete }), [deleteStore, isLoadingDelete])
}