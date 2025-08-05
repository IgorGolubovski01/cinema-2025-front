import axios from "axios";
import { UserModel } from "../models/user.model";

const client = axios.create({
    baseURL: 'http://localhost:8080/user',
    headers:{
        'Accept' : 'application/json'
    }
})

export class UserService{

    static async signUp(userModel: UserModel){
        return client.post('/signUp', userModel)
    }
}