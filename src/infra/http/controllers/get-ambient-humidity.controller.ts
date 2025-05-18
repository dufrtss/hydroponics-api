import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common'
import { GetAmbientHumidityUseCase } from '@/domain/measurement/application/use-cases/get-ambient-humidity'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'

@Controller('/measurements/ambient/humidity')
@UseGuards(JwtAuthGuard)
export class GetAmbientHumidityController {
    constructor(private getAmbientHumidity: GetAmbientHumidityUseCase) {}

    @Get()
    @HttpCode(200)
    async handle() {
        return await this.getAmbientHumidity.execute()
    }
}
