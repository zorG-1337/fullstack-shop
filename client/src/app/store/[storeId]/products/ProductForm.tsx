import { useCreateProducts } from "@/hooks/queries/products/useCreateProducts"
import { useDeleteProducts } from "@/hooks/queries/products/useDeleteProducts"
import { useUpdateProducts } from "@/hooks/queries/products/useUpdateProducts"
import { ICategory } from "@/shared/types/category.interface"
import { IColor } from "@/shared/types/color.interface"
import { IProduct, IProductInput } from "@/shared/types/product.service"
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

interface ProductFormProps {
    product?: IProduct,
    categories: ICategory[],
    colors: IColor[]
}

export function ProductForm({product, categories, colors}: ProductFormProps) {

    const {createProduct, isLoadingCreate} = useCreateProducts()
    const {updateProduct, isLoadingUpdate} = useUpdateProducts()
    const {deleteProduct, isLoadingDelete} = useDeleteProducts()

    const title = product ? 'Изменить данные' : 'Создать товар'
    const description = product ? 'Изменить данные о товаре' : 'Добавить новый товар в магазин'
    const action = product ? 'Сохранить' : 'Создать'

    const form = useForm<IProductInput>({
        mode: 'onChange',
        values: {
            title: product?.title || '',
            description: product?.description || '',
            image: product?.image || [],
            price : product?.price || 0,
            categoryId: product?.category.id || '',
            colorId: product?.color.id || ''
        }
    })

    console.log(product)

    const onSubmit: SubmitHandler<IProductInput> = data => {
        data.price = Number(data.price)

        if(product) {
            updateProduct(data)
        } else {
            createProduct(data)
        }
    }

    return <div className={styles.wrapper}>
        <div className={styles.header}>
            <Heading title={title} description={description} />
            {product && (
                <ConfirmModal handleClick={() => deleteProduct()}>
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
                        name="image"
                        rules={{
                            required: 'Требуется загрузка хотя бы одной кртинки',
                        }}
                        render={({field}) => (
                            <FormItem className="mt-4">
                                <FormLabel>Картинки</FormLabel>
                                <FormControl>
                                    <ImageUpload isDisabled={isLoadingCreate || isLoadingUpdate} onChange={field.onChange} value={field.value}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className={styles.fields}>
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
                                    <Input placeholder="Название товара" disabled={isLoadingCreate || isLoadingUpdate} {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control} 
                        name="price"
                        rules={{
                            required: 'Цена обязателен',
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
                    <FormField 
                        control={form.control} 
                        name='categoryId'
                        rules={{
                            required: 'Категория обязательна',
                        }}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Категория</FormLabel>
                                <Select disabled={isLoadingCreate || isLoadingUpdate} onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Категория товара"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            {categories.map(category => (
                                                <SelectItem value={category.id} key={category.id}>
                                                    {category.title}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                
                            </FormItem>
                        )}
                    />
                    </div>
                    <div className={styles.fields}>
                    <FormField 
                        control={form.control} 
                        name='colorId'
                        rules={{
                            required: 'Цвет обязателен',
                        }}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Цвет</FormLabel>
                                <Select disabled={isLoadingCreate || isLoadingUpdate} onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Цвет товара"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            {colors.map(color => (
                                                <SelectItem value={color.id} key={color.id}>
                                                    {color.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                
                            </FormItem>
                        )}
                    />
                    </div>
                    <FormField 
                        control={form.control} 
                        name="description"
                        rules={{
                            required: 'Описание обязательно'
                        }}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Описание</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Описание магазина" disabled={isLoadingCreate || isLoadingUpdate} {...field}/>
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