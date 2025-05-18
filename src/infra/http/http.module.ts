import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'

import { AuthenticateAccountController } from './controllers/authenticate-account.controller'
import { GetAccountController } from './controllers/get-account.controller'
import { FetchAccountsController } from './controllers/fetch-accounts.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { GetAmbientTemperatureController } from './controllers/get-ambient-temperature.controller'
import { GetAmbientHumidityController } from './controllers/get-ambient-humidity.controller'

import { AuthenticateAccountUseCase } from '@/domain/account/application/use-cases/authenticate-account'
import { RegisterAccountUseCase } from '@/domain/account/application/use-cases/register-account'
import { GetAmbientTemperatureUseCase } from '@/domain/measurement/application/use-cases/get-ambient-temperature'
import { GetAmbientHumidityUseCase } from '@/domain/measurement/application/use-cases/get-ambient-humidity'
import { FetchAccountsUseCase } from '@/domain/account/application/use-cases/fetch-accounts'
import { GetAccountUseCase } from '@/domain/account/application/use-cases/get-account'

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
        GetAmbientTemperatureController,
        GetAmbientHumidityController
    ],
    providers: [
        AuthenticateAccountUseCase,
        GetAccountUseCase,
        FetchAccountsUseCase,
        RegisterAccountUseCase,
        GetAmbientTemperatureUseCase,
        GetAmbientHumidityUseCase
    ]
})
export class HttpModule {}
