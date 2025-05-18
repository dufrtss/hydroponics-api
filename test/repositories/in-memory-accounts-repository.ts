import { PaginationParams } from '@/core/repositories/pagination-params'
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

    async findMany({ page }: PaginationParams) {
        const paginatedItens = this.items
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice(
                (page - 1) * 20,
                page * 20
            )

        return paginatedItens

    }

    async create(account: Account) {
        this.items.push(account)
    }

    async update(account: Account) {
        const itemIndex = this.items.findIndex(
            (item) => item.id.toString() == account.id.toString()
        )

        if (itemIndex >= 0) {
            this.items[itemIndex] = account
        }
    }

    async delete(account: Account) {
        const itemIndex = this.items.findIndex(
            (item) => item.id.toString() === account.id.toString()
        )

        if (itemIndex >= 0) {
            this.items.splice(itemIndex, 1)
        }
    }
}
