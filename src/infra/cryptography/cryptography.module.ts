import { Module } from '@nestjs/common'

import { Encrypter } from '@/domain/account/application/cryptography/encrypter'
import { HashGenerator } from '@/domain/account/application/cryptography/hash-generator'
import { HashComparer } from '@/domain/account/application/cryptography/hash-comparer'

import { BcryptHasher } from './bcrypt-hasher'
import { JwtEncrypter } from './jwt-encrypter'

@Module({
    providers: [
        { provide: Encrypter, useClass: JwtEncrypter },
        { provide: HashGenerator, useClass: BcryptHasher },
        { provide: HashComparer, useClass: BcryptHasher }
    ],
    exports: [
        Encrypter,
        HashGenerator,
        HashComparer
    ]
})
export class CryptographyModule {}
