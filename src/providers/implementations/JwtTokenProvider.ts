import { ITokenProvider, ITokenBody } from "../ITokenProvider";
import { User } from "@entities/User";
import { authSecret } from "./BCryptProvider";
import jwt from 'jwt-simple'

export class JwtTokenProvider implements ITokenProvider {

    generateToken(user: User): string {
        const now = Math.floor(Date.now() / 1000)

        const payload: ITokenBody = {
            username: user.username,
            id: user.id,
            iat: now,
            exp: now + (60 * 60 * 2)
        }

        const token = jwt.encode(payload, authSecret);
        return token;
    }
    validateToken(token: string): boolean {
        if (token) {

            try {
                const tokenBody: ITokenBody = jwt.decode(token, authSecret);

                if (new Date(tokenBody.exp * 1000) > new Date()) {
                    // Token valid
                    return true
                } else {
                    // Token has expired
                    return false
                }
            } catch (err) {
                // Token cannot be decode
                return false
            }
        } else {
            throw {status: 400, message: 'Token deve ser fornecido'}
        }
    }

}