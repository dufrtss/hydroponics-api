import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'

import { AuthenticateAccountController } from './controllers/authenticate-account.controller'
import { GetAccountController } from './controllers/get-account.controller'
import { FetchAccountsController } from './controllers/fetch-accounts.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { FetchAmbientTemperatureController } from './controllers/fetch-ambient-temperature.controller'
import { FetchAmbientHumidityController } from './controllers/fetch-ambient-humidity.controller'
import { FetchWaterTemperatureController } from './controllers/fetch-water-temperature.controller'
import { FetchWaterPhController } from './controllers/fetch-water-ph.controller'
import { FetchWaterTDSController } from './controllers/fetch-water-tds.controller'
import { FetchWaterECController } from './controllers/fetch-water-ec.controller'
import { FetchWaterEC25CController } from './controllers/fetch-water-ec25c.controller'

import { AuthenticateAccountUseCase } from '@/domain/account/application/use-cases/authenticate-account'
import { RegisterAccountUseCase } from '@/domain/account/application/use-cases/register-account'
import { FetchAccountsUseCase } from '@/domain/account/application/use-cases/fetch-accounts'
import { GetAccountUseCase } from '@/domain/account/application/use-cases/get-account'
import { FetchAmbientTemperatureUseCase } from '@/domain/measurement/application/use-cases/fetch-ambient-temperature'
import { FetchAmbientHumidityUseCase } from '@/domain/measurement/application/use-cases/fetch-ambient-humidity'
import { FetchWaterTemperatureUseCase } from '@/domain/measurement/application/use-cases/fetch-water-temperature'
import { FetchWaterPhUseCase } from '@/domain/measurement/application/use-cases/fetch-water-ph'
import { FetchWaterTDSUseCase } from '@/domain/measurement/application/use-cases/fetch-water-tds'
import { FetchWaterEC25CUseCase } from '@/domain/measurement/application/use-cases/fetch-water-ec25c'
import { FetchWaterECUseCase } from '@/domain/measurement/application/use-cases/fetch-water-ec'

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
        FetchAmbientHumidityController,
        FetchWaterTemperatureController,
        FetchWaterPhController,
        FetchWaterTDSController,
        FetchWaterECController,
        FetchWaterEC25CController
    ],
    providers: [
        AuthenticateAccountUseCase,
        GetAccountUseCase,
        FetchAccountsUseCase,
        RegisterAccountUseCase,
        FetchAmbientTemperatureUseCase,
        FetchAmbientHumidityUseCase,
        FetchWaterTemperatureUseCase,
        FetchWaterPhUseCase,
        FetchWaterTDSUseCase,
        FetchWaterECUseCase,
        FetchWaterEC25CUseCase
    ]
})
export class HttpModule {}
