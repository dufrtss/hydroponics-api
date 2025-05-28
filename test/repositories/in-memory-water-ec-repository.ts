import { MeasurementParams } from '@/core/repositories/measurement-params'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { TimePeriodParams } from '@/core/repositories/time-period-params'
import { WaterECRepository } from '@/domain/measurement/application/repositories/water-ec-repository'
import { Measurement } from '@/domain/measurement/enterprise/entities/measurement'

export class InMemoryWaterECRepository implements WaterECRepository {
    public items: Measurement[] = []

    async findMany(
        { page, pageSize }: PaginationParams,
        { from, to }: TimePeriodParams,
        { category, type }: MeasurementParams
    ) {
        let filtered = this.items

        filtered = filtered.filter(item => item.measurementCategory == category)
        filtered = filtered.filter(item => item.measurementType == type)

        if (from) {
            filtered = filtered.filter(item => item.timestamp >= from.getTime())
        }

        if (to) {
            filtered = filtered.filter(item => item.timestamp <= to.getTime())
        }

        filtered = filtered.sort((a, b) => b.timestamp - a.timestamp)

        const startIndex = (page - 1) * pageSize
        const endIndex = page * pageSize


        return filtered.slice(startIndex, endIndex)
    }

    async create(measurement: Measurement) {
        this.items.push(measurement)
    }
}
