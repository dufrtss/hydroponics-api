
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Measurement, MeasurementSchema } from './schemas/measurement.schema'
import { MeasurementsController } from '../measurements.controller'
import { GetAmbientTemperatureUseCase } from 'src/application/measurements/use-cases/get-ambient-temperature'
import { GetAmbientHumidityUseCase } from 'src/application/measurements/use-cases/get-ambient-humidity'

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: Measurement.name,
            schema: MeasurementSchema
        }
    ])],
    controllers: [MeasurementsController],
    providers: [
        GetAmbientTemperatureUseCase,
        GetAmbientHumidityUseCase
    ]
})
export class MeasurementsModule {}
