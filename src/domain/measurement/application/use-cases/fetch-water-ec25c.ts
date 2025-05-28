import { Injectable } from '@nestjs/common'
import { Either, right } from '@/core/either'
import { Measurement } from '../../enterprise/entities/measurement'
import { WaterECRepository } from '../repositories/water-ec-repository'

interface FetchWaterEC25CUseCaseRequest {
    page: number,
    pageSize: number,
    from: Date,
    to: Date
}

type FetchWaterEC25CUseCaseResponse = Either<
    null,
    {
        measurements: Measurement[]
    }
>

@Injectable()
export class FetchWaterEC25CUseCase {
    constructor(private waterECRepository: WaterECRepository) {}

    async execute({
        page,
        pageSize,
        from,
        to
    }: FetchWaterEC25CUseCaseRequest): Promise<FetchWaterEC25CUseCaseResponse> {
        const measurements = await this.waterECRepository.findMany({
            page,
            pageSize
        }, {
            from,
            to
        }, {
            category: 'WATER',
            type: 'EC25C'
        })

        return right({
            measurements
        })
    }
}
