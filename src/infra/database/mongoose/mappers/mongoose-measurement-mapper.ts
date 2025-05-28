import { Measurement } from '@/domain/measurement/enterprise/entities/measurement'
import { MeasurementDocument, Measurement as MongooseMeasurement } from '../schemas/measurement.schema'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class MongooseMeasurementMapper {
    static toDomain(raw: MeasurementDocument): Measurement {
        return Measurement.create(
            {
                sensorType: raw.sensorType,
                measurementCategory: raw.measurementCategory,
                measurementType: raw.measurementType,
                timestamp: raw.timestamp,
                data: raw.data,
            },
            new UniqueEntityID(raw._id.toString()
            )
        )
    }

    static toPersistence(entity: Measurement): MongooseMeasurement {
        return {
            sensorType: entity.sensorType,
            measurementCategory: entity.measurementCategory,
            measurementType: entity.measurementType,
            timestamp: entity.timestamp,
            data: entity.data,
        }
    }
}
