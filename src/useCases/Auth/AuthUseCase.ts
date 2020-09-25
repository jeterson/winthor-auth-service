
import { CredentialsDTO } from "./CredentialsDTO";
import { User } from "@entities/User";
import { IUsersRepository } from "@repositories/IUsersRepository";
import { ITokenProvider } from "@providers/ITokenProvider";
import { ICryptProvider } from "@providers/ICryptProvider";
import { IAuthSuccess } from "@providers/IAuthProvider";


export class AuthUseCase {

    constructor(
        private repository: IUsersRepository,
        private tokenProvider: ITokenProvider,
        private cryptProvider: ICryptProvider
        ) {}

    async auth(credentials: CredentialsDTO): Promise<IAuthSuccess> {
        const user = await this.repository.findByUsername(credentials.username)
        if(!user) {
            throw {message: 'Usuário não encontrado', status: 401}
        }
        if(user.status !== 1)  {
            throw {message: 'Usuário está inativo', status: 401}
        }

        user.password = await this.cryptProvider.encryptPassword(user.password.toLowerCase())
        const isMatch = await this.cryptProvider.compareSync(user.password, credentials.password.toLowerCase())
        if(!isMatch) {
            throw {message: 'Usuário e/ou senha estão inválidos', status: 401}
        }
        const token = this.tokenProvider.generateToken(user)
        const authSuccess: IAuthSuccess = {
            id: user.id,
            username: user.username,
            name: user.name,
            token: token
        }

        return authSuccess

    }
}