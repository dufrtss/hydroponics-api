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
        measurementCategory!: string

    @Prop({
        required: true
    })
        measurementType!: string

    @Prop({
        required: true
    })
        timestamp!: number

    @Prop(raw({
        value: { type: Number, required: true },
        unit: { type: String, required: true }
    }))
        data!: MeasurementData
}

export const MeasurementSchema = SchemaFactory.createForClass(Measurement)
