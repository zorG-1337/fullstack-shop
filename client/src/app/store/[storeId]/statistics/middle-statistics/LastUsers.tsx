import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { ILastUsers } from "@/shared/types/statistics.interface"
import styles from './MiddleStatistics.module.scss'
import Image from "next/image"
import { formatPrice } from "@/lib/string/format-price"

interface LastUsersProps {
    data: ILastUsers[]
}

export function LastUsers({ data }: LastUsersProps) {
    return <Card>
        <CardHeader className={styles.header}>
            <CardTitle>Последние покупатели:</CardTitle>
        </CardHeader>
        <CardContent>
            {data.length ? data.map(user => (
                <div className={styles.user} key={user.id}>
                    <Image src={user.picture} alt={user.name} width={40} height={40}/>
                    <div className={styles.info}>
                        <p className={styles.name}>{user.name}</p>
                        <p>{user.email}</p>
                    </div>
                    <div className={styles.total}>
                        +{formatPrice(user.total)}
                    </div>
                </div>
            )) : <div>{`Нет покупателей :(`}</div>}
        </CardContent>
    </Card>
}