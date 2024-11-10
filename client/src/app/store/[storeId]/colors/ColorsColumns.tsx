import { Button } from "@/components/ui/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/DropDownMenu"
import { PUBLIC_URL, STORE_URL } from "@/config/url.config"
import { IColor } from "@/shared/types/color.interface"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ExternalLink, MoreHorizontal, Pencil } from "lucide-react"
import Link from "next/link"


export const ColorColumns: ColumnDef<IColor>[] = [
    {
        accessorKey: 'name',
        header: ({column}) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    <ArrowUpDown className="ml-2 size-4"/>
                    </Button>
            )
        }
    },
    {
        accessorKey: 'value',
        header: ({column}) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Значение<ArrowUpDown className="ml-2 size-4"/>
                    </Button>
            )
        },
        cell: ({row}) => (
            <div className="flex items-center gap-x-3">
                {row.original.value}
                <div className="size-5 rounded-full border" style={{
                    backgroundColor: row.original.value
                }}/>
            </div>
        )
    },
    {
        accessorKey: 'createdAt',
        header: ({column}) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Дата создания<ArrowUpDown className="ml-2 size-4"/>
                    </Button>
            )
        }
    },
    {
        accessorKey: 'actions',
        header: 'Действия',
        cell: ({row}) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className="size-8 p-0">
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Действия</DropdownMenuLabel>
                    <Link href={STORE_URL.colorEdit(row.original.storeId, row.original.id)} target="_blank">
                        <DropdownMenuItem>
                            <Pencil className="size-4 mr-2"/>
                            Изменить
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
]