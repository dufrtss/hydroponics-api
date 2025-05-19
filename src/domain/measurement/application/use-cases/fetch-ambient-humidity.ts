import { Injectable } from '@nestjs/common'
import { Either, right } from '@/core/either'
import { Measurement } from '../../enterprise/entities/measurement'
import { AmbientHumidityRepository } from '../repositories/ambient-humidity-repository'

interface FetchAmbientHumidityUseCaseRequest {
    page: number,
    pageSize: number,
    from: Date,
    to: Date
}

type FetchAmbientHumidityUseCaseResponse = Either<
    null,
    {
        measurements: Measurement[]
    }
>

@Injectable()
export class FetchAmbientHumidityUseCase {
    constructor(private ambientHumidityRepository: AmbientHumidityRepository) {}

    async execute({
        page,
        pageSize,
        from,
        to
    }: FetchAmbientHumidityUseCaseRequest): Promise<FetchAmbientHumidityUseCaseResponse> {
        const measurements = await this.ambientHumidityRepository.findMany({
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
