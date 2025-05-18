import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Measurement } from '../schemas/measurement.schema'
import { AmbientTemperatureRepository } from '@/domain/measurement/application/repositories/ambient-temperature-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MongooseAmbientTemperatureRepository implements AmbientTemperatureRepository {
    constructor(@InjectModel('measurements') private measurements: Model<Measurement>) {}
    
    async findMany(): Promise<Measurement[]> {
        const measurements = await this.measurements.find({
            'data.unit': '°C'
        }).where().exec() satisfies Measurement[]

        return measurements
    }
}
