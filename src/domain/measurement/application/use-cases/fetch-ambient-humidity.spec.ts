import { InMemoryAmbientHumidityRepository } from 'test/repositories/in-memory-ambient-humidity-repository'
import { FetchAmbientHumidityUseCase } from './fetch-ambient-humidity'
import { makeMeasurement } from 'test/factories/make-measurement'

let inMemoryAmbientHumidityRepository: InMemoryAmbientHumidityRepository
let sut: FetchAmbientHumidityUseCase

describe('Fetch Ambient Humidity', () => {
    beforeEach(() => {
        inMemoryAmbientHumidityRepository = new InMemoryAmbientHumidityRepository()
        sut = new FetchAmbientHumidityUseCase(inMemoryAmbientHumidityRepository)
    })

    it('should be able to fetch paginated ambient humidity measurements in a time period', async () => {
        for (let i = 0; i < 6; i++) {
            const measurement = makeMeasurement()
            await inMemoryAmbientHumidityRepository.create(measurement)
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
