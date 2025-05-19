import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Measurement as MeasurementSchema } from '../schemas/measurement.schema'
import { AmbientHumidityRepository } from '@/domain/measurement/application/repositories/ambient-humidity-repository'
import { Injectable } from '@nestjs/common'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { TimePeriodParams } from '@/core/repositories/time-period-params'
import { MongooseMeasurementMapper } from '../mappers/mongoose-measurement-mapper'
import { Measurement } from '@/domain/measurement/enterprise/entities/measurement'

@Injectable()
export class MongooseAmbientHumidityRepository implements AmbientHumidityRepository {
    constructor(@InjectModel(MeasurementSchema.name) private measurements: Model<MeasurementSchema>) {}
    
    async findMany(
        { page, pageSize }: PaginationParams,
        { from, to }: TimePeriodParams
    ): Promise<Measurement[]> {
        // TODO: REMOVE LOG
        console.log(from, to)
        const measurements = await this.measurements
            .find(
                {
                    'data.unit': '%RH',
                    // TODO: HIDDEN FOR NOW DUE TO SENSORS NOT PUBLISHING WITH CORRECT TIMESTAMPS
                    // timestamp: {
                    //     $gte: from.getTime(),
                    //     $lte: to.getTime()
                    // }
                }
            )
            .sort({ timestamp: -1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec()

        return measurements.map((measurement) => {
            return MongooseMeasurementMapper.toDomain(measurement)
        })
    }

    async create(measurement: Measurement): Promise<void> {
        const data = MongooseMeasurementMapper.toPersistence(measurement)
        
        await this.measurements.create(data)
    }
}
