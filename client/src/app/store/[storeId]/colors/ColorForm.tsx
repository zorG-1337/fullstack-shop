
import { SubmitHandler, useForm } from "react-hook-form"
import styles from '../Store.module.scss'
import { Heading } from "@/components/ui/Heading"
import { ConfirmModal } from "@/components/ui/modals/ConfirmModal"
import { Button } from "@/components/ui/Button"
import { Trash } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form-elements/Form"
import { Input } from "@/components/ui/form-elements/Input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Textarea } from "@/components/ui/TextArea"
import { ImageUpload } from "@/components/ui/form-elements/image-upload/ImageUpload"
import { IColor, IColorInput } from "@/shared/types/color.interface"
import { useCreateColor } from "@/hooks/queries/colors/useCreateColor"
import { useUpdateColor } from "@/hooks/queries/colors/useUpdateColor"
import { useDeleteColor } from "@/hooks/queries/colors/useDeleteColor"

interface ColorFormProps {
    color?: IColor
}

export function ColorForm({color}: ColorFormProps) {

    const {createColor, isLoadingCreate} = useCreateColor()
    const {updateColor, isLoadingUpdate} = useUpdateColor()
    const {deleteColor, isLoadingDelete} = useDeleteColor()

    const title = color ? 'Изменить данные' : 'Создать цвет'
    const description = color ? 'Изменить данные о цвете' : 'Добавить новый цвеc в магазин'
    const action = color ? 'Сохранить' : 'Создать'

    const form = useForm<IColorInput>({
        mode: 'onChange',
        values: {
            name: color?.name || '',
            value: color?.value || ''
        }
    })

    console.log(color)

    const onSubmit: SubmitHandler<IColorInput> = data => {

        if(color) {
            updateColor(data)
        } else {
            createColor(data)
        }
    }

    return <div className={styles.wrapper}>
        <div className={styles.header}>
            <Heading title={title} description={description} />
            {color && (
                <ConfirmModal handleClick={() => deleteColor()}>
                    <Button size='icon' variant='primary' disabled={isLoadingDelete}>
                        <Trash className="size-4"/>
                    </Button>
                </ConfirmModal>
            )}
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField 
                        control={form.control} 
                        name="name"
                        rules={{
                            required: 'Название обязательно',
                        }}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Название</FormLabel>
                                <FormControl>
                                    <Input placeholder="Название цвета" disabled={isLoadingCreate || isLoadingUpdate} {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control} 
                        name="value"
                        rules={{
                            required: 'Значение обязательно',
                        }}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Цена</FormLabel>
                                <FormControl>
                                    <Input placeholder="Цена товара" disabled={isLoadingCreate || isLoadingUpdate} {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                <Button variant='primary' disabled={isLoadingCreate || isLoadingUpdate}>{action}</Button>
            </form>
        </Form>
    </div>
}