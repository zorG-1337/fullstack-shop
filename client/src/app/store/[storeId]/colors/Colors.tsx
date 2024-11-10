"use client"

import { useGetColors } from "@/hooks/queries/colors/useGetColors"
import { useParams } from "next/navigation"
import { ColorColumns } from "./ColorsColumns"
import styles from '../Store.module.scss'
import DataTableLoading from "@/components/ui/data-table/DataTableLoading"
import { Heading } from "@/components/ui/Heading"
import { Button } from "@/components/ui/Button"
import { Plus } from "lucide-react"
import { STORE_URL } from "@/config/url.config"
import { DataTable } from "@/components/ui/data-table/DataTable"
import Link from "next/link"
import { IColor } from "@/shared/types/color.interface"
import { formatDate } from "@/lib/date/formatDate"

export function Colors() {
    const params = useParams<{storeId: string}>()

    const {colors, isLoading} = useGetColors()

    const formattedcolors:IColor[] = colors ? colors.map(color => ({
        id: color.id,
        createdAt: formatDate(color.createdAt),
        name: color.name,
        value: color.value,
        storeId: color.storeId
    })) : []

    return <div className={styles.wrapper}>
        {isLoading ? (
            <DataTableLoading />
        ) : (
            <>
                <div className={styles.header}>
                    <Heading title={`Цвета ${colors?.length}`} description="Все цвета вашего магазина"/>
                    <div className={styles.button}>
                        <Link href={STORE_URL.colorCreate(params.storeId)}>
                            <Button variant='primary'>
                                
                                <Plus />
                                Создать
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className={styles.table}>
                        <DataTable columns={ColorColumns} data={formattedcolors} filterKey="name"/>
                    </div>
            </>
        )}
    </div>
}