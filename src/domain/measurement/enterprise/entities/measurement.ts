import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface MeasurementData {
  value: number
  unit: string
}

export interface MeasurementProps {
  sensor: string
  timestamp: number
  data: Record<string | number, MeasurementData>
}

export class Measurement extends Entity<MeasurementProps> {
    get sensor() {
        return this.props.sensor
    }

    get timestamp() {
        return this.props.timestamp
    }

    get data() {
        return this.props.data
    }

    set data(data: Record<string | number, MeasurementData>) {
        this.props.data = data
    }

    static create(props: Optional<MeasurementProps, never>, id?: UniqueEntityID) {
        const measurement = new Measurement({
            ...props
        }, id)
        
        return measurement
    }
}
