import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

function getStartOfCurrentDay() {
    const currentDay = new Date()
    currentDay.setHours(0, 0, 0, 0)
    return currentDay
}

export const timePeriodQueryParamSchema = z.object({
    from: z
        .preprocess(
            (val) => (val ? new Date(val as string) : getStartOfCurrentDay()),
            z.date()
        ),
    to: z
        .preprocess(
            (val) => (val ? new Date(val as string) : new Date()),
            z.date()
        ),
})

export type TimePeriodQueryParamSchema = z.infer<typeof timePeriodQueryParamSchema>
export const timePeriodQueryValidationPipe = new ZodValidationPipe(timePeriodQueryParamSchema)
