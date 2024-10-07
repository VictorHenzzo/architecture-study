import AccountDAO from "./account_dao";

export default class GetAccount {
    accountDao: AccountDAO;

    constructor() {
        this.accountDao = new AccountDAO();
    }

    async execute(accountId: string): Promise<any> {
        const account = await this.accountDao.getById(accountId);
        return account;
    }
}


