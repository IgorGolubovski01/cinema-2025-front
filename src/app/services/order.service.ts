import axios from "axios";
import { AddToCartModel } from "../models/addToCart.model";

const client = axios.create({
    baseURL: 'http://localhost:8080/order',
    headers: {
        'Accept': 'application/json'
    }
})

export class OrderService {

    static async addToCart(addToCart: AddToCartModel) {
        return client.post('addToCart', addToCart)
    }

    static async getOrederItems(userId: number, statusId: number) {
        return client.get('getOrderItems', {
            params: { userId, statusId }
        })
    }

    static async getAllUserOrders(userId: number) {
        return client.get('getAllUserOrders', {
            params: { userId }
        })
    }

    static async purchase(orderId: number) {
        return client.post('purchase', null, { params: { orderId } })
    }

    static async cancel(orderId: number) {
        return client.post('cancel', null, { params: { orderId } })
    }

    static async dontShow(orderId: number) {
        return client.post('dontShow', null, { params: { orderId } })
    }

}