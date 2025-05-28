import { Injectable } from '@nestjs/common'
import { Either, right } from '@/core/either'
import { Measurement } from '../../enterprise/entities/measurement'
import { WaterTDSRepository } from '../repositories/water-tds-repository'

interface FetchWaterTDSUseCaseRequest {
    page: number,
    pageSize: number,
    from: Date,
    to: Date
}

type FetchWaterTDSUseCaseResponse = Either<
    null,
    {
        measurements: Measurement[]
    }
>

@Injectable()
export class FetchWaterTDSUseCase {
    constructor(private waterTDSRepository: WaterTDSRepository) {}

    async execute({
        page,
        pageSize,
        from,
        to
    }: FetchWaterTDSUseCaseRequest): Promise<FetchWaterTDSUseCaseResponse> {
        const measurements = await this.waterTDSRepository.findMany({
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
