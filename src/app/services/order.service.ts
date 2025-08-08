import axios from "axios";
import { addToCartModel } from "../models/addToCart.model";

const client = axios.create({
    baseURL: 'http://localhost:8080/order',
    headers: {
        'Accept': 'application/json'
    }
})

export class OrderService{

    static async addToCart(addToCard: addToCartModel){
        return client.post('addToCart', addToCard)
    }

}