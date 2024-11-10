import { Button } from "@/components/ui/Button"
import { useProfile } from "@/hooks/useProfile"
import { userService } from "@/services/user.service"
import { IProduct } from "@/shared/types/product.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
interface IFavoriteButton {
    product: IProduct
}

export function FavoriteButton({product}: IFavoriteButton) {

    const { user } = useProfile()

    const queryClient = useQueryClient()

    const {mutate, isPending} = useMutation({
        mutationKey: ['toggle favorite'],
        mutationFn: () => userService.toggleFavorite(product.id),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['profile']
            })
        }
    })

    if(!user) return null

    const isExists = user.favorites.some(favorite => favorite.id === product.id)

    return <Button variant='secondary' size='icon' onClick={() => mutate()} disabled={isPending}>
        {isExists ? (
            <AiFillHeart color="F43F5E" className="size-5" />
        ) : (
            <AiOutlineHeart className="size-5" />
        )}
    </Button>
}