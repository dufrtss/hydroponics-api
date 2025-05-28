import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { EnvModule } from '../env/env.module'
import { EnvService } from '../env/env.service'

import { PrismaService } from './prisma/prisma.service'
import { Measurement, MeasurementSchema } from './mongoose/schemas/measurement.schema'

import { AccountsRepository } from '@/domain/account/application/repositories/accounts-repository'
import { PrismaAccountsRepository } from './prisma/repositories/prisma-accounts-repository'
import { AmbientTemperatureRepository } from '@/domain/measurement/application/repositories/ambient-temperature-repository'
import { MongooseAmbientTemperatureRepository } from './mongoose/repositories/mongoose-ambient-temperature-repository'
import { AmbientHumidityRepository } from '@/domain/measurement/application/repositories/ambient-humidity-repository'
import { MongooseAmbientHumidityRepository } from './mongoose/repositories/mongoose-ambient-humidity-repository'
import { WaterTemperatureRepository } from '@/domain/measurement/application/repositories/water-temperature-repository'
import { MongooseWaterTemperatureRepository } from './mongoose/repositories/mongoose-water-temperature-repository'
import { WaterPhRepository } from '@/domain/measurement/application/repositories/water-ph-repository'
import { MongooseWaterPhRepository } from './mongoose/repositories/mongoose-water-ph-repository'
import { WaterTDSRepository } from '@/domain/measurement/application/repositories/water-tds-repository'
import { MongooseWaterTDSRepository } from './mongoose/repositories/mongoose-water-tds-repository'
import { WaterECRepository } from '@/domain/measurement/application/repositories/water-ec-repository'
import { MongooseWaterECRepository } from './mongoose/repositories/mongoose-water-ec-repository'

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [EnvModule],
            inject: [EnvService],
            useFactory: (envService: EnvService) => {
                return {
                    uri: envService.get('MONGODB_DATABASE_URL'),
                    dbName: envService.get('MONGODB_DBNAME')
                }}
        }),
        MongooseModule.forFeature([
            { name: Measurement.name, schema: MeasurementSchema }
        ])
    ],
    providers: [
        PrismaService,
        { provide: AccountsRepository, useClass: PrismaAccountsRepository },
        { provide: AmbientTemperatureRepository, useClass: MongooseAmbientTemperatureRepository },
        { provide: AmbientHumidityRepository, useClass: MongooseAmbientHumidityRepository },
        { provide: WaterTemperatureRepository, useClass: MongooseWaterTemperatureRepository },
        { provide: WaterPhRepository, useClass: MongooseWaterPhRepository },
        { provide: WaterTDSRepository, useClass: MongooseWaterTDSRepository },
        { provide: WaterECRepository, useClass: MongooseWaterECRepository }
    ],
    exports: [
        PrismaService,
        AccountsRepository,
        AmbientTemperatureRepository,
        AmbientHumidityRepository,
        WaterTemperatureRepository,
        WaterPhRepository,
        WaterTDSRepository,
        WaterECRepository
    ]
})
export class DatabaseModule {}
