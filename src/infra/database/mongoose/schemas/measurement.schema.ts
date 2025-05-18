import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type MeasurementDocument = HydratedDocument<Measurement>;

@Schema()
export class Measurement {
    sensor: string | undefined
    timestamp: number | undefined

    @Prop(raw({
        value: { type: Number },
        unit: { type: String }
    }))
        data: Record<string | number, any> | undefined
}

export const MeasurementSchema = SchemaFactory.createForClass(Measurement)
