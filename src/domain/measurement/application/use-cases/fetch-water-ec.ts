import { Injectable } from '@nestjs/common'
import { Either, right } from '@/core/either'
import { Measurement } from '../../enterprise/entities/measurement'
import { WaterECRepository } from '../repositories/water-ec-repository'

interface FetchWaterECUseCaseRequest {
    page: number,
    pageSize: number,
    from: Date,
    to: Date
}

type FetchWaterECUseCaseResponse = Either<
    null,
    {
        measurements: Measurement[]
    }
>

@Injectable()
export class FetchWaterECUseCase {
    constructor(private waterECRepository: WaterECRepository) {}

    async execute({
        page,
        pageSize,
        from,
        to
    }: FetchWaterECUseCaseRequest): Promise<FetchWaterECUseCaseResponse> {
        const measurements = await this.waterECRepository.findMany({
            page,
            pageSize
        }, {
            from,
            to
        }, {
            category: 'WATER',
            type: 'EC'
        })

        return right({
            measurements
        })
    }
}
