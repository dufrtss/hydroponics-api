import { PaginationParams } from '@/core/repositories/pagination-params'
import { Account } from '../../enterprise/entities/account'

export abstract class AccountsRepository {
    abstract findById(id: string): Promise<Account | null>
    abstract findByEmail(email: string): Promise<Account | null>
    abstract findMany(params: PaginationParams): Promise<Account[]>
    abstract create(account: Account): Promise<void>
    abstract update(account: Account): Promise<void>
    abstract delete(account: Account): Promise<void>
}
