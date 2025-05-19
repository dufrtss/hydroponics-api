import { Injectable } from '@nestjs/common'
import { Either, right } from '@/core/either'
import { Measurement } from '../../enterprise/entities/measurement'
import { AmbientTemperatureRepository } from '../repositories/ambient-temperature-repository'

interface FetchAmbientTemperatureUseCaseRequest {
    page: number,
    pageSize: number,
    from: Date,
    to: Date
}

type FetchAmbientTemperatureUseCaseResponse = Either<
    null,
    {
        measurements: Measurement[]
    }
>

@Injectable()
export class FetchAmbientTemperatureUseCase {
    constructor(private ambientTemperatureRepository: AmbientTemperatureRepository) {}

    async execute({
        page,
        pageSize,
        from,
        to
    }: FetchAmbientTemperatureUseCaseRequest): Promise<FetchAmbientTemperatureUseCaseResponse> {
        const measurements = await this.ambientTemperatureRepository.findMany({
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
