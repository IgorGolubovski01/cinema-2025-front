import { OrderStatus } from "./OrderStatus.mode";

export interface ProfileOrders {

    id: number,
    title: string,
    filmDateTime: string,
    quantity: number,
    totalPrice: number,
    status: OrderStatus;
    display: number;
}