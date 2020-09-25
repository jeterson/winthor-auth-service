import { UserRepositoryImp } from "@repositories/implemetations/UserRepositoryImpl";
import { AuthUseCase } from "./AuthUseCase";
import { AuthController } from "./AuthController";
import { ValidationAuthUseCase } from "./ValidationAuthUseCase";
import { JwtTokenProvider } from "@providers/implementations/JwtTokenProvider";
import { BcryptProvider } from "@providers/implementations/BCryptProvider";
import { AuthSecurityUseCase } from "./AuthSecurityUseCase";
import { PassportAuthProvider } from "@providers/implementations/PassportAuthProvider";

const repository = new UserRepositoryImp()
const tokenProvider = new JwtTokenProvider()
const cryptProvider = new BcryptProvider()
const useCase = new AuthUseCase(repository, tokenProvider, cryptProvider)
const validationAuthUseCase = new ValidationAuthUseCase(tokenProvider)
const authController = new AuthController(useCase, validationAuthUseCase)
const authProvider = new PassportAuthProvider()
const authSecurity = new AuthSecurityUseCase(authProvider, repository)

export {authController, authSecurity}