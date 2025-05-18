import { Injectable } from '@nestjs/common'
import { HashGenerator } from '../cryptography/hash-generator'
import { Either, left, right } from '@/core/either'
import { AccountAlreadyExistsError } from './errors/account-already-exists-error'
import { AccountsRepository } from '../repositories/accounts-repository'
import { Account } from '../../enterprise/entities/account'

interface RegisterAccountUseCaseRequest {
    name: string
    email: string
    password: string
}

type RegisterAccountUseCaseResponse = Either<
    AccountAlreadyExistsError,
    {
        account: Account
    }
>

@Injectable()
export class RegisterAccountUseCase {
    constructor(
        private accountsRepository: AccountsRepository,
        private hashGenerator: HashGenerator
    ) {}

    async execute({
        name,
        email,
        password
    }: RegisterAccountUseCaseRequest): Promise<RegisterAccountUseCaseResponse> {
        const userWithSameEmail = await this.accountsRepository.findByEmail(email)

        if (userWithSameEmail) {
            return left(new AccountAlreadyExistsError(email))
        }

        const hashedPassword = await this.hashGenerator.hash(password)

        const account = Account.create({
            name,
            email,
            password: hashedPassword
        })

        await this.accountsRepository.create(account)

        return right({
            account
        })
    }
}
