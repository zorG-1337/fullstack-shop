import { Metadata } from "next";
import Home from "./Home";
import { productService } from "@/services/auth/product.service";

export const metadata: Metadata = {
    title: 'Поппенгаген - в удовольствие ха-ха-ха'
}

export const revalidate = 60

async function getProducts() {
    const data = (await productService.getMostPopular()).slice(0, 6)

    return data
}

export default async function HomePage() {

    const data = await getProducts()

    return <Home products={data}/>
}