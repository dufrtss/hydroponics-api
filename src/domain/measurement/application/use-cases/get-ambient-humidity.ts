import { Injectable } from '@nestjs/common'
import { Measurement } from '@/infra/database/mongoose/schemas/measurement.schema'
import { AmbientHumidityRepository } from '../repositories/ambient-humidity-repository'

@Injectable()
export class GetAmbientHumidityUseCase {
    constructor(
        private ambientHumidityRepository: AmbientHumidityRepository
    ) {}
  
    async execute(): Promise<Measurement[]> {
        const measurements = await this.ambientHumidityRepository.findMany()

        return measurements
    }
}
