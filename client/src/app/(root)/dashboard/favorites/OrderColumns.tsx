import { Button } from "@/components/ui/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/DropDownMenu"
import { PUBLIC_URL, STORE_URL } from "@/config/url.config"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ExternalLink, MoreHorizontal, Pencil } from "lucide-react"
import Link from "next/link"

export interface IOrdertColumn {
    createdAt: string,
    status: string,
    total: string 
}

export const orderColumns: ColumnDef<IOrdertColumn>[] = [
    {
        accessorKey: 'createdAt',
        header: ({column}) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Дата оплаты<ArrowUpDown className="ml-2 size-4"/>
                    </Button>
            )
        }
    },
    {
        accessorKey: 'status',
        header: ({column}) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Статус<ArrowUpDown className="ml-2 size-4"/>
                    </Button>
            )
        }
    },
    {
        accessorKey: 'total',
        header: ({column}) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Сумма<ArrowUpDown className="ml-2 size-4"/>
                    </Button>
            )
        }
    },
    
]