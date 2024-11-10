import { useCreateStore } from '@/hooks/queries/store/useCreateStore'
import { IStoreCreate } from '@/shared/types/store.interface'
import { useState, type PropsWithChildren } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../Dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../form-elements/Form'
import { Input } from '../form-elements/Input'
import { Button } from '../Button'

export function CreateStoreModal({ children }: PropsWithChildren<unknown>) {

    const [isOpen, setIsOpen] = useState(false)

    const {createStore, isLoadingCreate} = useCreateStore()

    const form = useForm<IStoreCreate>({
        mode: 'onChange'
    })

    const onSubmit:SubmitHandler<IStoreCreate> = data => {
        createStore(data)
        setIsOpen(false)
    }

    return <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className='w-full'>{children}</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Создание магазина
                </DialogTitle>
                <DialogDescription>
                    Для создания магазина необходимо указать название
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <FormField 
                        control={form.control} 
                        name="title"
                        rules={{
                            required: 'Название обязателен',
                        }}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Название</FormLabel>
                                <FormControl>
                                    <Input placeholder="Formula Store" disabled={isLoadingCreate} {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex justify-end'>
                        <Button variant="primary" disabled={isLoadingCreate}>Создать</Button>
                    </div>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
}