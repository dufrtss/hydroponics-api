import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface MeasurementData {
  value: number
  unit: string
}

export interface MeasurementProps {
  sensorType: string
  measurementCategory: 'WATER' | 'AMBIENT'
  measurementType: 'TEMPERATURE' | 'HUMIDITY' | 'PH' | 'TDS' | 'EC' | 'EC25C'
  timestamp: number
  data: MeasurementData
}

export class Measurement extends Entity<MeasurementProps> {
    get sensorType() {
        return this.props.sensorType
    }

    get measurementCategory() {
        return this.props.measurementCategory
    }

    get measurementType() {
        return this.props.measurementType
    }

    get timestamp() {
        return this.props.timestamp
    }

    get data() {
        return this.props.data
    }

    set data(data: MeasurementData) {
        this.props.data = data
    }

    static create(props: Optional<MeasurementProps, never>, id?: UniqueEntityID) {
        const measurement = new Measurement({
            ...props
        }, id)
        
        return measurement
    }
}
