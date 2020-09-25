import { IAuthProvider } from "src/providers/IAuthProvider";
import { ITokenProvider } from "src/providers/ITokenProvider";

export class ValidationAuthUseCase {

    constructor(private tokenProvider: ITokenProvider) {}

    execute(token: string): boolean {
        return this.tokenProvider.validateToken(token)
    }
}