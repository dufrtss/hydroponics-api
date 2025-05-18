import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type SensorReadDocument = HydratedDocument<SensorRead>;

@Schema()
export class SensorRead {
  @Prop({ type: Number, required: false }) value?: number
  @Prop({ type: String, required: false }) unit?: string
}

export const SensorReadSchema = SchemaFactory.createForClass(SensorRead)
