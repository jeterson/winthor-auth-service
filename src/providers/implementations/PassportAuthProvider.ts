import { IAuthProvider } from "../IAuthProvider";
import { IUsersRepository } from "@repositories/IUsersRepository";
import passport from 'passport'
import passportJwt, { VerifiedCallback } from 'passport-jwt'
import { authSecret } from "./BCryptProvider";
import { ITokenBody } from "../ITokenProvider";




export interface IPassportAuthentication {
    authenticate: () => any
}

export class PassportAuthProvider implements IAuthProvider {

    authenticate(userRepository: IUsersRepository) {
        const { ExtractJwt, Strategy } = passportJwt
        const params = { secretOrKey: authSecret, jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() }

        const strategy = new Strategy(params, async (payload: ITokenBody, done: VerifiedCallback) => {
            try {
                const user = await userRepository.findByUsername(payload.username)
                delete user.password
                if(user) {
                    done(null, user.status === 1 ? user : false)                    
                }else {
                    done({message: 'Usuário não encontrado!'}, false)
                }
            } catch (error) {
                done(error, false)
            }

        })
        passport.use(strategy)
        
        const obj: IPassportAuthentication = {
            authenticate: () => passport.authenticate('jwt', {session: false})
        }

        return obj;

    }
}