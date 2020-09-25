import { AuthUseCase } from "./AuthUseCase";
import { Request, Response, request } from "express";
import { ValidationAuthUseCase } from "./ValidationAuthUseCase";
import { CredentialsDTO } from "./CredentialsDTO";

export class AuthController {
    constructor(private authUseCase: AuthUseCase, private validationAuthUseCase: ValidationAuthUseCase) {}

    async login(req: Request, res: Response) {
        try{
            const cred: CredentialsDTO = req.body
            if(!cred.password) {
                return res.status(400).send({message: 'Senha não informada'})
            }
            if(!cred.username) {
                return res.status(400).send({message: 'Usuário não informado'})
            }
            const user = await this.authUseCase.auth(cred)
            res.status(200).send(user)
        }catch(error) {
            res.status(error.status || 500).send({message: error.message})
        }
    }

    async validateToken(req: Request, res: Response) {
        
        try {
            const {accessToken}  = req.body
            const valid = this.validationAuthUseCase.execute(accessToken)
            return res.status(200).send(valid)
        } catch (error) {
            return res.status(error.status || 500).send({message: error.message})
        } 
    }
}