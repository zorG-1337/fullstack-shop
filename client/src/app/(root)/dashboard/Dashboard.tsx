'use client'

import { useProfile } from "@/hooks/useProfile"
import { saveTokenStorage } from "@/services/auth/auth-token.service"
import { authService } from "@/services/auth/auth.service"
import { useMutation } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { IOrdertColumn, orderColumns } from "./favorites/OrderColumns"
import { formatDate } from "@/lib/date/formatDate"
import { EnumOrderStatus } from "@/shared/types/order.interface"
import { formatPrice } from "@/lib/string/format-price"
import styles from './Dashboard.module.scss'
import { Button } from "@/components/ui/Button"
import { LogOut } from "lucide-react"
import { DataTable } from "@/components/ui/data-table/DataTable"

export function Dashboard() {

    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const accessToken = searchParams.get('accessToken')

        if(accessToken) {
            saveTokenStorage(accessToken)
        }

    }, [searchParams])

    const { user } = useProfile()

    const {mutate: logout} = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => authService.logout(),
        onSuccess() {
            router.push('/auth')
        }
    })

    if(!user) return null

    const formattedOrders: IOrdertColumn[] = user.orders.map(order => ({
        createdAt: formatDate(order.createdAt),
        status: order.status === EnumOrderStatus.PENDING ? 'В ожидании' : 'Оплачен',
        total: formatPrice(order.total)
    }))


    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1>Ваши заказы</h1>
                <Button variant='ghost' onClick={() => logout()}>
                    <LogOut />
                    Выйти
                </Button>
            </div>
            <DataTable columns={orderColumns} data={formattedOrders}/>
        </div>
    )
}