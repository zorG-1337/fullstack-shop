'use client'
import { useRouter } from 'next/navigation'
import styles from './Auth.module.scss'
import { Button } from '@/components/ui/Button'
import { FaYandex, FaGoogle } from 'react-icons/fa'
import { SERVER_URL } from '@/config/api.config'

export function Social() {

    const router = useRouter() 

    return <div className={styles.social}>
        <Button variant='outline' onClick={() => router.push(`${SERVER_URL}/auth/google`)}>
            <FaGoogle />
            Continue with Google
        </Button>

        <Button variant='outline' onClick={() => router.push(`${SERVER_URL}/auth/yandex`)}>
            <FaYandex />
            Continue with Yandex
        </Button>
    </div>
}