import { useActions } from "@/hooks/useActions";
import { useCart } from "@/hooks/useCart";
import { orderService } from "@/services/order.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";

export function useCheckout() {
    const { items } = useCart()

    const { reset } = useActions()

    const { push } = useRouter()

    const {mutate:createPayment, isPending: isLoadingCreate} = useMutation({
        mutationKey: ['create order and payment'],
        mutationFn: () => 
            orderService.place({
                items: items.map(item => ({
                    price: item.price,
                    quantity: item.quantity,
                    productId: item.product.id,
                    storeId: item.product.storeId
                }))
            }),
        onSuccess({data}) {
            push(data.confirmation.confirmation_url)
            reset()
        },
        onError() {
            toast.error('Ошибка при создании платежа')
        }
    })

    return useMemo(() => ({createPayment, isLoadingCreate}), [createPayment, isLoadingCreate])
}