import { Injectable } from '@nestjs/common'
import { Either, right } from '@/core/either'
import { Measurement } from '../../enterprise/entities/measurement'
import { WaterTemperatureRepository } from '../repositories/water-temperature-repository'

interface FetchWaterTemperatureUseCaseRequest {
    page: number,
    pageSize: number,
    from: Date,
    to: Date
}

type FetchWaterTemperatureUseCaseResponse = Either<
    null,
    {
        measurements: Measurement[]
    }
>

@Injectable()
export class FetchWaterTemperatureUseCase {
    constructor(private waterTemperatureRepository: WaterTemperatureRepository) {}

    async execute({
        page,
        pageSize,
        from,
        to
    }: FetchWaterTemperatureUseCaseRequest): Promise<FetchWaterTemperatureUseCaseResponse> {
        const measurements = await this.waterTemperatureRepository.findMany({
            page,
            pageSize
        }, {
            from,
            to
        })

        return right({
            measurements
        })
    }
}
