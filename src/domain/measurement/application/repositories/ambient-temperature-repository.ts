import { Measurement } from '@/infra/database/mongoose/schemas/measurement.schema'

export abstract class AmbientTemperatureRepository {
    abstract findMany(): Promise<Measurement[]>
}
