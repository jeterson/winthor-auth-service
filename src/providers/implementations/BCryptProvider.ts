import { ICryptProvider } from "../ICryptProvider";

import bcrypt from 'bcrypt'
export class BcryptProvider implements ICryptProvider {


    async encryptPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10)
        return bcrypt.hash(password, salt)
    }
    async compareSync(passwordEncrypted: string, passwordText: string): Promise<boolean> {
        return await bcrypt.compare(passwordText, passwordEncrypted)
    }

    
    
}

export const authSecret = 'banana1linguica2mocoto3torresmo4caldodecana'