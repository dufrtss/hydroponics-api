import { Controller, Get, HttpCode } from '@nestjs/common'
import { GetAmbientTemperatureUseCase } from '@/domain/measurement/application/use-cases/get-ambient-temperature'

@Controller('/measurements/ambient/temperature')
export class GetAmbientTemperatureController {
    constructor(private getAmbientTemperature: GetAmbientTemperatureUseCase) {}

    @Get()
    @HttpCode(200)
    async handle() {
        return await this.getAmbientTemperature.execute()
    }
}
