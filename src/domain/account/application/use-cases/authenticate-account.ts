import { Injectable } from '@nestjs/common'
import { HashComparer } from '../cryptography/hash-comparer'
import { Encrypter } from '../cryptography/encrypter'
import { Either, left, right } from '@/core/either'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { AccountsRepository } from '../repositories/accounts-repository'

interface AuthenticateAccountUseCaseRequest {
    email: string
    password: string
}

type AuthenticateAccountUseCaseResponse = Either<
    WrongCredentialsError,
    {
        accessToken: string
    }
>

@Injectable()
export class AuthenticateAccountUseCase {
    constructor(
        private accountsRepository: AccountsRepository,
        private hashComparer: HashComparer,
        private encrypter: Encrypter
    ) {}

    async execute({
        email,
        password
    }: AuthenticateAccountUseCaseRequest): Promise<AuthenticateAccountUseCaseResponse> {
        const account = await this.accountsRepository.findByEmail(email)

        if (!account) {
            return left(new WrongCredentialsError())
        }

        const isPasswordValid = await this.hashComparer.compare(password, account.password)

        if (!isPasswordValid) {
            return left(new WrongCredentialsError())
        }
        const accessToken = await this.encrypter.encrypt({ sub: account.id.toString() })

        return right({
            accessToken
        })
    }
}
