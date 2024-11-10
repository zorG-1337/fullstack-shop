import { useCreateStore } from '@/hooks/queries/store/useCreateStore'
import { IStoreCreate } from '@/shared/types/store.interface'
import { useState, type PropsWithChildren } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../Dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../form-elements/Form'
import { Input } from '../form-elements/Input'
import { Button } from '../Button'
import { useCreateReview } from '@/hooks/queries/reviews/useCreateReview'
import { IReviewInput } from '@/shared/types/review.interface'
import { Rating } from 'react-simple-star-rating'
import { Textarea } from '../TextArea'

interface ReviewModalProps {
    storeId: string
}

export function ReviewModal({ children, storeId }: PropsWithChildren<ReviewModalProps>) {

    const [isOpen, setIsOpen] = useState(false)

    const {createReview, isLoadingCreate} = useCreateReview(storeId)

    const form = useForm<IReviewInput>({
        mode: 'onChange'
    })

    const onSubmit:SubmitHandler<IReviewInput> = data => {
        form.reset()
        createReview(data)
        setIsOpen(false)
    }

    return <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className='w-full'>{children}</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Создание Отзыва
                </DialogTitle>
                <DialogDescription>
                    Для создания отзыва необходимо указать рейтинг и текст отзыва
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <FormField 
                        control={form.control} 
                        name="rating"
                        rules={{
                            required: 'Рейтинг обязателен',
                        }}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Рейтинг</FormLabel>
                                <FormControl>
                                    <Rating 
                                        onClick={field.onChange}
                                        initialValue={field.value}
                                        SVGstyle={{
                                            display: 'inline-block'
                                        }}
                                        size={20}
                                        transition
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control} 
                        name="text"
                        rules={{
                            required: 'Текст обязателен',
                        }}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Текст</FormLabel>
                                <FormControl>
                                    <Textarea 
                                        {...field}
                                        placeholder='Текст отзыва'
                                        disabled={isLoadingCreate}
                                    />
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