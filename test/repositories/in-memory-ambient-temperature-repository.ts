import { AmbientTemperatureRepository } from '@/domain/measurement/application/repositories/ambient-temperature-repository'
import { Measurement } from '@/infra/database/mongoose/schemas/measurement.schema'

export class InMemoryAmbientTemperatureRepository implements AmbientTemperatureRepository {
    public items: Measurement[] = []

    async findMany() {
        return this.items
    }
}
