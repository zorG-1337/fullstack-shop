'use client'

import { useState } from "react"
import { useAuthForm } from "./useAuthForm"
import styles from './Auth.module.scss'
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Form } from "@/components/ui/form-elements/Form"
import { Button } from "@/components/ui/Button"
import { AuthFields } from "./AuthFields"
import { Social } from "./Social"

export function Auth() {

    const [isReg, setIsReg] = useState(false)

    const {form, onSubmit, isPending} = useAuthForm(isReg)

    return <div className={styles.wrapper}>
        <div className={styles.left}>
            <Image src="/images/auth.svg" alt='TeaShop Auth' width={100} height={100} />
        </div>
        <div className={styles.right}>
            <Card className={styles.card}>
                <CardHeader className={styles.headers}>
                    <CardTitle>{isReg ? 'Создать аккаунт' : 'Войти в аккаунт'}</CardTitle>
                    <CardDescription>
                        Войдите или создайте учетную запись, чтобы совершать покупки!
                    </CardDescription>
                </CardHeader>
                <CardContent className={styles.content}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <AuthFields form={form} isPending={isPending} isReg={isReg} />
                            <Button disabled={isPending}>Продолжить</Button>
                        </form>
                    </Form>
                    <Social />
                </CardContent>
                <CardFooter className={styles.footer}>
                    {isReg ? 'Уже есть аккаунт' : 'Ещё нет аккаунта'}
                    <Button variant='link' onClick={() => setIsReg(!isReg)}>
                        {isReg ? 'Войти' : 'Зарегистрироваться'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </div>
}