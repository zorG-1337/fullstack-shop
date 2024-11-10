import { IProduct } from "@/shared/types/product.service"
import styles from './ProductReviews.module.scss'


interface ProductReviewsProps {
    product: IProduct
}

export function ProductReviews({product}: ProductReviewsProps) {
    return <div>ProductReviews</div>
}