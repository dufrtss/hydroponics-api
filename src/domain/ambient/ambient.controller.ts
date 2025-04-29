import { Controller, Get } from '@nestjs/common'

import { GetAmbientHumidity } from 'src/application/use-cases/get-ambient-humidity'
import { GetAmbientTemperature } from 'src/application/use-cases/get-ambient-temperature'

@Controller('/sensors/ambient')
export class AmbientController {
    constructor(
      private readonly getAmbientTemperature: GetAmbientTemperature,
      private readonly getAmbientHumidity: GetAmbientHumidity
    ) {}

  @Get('/temperature')
    getTemperature(): string {
        return this.getAmbientTemperature.execute()
    }

    @Get('/humidity')
  getHumidity(): string {
      return this.getAmbientHumidity.execute()
  }
}
