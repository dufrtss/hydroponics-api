import { Controller, Get } from '@nestjs/common'

import { GetAmbientHumidityUseCase } from 'src/application/measurements/use-cases/get-ambient-humidity'
import { GetAmbientTemperatureUseCase } from 'src/application/measurements/use-cases/get-ambient-temperature'
import { Measurement } from './measurements/schemas/measurement.schema'

@Controller('/sensors')
export class MeasurementsController {
    constructor(
        private readonly getAmbientTemperatureUseCase: GetAmbientTemperatureUseCase,
        private readonly getAmbientHumidityUseCase: GetAmbientHumidityUseCase
    ) {}

    @Get('/ambient/temperature')
    getAmbientTemperature(): Promise<Measurement[]> {
        return this.getAmbientTemperatureUseCase.execute()
    }

    @Get('/ambient/humidity')
    getAmbientHumidity(): string {
        return this.getAmbientHumidityUseCase.execute()
    }
}
