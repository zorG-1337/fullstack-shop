import { IProduct } from "./product.service";

export interface ICartItem {
    id: number,
    product: IProduct,
    quantity: number,
    price: number
}