import { makeMeasurement } from 'test/factories/make-measurement'
import { FetchWaterPhUseCase } from './fetch-water-ph'
import { InMemoryWaterPhRepository } from 'test/repositories/in-memory-water-ph-repository'

let inMemoryWaterPhRepository: InMemoryWaterPhRepository
let sut: FetchWaterPhUseCase

describe('Fetch Water Ph', () => {
    beforeEach(() => {
        inMemoryWaterPhRepository = new InMemoryWaterPhRepository()
        sut = new FetchWaterPhUseCase(inMemoryWaterPhRepository)
    })

    it('should be able to fetch paginated water ph measurements in a time period', async () => {
        for (let i = 0; i < 6; i++) {
            const measurement = makeMeasurement()
            await inMemoryWaterPhRepository.create(measurement)
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
