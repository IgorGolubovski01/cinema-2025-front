import axios from "axios";
import { UserModel } from "../models/user.model";
import { LoginModel } from "../models/login.model";

const client = axios.create({
    baseURL: 'http://localhost:8080/user',
    headers: {
        'Accept': 'application/json'
    }
})

export class UserService {

    static async signUp(userModel: UserModel) {
        return client.post('/signUp', userModel)
    }

    static async login(loginModel: LoginModel): Promise<boolean> {
        try {
            const response = await client.post('/login', loginModel)
            const user = response.data
            localStorage.setItem('active', JSON.stringify(user))
            return true
        } catch (error: any) {
            return false;
        }

    }

    static checkActive(): any {
        const active = localStorage.getItem('active')

        if(!active){
            return null
        }   

        return true
    }

}