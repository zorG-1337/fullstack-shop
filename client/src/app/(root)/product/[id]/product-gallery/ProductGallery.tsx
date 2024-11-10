import { IProduct } from "@/shared/types/product.service"
import Image from "next/image"
import { useState } from "react"
import styles from './ProductGallery.module.scss'
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
    product: IProduct
}

export function ProductGallery({product}: ProductGalleryProps) {

    const [currentIndex, setCurrentIndex] = useState(0)

    return (
        <div>
            <Image 
                src={product.image[currentIndex]}
                alt={product.title}
                width={500}
                height={500}
                className={styles.image}
            />
            <div className={styles.gallery}>
                {product.image.map((image, index) => (
                    <button 
                        key={index} 
                        onClick={() => setCurrentIndex(index)}
                        className={cn(styles.item, index===currentIndex ? 'border-black' : 'border-transparent')}
                    >
                    <Image src={image} alt={product.title} width={100} height={100}/>
                    </button>
                ))}
            </div>
        </div>
    )
}