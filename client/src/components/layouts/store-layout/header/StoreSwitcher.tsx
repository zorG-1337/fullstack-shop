'use client'

import { Button } from "@/components/ui/Button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/Command"
import { CreateStoreModal } from "@/components/ui/modals/CreateStoreModal"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { STORE_URL } from "@/config/url.config"
import { IStore } from "@/shared/types/store.interface"
import { ChevronsUpDown, Plus, StoreIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface StoreSwitcherProps {
    items: IStore[]
}

export function StoreSwitcher({ items }: StoreSwitcherProps) {

    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)

    const onStoreSelect = (storeId: string) => {
        setIsOpen(false)
        router.push(STORE_URL.home(storeId))
    } 

    return <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
            <Button variant='outline' size='sm' role="combobox" aria-expanded={isOpen} aria-label="Выбирете магазин" className="w-52">Текущий магазин
                <StoreIcon className="mr-2 size-4"/>
                <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50"/>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-52 p-0">
            <Command>
                <CommandList>
                    <CommandInput placeholder="Найти магазин..."/>
                    <CommandEmpty>Ничего не найдено</CommandEmpty>
                    <CommandGroup heading='Магазины'>
                        {items.map(store => (
                            <CommandItem key={store.id} onSelect={() => onStoreSelect(store.id)} className="text-sm">
                                <StoreIcon className="mr-2 size-4"/>
                                <div className="line-clamp-1">
                                    {store.title}
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
                <CommandSeparator />
                <CommandList>
                    <CommandGroup>
                        <CreateStoreModal>
                            <CommandItem>
                                <Plus className="mr-2 size-4"/>
                                Создать магазин
                            </CommandItem>
                        </CreateStoreModal>
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
}