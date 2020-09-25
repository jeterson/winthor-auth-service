import { IUsersRepository } from "../IUsersRepository";
import { User } from "@entities/User";
import { db } from "@config/db";

const sqlGetUserByUsername = `
    select matricula "id",
           nome "name",
           usuariobd "username",
           decrypt(senhabd, usuariobd) "password",
           decode(situacao, 'I', 0,1) "status"  

    from pcempr 
    where upper(usuariobd) like upper(?)`

export class UserRepositoryImp implements IUsersRepository {

    async findByUsername(username: string): Promise<User> {
        const users = await db.raw<User[]>(sqlGetUserByUsername, [username]);
        if (users.length > 0) {            
            const user = users.shift()            
            return user;
        } else {
            return null
        }
    }




}