// eslint-disable-next-line no-unused-vars
import { User } from '@entities/User'
export interface IUsersRepository {
findByUsername(username: string): Promise<User>;


}
