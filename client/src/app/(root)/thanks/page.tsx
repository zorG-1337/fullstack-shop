import type { Metadata } from 'next'
import styles from '../hero/Hero.module.scss'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import Link from 'next/link'
import { PUBLIC_URL } from '@/config/url.config'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Спасибо за покупку',
    ...NO_INDEX_PAGE
}

export default function ThanksPage() {
    return (
        <div className={styles.section}>
            <h1 className={styles.heading}>Спасибо за покупку</h1>
            <p className={styles.description}>
                Спасибо за заказ! Мы ценим ваше доверие и сделаем всё, чтобы заказ пришёл вовремя!
            </p>
            <Link href={PUBLIC_URL.home()}>
                <Button variant='primary'>
                    На главную
                    <ArrowRight />
                </Button>
            </Link>
        </div>
    )
}