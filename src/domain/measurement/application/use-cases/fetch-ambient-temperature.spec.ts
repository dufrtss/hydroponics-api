import { makeMeasurement } from 'test/factories/make-measurement'
import { FetchAmbientTemperatureUseCase } from './fetch-ambient-temperature'
import { InMemoryAmbientTemperatureRepository } from 'test/repositories/in-memory-ambient-temperature-repository'

let inMemoryAmbientTemperatureRepository: InMemoryAmbientTemperatureRepository
let sut: FetchAmbientTemperatureUseCase

describe('Fetch Ambient Temperature', () => {
    beforeEach(() => {
        inMemoryAmbientTemperatureRepository = new InMemoryAmbientTemperatureRepository()
        sut = new FetchAmbientTemperatureUseCase(inMemoryAmbientTemperatureRepository)
    })

    it('should be able to fetch paginated ambient temperature measurements in a time period', async () => {
        for (let i = 0; i < 6; i++) {
            const measurement = makeMeasurement()
            await inMemoryAmbientTemperatureRepository.create(measurement)
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
