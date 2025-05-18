import { Measurement } from '@/infra/database/mongoose/schemas/measurement.schema'

export abstract class AmbientHumidityRepository {
    abstract findMany(): Promise<Measurement[]>
}
