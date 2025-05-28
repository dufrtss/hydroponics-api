import { TimePeriodParams } from '@/core/repositories/time-period-params'
import { Measurement } from '../../enterprise/entities/measurement'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { MeasurementParams } from '@/core/repositories/measurement-params'

export abstract class WaterECRepository {
    abstract findMany(
        { page }: PaginationParams,
        { from, to }: TimePeriodParams,
        { category, type }: MeasurementParams
    ): Promise<Measurement[]>
    abstract create(measurement: Measurement): Promise<void>
}
