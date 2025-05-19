import { PaginationParams } from '@/core/repositories/pagination-params'
import { TimePeriodParams } from '@/core/repositories/time-period-params'
import { AmbientHumidityRepository } from '@/domain/measurement/application/repositories/ambient-humidity-repository'
import { Measurement } from '@/domain/measurement/enterprise/entities/measurement'

export class InMemoryAmbientHumidityRepository implements AmbientHumidityRepository {
    public items: Measurement[] = []

    async findMany(
        { page, pageSize }: PaginationParams,
        { from, to }: TimePeriodParams
    ) {
        let filtered = this.items

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
