import { IOrder } from "./order.interface";
import { IProduct } from "./product.service";
import { IStore } from "./store.interface";

export interface IUser {
    id: string,
    name: string,
    email: string,
    picture: string,
    favorites: IProduct[],
    orders: IOrder[],
    stores: IStore[]
}