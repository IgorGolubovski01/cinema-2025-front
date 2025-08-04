import { RoleModel } from "./role.model";

export interface UserModel{
    id: number,
    address: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    phone: string,
    username: string,
    role: RoleModel
}