'use client'

import { useParams } from "next/navigation"
import styles from './Store.module.scss'
import { Heading } from "@/components/ui/Heading"
import { MainStatistics } from "./statistics/main-statistics/MainStatistics"
import { MiddleStatistics } from "./statistics/middle-statistics/MiddleStatistics"

export function Store() {
    return <div className={styles.wrapper}>
        <Heading title="Статистика"></Heading>
        <MainStatistics />
        <MiddleStatistics />
    </div>
}