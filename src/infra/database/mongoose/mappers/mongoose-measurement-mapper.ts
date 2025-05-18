import { Measurement } from '@/domain/measurement/enterprise/entities/measurement'
import { MeasurementDocument, Measurement as MongooseMeasurement } from '../schemas/measurement.schema'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class MongooseMeasurementMapper {
    static toDomain(raw: MeasurementDocument): Measurement {
        return Measurement.create(
            {
                sensor: raw.sensor,
                timestamp: raw.timestamp,
                data: raw.data,
            },
            new UniqueEntityID(raw._id.toString()
            )
        )
    }

    static toPersistence(entity: Measurement): MongooseMeasurement {
        return {
            sensor: entity.sensor,
            timestamp: entity.timestamp,
            data: entity.data,
        }
    }
}
