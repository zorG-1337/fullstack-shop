import { useGetStatistics } from "@/hooks/queries/statistics/useGetStatistics"
import styles from './MiddleStatistics.module.scss'
import { LastUsers } from "./LastUsers"
import { Overview } from "./Overview"

export function MiddleStatistics() {

    const { middle } = useGetStatistics()
    return <div className={styles.middle}>
        {middle?.monthlySales.length || middle?.lastUsers.length ? (
            <>
                <div className={styles.overview}>
                    <Overview data={middle.monthlySales} />
                </div>
                <div className={styles.last_users}>
                    <LastUsers data={middle.lastUsers}/>
                </div>
            </>
        ) : (
            <div>Нет данных для статичстики</div>
        )}
    </div>
}