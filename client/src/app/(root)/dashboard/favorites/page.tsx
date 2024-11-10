import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Favorites } from './FavoritesPage'

export const metadata: Metadata = {
    title: 'Избранное',
    ...NO_INDEX_PAGE
}

export default function FavoritesPage() {
    return <Favorites />
}