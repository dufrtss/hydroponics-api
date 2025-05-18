import { AmbientTemperatureRepository } from '@/domain/measurement/application/repositories/ambient-temperature-repository'
import { Injectable } from '@nestjs/common'
import { Measurement } from '@/infra/database/mongoose/schemas/measurement.schema'

@Injectable()
export class GetAmbientTemperatureUseCase {
    constructor(
        private ambientTemperatureRepository: AmbientTemperatureRepository
    ) {}
  
    async execute(): Promise<Measurement[]> {
        const measurements = await this.ambientTemperatureRepository.findMany()

        return measurements
    }
}
