import { Measurement } from '@/domain/measurement/enterprise/entities/measurement'

export class MeasurementPresenter {
    static toHTTP(measurement: Measurement) {
        return {
            id: measurement.id.toString(),
            sensorType: measurement.sensorType,
            measurementCategory: measurement.measurementCategory,
            measurementType: measurement.measurementType,
            timestamp: measurement.timestamp,
            data: measurement.data
        }
    }
}
