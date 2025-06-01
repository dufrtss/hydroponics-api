import { MeasurementData } from '@/domain/measurement/enterprise/entities/measurement'
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type MeasurementDocument = HydratedDocument<Measurement>;

@Schema()
export class Measurement {
    @Prop({
        required: true
    })
        sensorType!: string

    @Prop({
        required: true
    })
        measurementCategory!: 'WATER' | 'AMBIENT'

    @Prop({
        required: true
    })
        measurementType!: 'TEMPERATURE' | 'HUMIDITY' | 'PH' | 'TDS' | 'EC' | 'EC25C'

    @Prop({
        required: true
    })
        receivedAt!: number

    @Prop({
        required: true
    })
        createdAt!: number

    @Prop(raw({
        value: { type: Number, required: true },
        unit: { type: String, required: true }
    }))
        data!: MeasurementData
}

export const MeasurementSchema = SchemaFactory.createForClass(Measurement)
