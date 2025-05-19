import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { FetchAmbientHumidityUseCase } from '@/domain/measurement/application/use-cases/fetch-ambient-humidity'
import { PaginationQueryParamSchema, paginationQueryValidationPipe } from '../validation/zod-pagination-params-validation'
import { TimePeriodQueryParamSchema, timePeriodQueryValidationPipe } from '../validation/zod-time-period-params-validation'
import { MeasurementPresenter } from '../presenters/measurement-presenter'

@Controller('/measurements/ambient/humidity')
export class FetchAmbientHumidityController {
    constructor(private fetchAmbientHumidity: FetchAmbientHumidityUseCase) {}

    @Get()
    async handle(
        @Query(paginationQueryValidationPipe) { page, pageSize }: PaginationQueryParamSchema,
        @Query(timePeriodQueryValidationPipe) { from, to }: TimePeriodQueryParamSchema
    ) {
        const result = await this.fetchAmbientHumidity.execute({
            page,
            pageSize,
            from,
            to
        })

        if (result.isLeft()) {
            throw new BadRequestException()
        }

        const measurements = result.value.measurements

        return {
            measurements: measurements.map((measurement) => MeasurementPresenter.toHTTP(measurement))
        }
    }
}
