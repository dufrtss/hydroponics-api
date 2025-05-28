import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { FetchWaterEC25CUseCase } from '@/domain/measurement/application/use-cases/fetch-water-ec25c'
import { PaginationQueryParamSchema, paginationQueryValidationPipe } from '../validation/zod-pagination-params-validation'
import { TimePeriodQueryParamSchema, timePeriodQueryValidationPipe } from '../validation/zod-time-period-params-validation'
import { MeasurementPresenter } from '../presenters/measurement-presenter'

@Controller('/measurements/water/ec25c')
export class FetchWaterEC25CController {
    constructor(private fetchWaterEC25C: FetchWaterEC25CUseCase) {}

    @Get()
    async handle(
        @Query(paginationQueryValidationPipe) { page, pageSize }: PaginationQueryParamSchema,
        @Query(timePeriodQueryValidationPipe) { from, to }: TimePeriodQueryParamSchema
    ) {
        const result = await this.fetchWaterEC25C.execute({
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
