import { Injectable } from '@nestjs/common'
import { Either, right } from '@/core/either'
import { Measurement } from '../../enterprise/entities/measurement'
import { WaterPhRepository } from '../repositories/water-ph-repository'

interface FetchWaterPhUseCaseRequest {
    page: number,
    pageSize: number,
    from: Date,
    to: Date
}

type FetchWaterPhUseCaseResponse = Either<
    null,
    {
        measurements: Measurement[]
    }
>

@Injectable()
export class FetchWaterPhUseCase {
    constructor(private waterPhRepository: WaterPhRepository) {}

    async execute({
        page,
        pageSize,
        from,
        to
    }: FetchWaterPhUseCaseRequest): Promise<FetchWaterPhUseCaseResponse> {
        const measurements = await this.waterPhRepository.findMany({
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
