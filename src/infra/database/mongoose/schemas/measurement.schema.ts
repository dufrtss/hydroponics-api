import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { SensorRead } from './sensor-read.schema'

export type MeasurementDocument = HydratedDocument<Measurement>;

@Schema()
export class Measurement {
    @Prop({ type: String, required: false }) sensor?: string
    @Prop({ type: String, required: false }) timestamp?: number
    @Prop({ type: SensorRead, required: false }) data?: SensorRead
}

export const MeasurementSchema = SchemaFactory.createForClass(Measurement)
