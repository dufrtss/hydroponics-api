import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Measurement, MeasurementProps } from '@/domain/measurement/enterprise/entities/measurement'
import { generateTimestamp } from 'test/utils/generate-timestamp'

export function makeMeasurement(
    override: Partial<MeasurementProps> = {},
    id?: UniqueEntityID
) {
    const measurement = Measurement.create(
        {
            sensor: 'DHT22',
            timestamp: generateTimestamp(),
            data: {
                value: Math.random() * 100,
                unit: '°C',
            },
            ...override
        },
        id
    )

    return measurement
}
