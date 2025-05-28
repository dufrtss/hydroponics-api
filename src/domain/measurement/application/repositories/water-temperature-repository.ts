import { TimePeriodParams } from '@/core/repositories/time-period-params'
import { Measurement } from '../../enterprise/entities/measurement'
import { PaginationParams } from '@/core/repositories/pagination-params'

export abstract class WaterTemperatureRepository {
    abstract findMany(
        { page }: PaginationParams,
        { from, to }: TimePeriodParams
    ): Promise<Measurement[]>
    abstract create(measurement: Measurement): Promise<void>
}
