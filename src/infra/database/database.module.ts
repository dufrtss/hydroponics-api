import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { PrismaService } from './prisma/prisma.service'
import { Measurement, MeasurementSchema } from './mongoose/schemas/measurement.schema'

import { AccountsRepository } from '@/domain/account/application/repositories/accounts-repository'
import { PrismaAccountsRepository } from './prisma/repositories/prisma-accounts-repository'
import { AmbientTemperatureRepository } from '@/domain/measurement/application/repositories/ambient-temperature-repository'
import { MongooseAmbientTemperatureRepository } from './mongoose/repositories/mongoose-ambient-temperature-repository'
import { AmbientHumidityRepository } from '@/domain/measurement/application/repositories/ambient-humidity-repository'
import { MongooseAmbientHumidityRepository } from './mongoose/repositories/mongoose-ambient-humidity-repository'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Measurement.name, schema: MeasurementSchema }
        ])
    ],
    providers: [
        PrismaService,
        { provide: AccountsRepository, useClass: PrismaAccountsRepository },
        { provide: AmbientTemperatureRepository, useClass: MongooseAmbientTemperatureRepository },
        { provide: AmbientHumidityRepository, useClass: MongooseAmbientHumidityRepository }
    ],
    exports: [
        PrismaService,
        AccountsRepository,
        AmbientTemperatureRepository,
        AmbientHumidityRepository
    ]
})
export class DatabaseModule {}
