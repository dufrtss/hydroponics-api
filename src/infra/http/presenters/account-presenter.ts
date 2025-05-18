import { Account } from '@/domain/account/enterprise/entities/account'

export class AccountPresenter {
    static toHTTP(account: Account) {
        return {
            id: account.id.toString(),
            name: account.name,
            email: account.email,
            createdAt: account.createdAt,
            updatedAt: account.updatedAt
        }
    }
}
