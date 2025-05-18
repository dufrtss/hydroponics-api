import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { AccountsRepository } from '../repositories/accounts-repository'
import { Account } from '../../enterprise/entities/account'
import { AccountNotFoundError } from './errors/account-not-found-error'

interface GetAccountUseCaseRequest {
    id: string
}

type GetAccountUseCaseResponse = Either<
    AccountNotFoundError,
    {
        account: Account
    }
>

@Injectable()
export class GetAccountUseCase {
    constructor(private accountsRepository: AccountsRepository) {}

    async execute({
        id
    }: GetAccountUseCaseRequest): Promise<GetAccountUseCaseResponse> {
        const account = await this.accountsRepository.findById(id)

        if (!account) {
            return left(new AccountNotFoundError())
        }

        return right({
            account
        })
    }
}
