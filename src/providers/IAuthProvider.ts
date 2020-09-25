import { IUsersRepository } from "@repositories/IUsersRepository";
import { IPassportAuthentication } from "./implementations/PassportAuthProvider";

export interface IAuthProvider {
    authenticate(userRepository: IUsersRepository): IPassportAuthentication;
}

export interface IAuthSuccess {
    id: number
    name: string,
    username: string
    token: string
}