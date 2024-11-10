import { Button } from "@/components/ui/Button"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form-elements/Form"
import { Input } from "@/components/ui/form-elements/Input"
import { IAuthForm } from "@/shared/types/auth.interface"
import { useState } from "react"
import { UseFormReturn } from "react-hook-form"

interface AuthFieldsProps {
    form: UseFormReturn<IAuthForm, any, undefined>
    isPending: boolean
    isReg?: boolean
}

export function AuthFields({form, isPending, isReg = false}: AuthFieldsProps) {

    const [isPasswordShown, setIsShownPassword] = useState<boolean>(false)

    return (
    <>
        {isReg && (
            <FormField 
                control={form.control} 
                name="name"
                rules={{
                    required: 'Имя обязательно'
                }}
                render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Input placeholder="Ivan" disabled={isPending} {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        )}
        <FormField 
                control={form.control} 
                name="email"
                rules={{
                    required: 'Почта обязательна'
                }}
                render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Input placeholder="something@example.com" disabled={isPending} {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField 
                control={form.control} 
                name="password"
                rules={{
                    required: 'Пароль обязателен',
                    minLength: {
                        value: 6,
                        message: 'Минимум 6 символов'
                    }
                }}
                render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Input placeholder="******" disabled={isPending} type={isPasswordShown ? 'input' : 'password'} {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="button" onClick={() => setIsShownPassword(!isPasswordShown)}>Показать пароль</Button>
    </>)
}