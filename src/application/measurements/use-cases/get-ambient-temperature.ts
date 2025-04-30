import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Measurement } from 'src/infrastructure/mongoose/schemas/measurement.schema'

@Injectable()
export class GetAmbientTemperatureUseCase {
    constructor(
        @InjectModel(Measurement.name) private measurementModel: Model<Measurement>
    ) {}
  
    async execute(): Promise<Measurement[]> {
        const measurements = await this.measurementModel.find().where().exec() satisfies Measurement[]

        return measurements
    }
}
