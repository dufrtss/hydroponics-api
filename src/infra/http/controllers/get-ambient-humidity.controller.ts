import { Controller, Get, HttpCode } from '@nestjs/common'
import { GetAmbientHumidityUseCase } from '@/domain/measurement/application/use-cases/get-ambient-humidity'

@Controller('/measurements/ambient/humidity')
export class GetAmbientHumidityController {
    constructor(private getAmbientHumidity: GetAmbientHumidityUseCase) {}

    @Get()
    @HttpCode(200)
    async handle() {
        return await this.getAmbientHumidity.execute()
    }
}
