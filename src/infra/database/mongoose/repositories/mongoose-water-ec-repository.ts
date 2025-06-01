import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Measurement as MeasurementSchema } from '../schemas/measurement.schema'
import { Injectable } from '@nestjs/common'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { TimePeriodParams } from '@/core/repositories/time-period-params'
import { MongooseMeasurementMapper } from '../mappers/mongoose-measurement-mapper'
import { Measurement } from '@/domain/measurement/enterprise/entities/measurement'
import { WaterECRepository } from '@/domain/measurement/application/repositories/water-ec-repository'
import { MeasurementParams } from '@/core/repositories/measurement-params'

@Injectable()
export class MongooseWaterECRepository implements WaterECRepository {
    constructor(@InjectModel(MeasurementSchema.name) private measurements: Model<MeasurementSchema>) {}
    
    async findMany(
        { page, pageSize }: PaginationParams,
        { from, to }: TimePeriodParams,
        { category, type }: MeasurementParams

    ): Promise<Measurement[]> {
        const measurements = await this.measurements
            .find(
                {
                    'measurementCategory': category,
                    'measurementType': type,
                    'createdAt': { $gte: from, $lte: to }
                }
            )
            .sort({ createdAt: -1 })
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
