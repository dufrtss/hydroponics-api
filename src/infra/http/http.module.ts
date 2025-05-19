import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'

import { AuthenticateAccountController } from './controllers/authenticate-account.controller'
import { GetAccountController } from './controllers/get-account.controller'
import { FetchAccountsController } from './controllers/fetch-accounts.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { FetchAmbientTemperatureController } from './controllers/fetch-ambient-temperature.controller'
import { FetchAmbientHumidityController } from './controllers/fetch-ambient-humidity.controller'

import { AuthenticateAccountUseCase } from '@/domain/account/application/use-cases/authenticate-account'
import { RegisterAccountUseCase } from '@/domain/account/application/use-cases/register-account'
import { FetchAccountsUseCase } from '@/domain/account/application/use-cases/fetch-accounts'
import { GetAccountUseCase } from '@/domain/account/application/use-cases/get-account'
import { FetchAmbientTemperatureUseCase } from '@/domain/measurement/application/use-cases/fetch-ambient-temperature'
import { FetchAmbientHumidityUseCase } from '@/domain/measurement/application/use-cases/fetch-ambient-humidity'

@Module({
    imports: [
        DatabaseModule,
        CryptographyModule
    ],
    controllers: [
        AuthenticateAccountController,
        GetAccountController,
        FetchAccountsController,
        CreateAccountController,
        FetchAmbientTemperatureController,
        FetchAmbientHumidityController
    ],
    providers: [
        AuthenticateAccountUseCase,
        GetAccountUseCase,
        FetchAccountsUseCase,
        RegisterAccountUseCase,
        FetchAmbientTemperatureUseCase,
        FetchAmbientHumidityUseCase
    ]
})
export class HttpModule {}
