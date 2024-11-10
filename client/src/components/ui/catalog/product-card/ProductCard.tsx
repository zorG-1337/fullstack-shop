import { IProduct } from "@/shared/types/product.service"
import styles from './ProductCard.module.scss'
import Link from "next/link"
import { PUBLIC_URL } from "@/config/url.config"
import Image from "next/image"
import { formatPrice } from "@/lib/string/format-price"

interface ProductCardProps {
    product: IProduct
}

export function ProductCard({product}: ProductCardProps) {
    return (
        <div className={styles.card}>
            <Link href={PUBLIC_URL.product(product.id)}>
                <Image 
                    src={product.image[0]}
                    alt={product.title}
                    width={300}
                    height={300}
                />
            </Link>

            <h3 className={styles.title}>{product.title}</h3>
            <Link href={PUBLIC_URL.category(product.category.id)} className={styles.category}>
                {product.category.title}
            </Link>
            <p className={styles.price}>{formatPrice(product.price)}</p>
        </div>
    )
}