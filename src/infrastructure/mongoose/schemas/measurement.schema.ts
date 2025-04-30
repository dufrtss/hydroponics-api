import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { SensorRead } from './sensor-read.schema'

export type MeasurementDocument = HydratedDocument<Measurement>;

@Schema()
export class Measurement {
  @Prop() sensor: string
  @Prop() timestamp: number
  @Prop(SensorRead) data: SensorRead
}

export const MeasurementSchema = SchemaFactory.createForClass(Measurement)
