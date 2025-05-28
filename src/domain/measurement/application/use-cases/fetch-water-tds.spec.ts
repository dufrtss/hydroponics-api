import { makeMeasurement } from 'test/factories/make-measurement'
import { FetchWaterTDSUseCase } from './fetch-water-tds'
import { InMemoryWaterTDSRepository } from 'test/repositories/in-memory-water-tds-repository'

let inMemoryWaterTDSRepository: InMemoryWaterTDSRepository
let sut: FetchWaterTDSUseCase

describe('Fetch Water TDS', () => {
    beforeEach(() => {
        inMemoryWaterTDSRepository = new InMemoryWaterTDSRepository()
        sut = new FetchWaterTDSUseCase(inMemoryWaterTDSRepository)
    })

    it('should be able to fetch paginated water tds measurements in a time period', async () => {
        for (let i = 0; i < 6; i++) {
            const measurement = makeMeasurement()
            await inMemoryWaterTDSRepository.create(measurement)
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
