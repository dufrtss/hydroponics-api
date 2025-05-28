import { makeMeasurement } from 'test/factories/make-measurement'
import { FetchWaterTemperatureUseCase } from './fetch-water-temperature'
import { InMemoryWaterTemperatureRepository } from 'test/repositories/in-memory-water-temperature-repository'

let inMemoryWaterTemperatureRepository: InMemoryWaterTemperatureRepository
let sut: FetchWaterTemperatureUseCase

describe('Fetch Water Temperature', () => {
    beforeEach(() => {
        inMemoryWaterTemperatureRepository = new InMemoryWaterTemperatureRepository()
        sut = new FetchWaterTemperatureUseCase(inMemoryWaterTemperatureRepository)
    })

    it('should be able to fetch paginated water temperature measurements in a time period', async () => {
        for (let i = 0; i < 6; i++) {
            const measurement = makeMeasurement()
            await inMemoryWaterTemperatureRepository.create(measurement)
        }

        const page = 2
        const pageSize = 3
        const from = new Date()
        const to = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)

        const result = await sut.execute({
            page,
            pageSize,
            from,
            to
        })

        expect(result.isRight()).toBe(true)

        if (result.isLeft()) {
            return
        }

        const { measurements } = result.value

        expect(measurements).toHaveLength(2)
    })
})
