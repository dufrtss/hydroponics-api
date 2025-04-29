import { Module } from '@nestjs/common'

import { AmbientController } from './domain/ambient/ambient.controller'
import { GetAmbientTemperature } from './application/use-cases/get-ambient-temperature'
import { GetAmbientHumidity } from './application/use-cases/get-ambient-humidity'

@Module({
    imports: [],
    controllers: [
        AmbientController
    ],
    providers: [
        GetAmbientTemperature,
        GetAmbientHumidity
    ]
})
export class AppModule {}
