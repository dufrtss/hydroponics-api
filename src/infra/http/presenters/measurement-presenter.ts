import { Measurement } from '@/domain/measurement/enterprise/entities/measurement'

export class MeasurementPresenter {
    static toHTTP(measurement: Measurement) {
        return {
            id: measurement.id.toString(),
            sensor: measurement.sensor,
            timestamp: measurement.timestamp,
            data: measurement.data
        }
    }
}
