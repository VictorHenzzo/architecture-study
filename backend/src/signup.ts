import crypto from 'crypto'
import AccountDAO from './account_dao'
import { isValidCpf } from './cpf_validator'

export default class SignUp {
    accountDao: AccountDAO

    constructor() {
        this.accountDao = new AccountDAO()
    }

    async execute(input: any): Promise<any> {
        input.accountId = crypto.randomUUID()
        const [account] = await this.accountDao.getByEmail(input.email)
        if (account) throw new Error('Duplicated account')
        if (this.isInvalidName(input.name)) throw new Error('Invalid name')
        if (this.isInvalidEmail(input.email)) throw new Error('Invalid email')
        if (!isValidCpf(input.cpf)) throw new Error('Invalid cpf')
        if (input.isDriver && this.isInvalidCarPlate(input.carPlate))
            throw new Error('Invalid carplate')
        await this.accountDao.save(input)
        return {
            accountId: input.accountId,
        }
    }

    isInvalidName(name: string) {
        return !name.match(/[a-zA-Z] [a-zA-Z]+/)
    }

    isInvalidEmail(email: string) {
        return !email.match(/^(.+)@(.+)$/)
    }

    isInvalidCarPlate(carPlate: string) {
        return !carPlate.match(/[A-Z]{3}[0-9]{4}/)
    }
}
