import { IAuthProvider } from "src/providers/IAuthProvider";
import { IUsersRepository } from "@repositories/IUsersRepository";
import { IPassportAuthentication } from "src/providers/implementations/PassportAuthProvider";

export class AuthSecurityUseCase {
    constructor(private authProvider: IAuthProvider, private userRepository: IUsersRepository) {}


    execute(): IPassportAuthentication {
        return this.authProvider.authenticate(this.userRepository)
    }
}