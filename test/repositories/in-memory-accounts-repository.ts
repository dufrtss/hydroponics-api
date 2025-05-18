import { AccountsRepository } from '@/domain/account/application/repositories/accounts-repository'
import { Account } from '@/domain/account/enterprise/entities/account'

export class InMemoryAccountsRepository implements AccountsRepository {
    public items: Account[] = []

    async findById(id: string) {
        const account = this.items.find((account) => account.id.toString() === id)

        if (!account) {
            return null
        }

        return account
    }

    async findByEmail(email: string) {
        const account = this.items.find((account) => account.email === email)

        if (!account) {
            return null
        }

        return account
    }

    async findMany() {
        return this.items
    }

    async create(account: Account) {
        this.items.push(account)
    }

    async update(account: Account) {
    }

    async delete(account: Account) {
    }
}
