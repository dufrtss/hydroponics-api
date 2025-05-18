import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Measurement } from '../schemas/measurement.schema'
import { AmbientHumidityRepository } from '@/domain/measurement/application/repositories/ambient-humidity-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MongooseAmbientHumidityRepository implements AmbientHumidityRepository {
    constructor(@InjectModel(Measurement.name) private measurements: Model<Measurement>) {}
    
    async findMany(): Promise<Measurement[]> {
        const measurements = await this.measurements.find({
            'data.unit': '%RH'
        }).where().exec() satisfies Measurement[]

        return measurements
    }
}
