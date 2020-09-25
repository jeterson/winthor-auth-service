import { User } from "@entities/User";

export interface ITokenProvider {
    generateToken(user: User): string;
    validateToken(token: string): boolean
}

export interface ITokenBody {
    id: number
    iat: number,
    username: string,
    exp: number
}