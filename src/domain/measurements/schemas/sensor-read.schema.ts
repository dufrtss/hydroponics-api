import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type SensorReadDocument = HydratedDocument<SensorRead>;

@Schema()
export class SensorRead {
  @Prop() value: number
  @Prop() unit: string
}

export const SensorReadSchema = SchemaFactory.createForClass(SensorRead)
