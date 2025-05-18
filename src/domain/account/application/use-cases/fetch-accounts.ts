import { Injectable } from '@nestjs/common'
import { Either, right } from '@/core/either'
import { AccountsRepository } from '../repositories/accounts-repository'
import { Account } from '../../enterprise/entities/account'

interface FetchAccountsUseCaseRequest {
    page: number
}

type FetchAccountsUseCaseResponse = Either<
    null,
    {
        accounts: Account[]
    }
>

@Injectable()
export class FetchAccountsUseCase {
    constructor(private accountsRepository: AccountsRepository) {}

    async execute({
        page
    }: FetchAccountsUseCaseRequest): Promise<FetchAccountsUseCaseResponse> {
        const accounts = await this.accountsRepository.findMany({
            page
        })

        return right({
            accounts
        })
    }
}
