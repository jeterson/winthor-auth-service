export interface ICryptProvider {
    encryptPassword(password: string): Promise<string>
    compareSync(passwordEncrypted: string, passwordText: string): Promise<boolean>;
}