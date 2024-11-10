import { ICartItem } from "./cart.interface"
import { IUser } from "./user.interface"

interface IAmount {
    value: string,
    currence: string
}

interface IRecipient {
    accout_id: string,
    gateway_id: string
}

interface IPaymentMethod {
    type: string,
    id: string,
    saved: boolean
}

interface IConfirmation {
    type: string,
    return_rul: string,
    confirmation_url: string
}

export interface IPaymentResponse {
    id: string,
    status: string,
    amount: string,
    recipient: IRecipient,
    payment_method: IPaymentMethod,
    created_at: Date,
    confirmation: IConfirmation
}

export enum EnumOrderStatus {
    PENDING = 'PENDING',
    PAID = 'PAID'
}

export interface IOrder {
    id: string,
    createdAt: string,
    items: ICartItem[]
    status: EnumOrderStatus,
    user: IUser,
    total: number
}