import { makeMeasurement } from 'test/factories/make-measurement'
import { FetchWaterEC25CUseCase } from './fetch-water-ec25c'
import { InMemoryWaterECRepository } from 'test/repositories/in-memory-water-ec-repository'

let inMemoryWaterECRepository: InMemoryWaterECRepository
let sut: FetchWaterEC25CUseCase

describe('Fetch Water EC (25°C)', () => {
    beforeEach(() => {
        inMemoryWaterECRepository = new InMemoryWaterECRepository()
        sut = new FetchWaterEC25CUseCase(inMemoryWaterECRepository)
    })

    it('should be able to fetch paginated water EC (25°C) measurements in a time period', async () => {
        for (let i = 0; i < 6; i++) {
            const measurement = makeMeasurement({
                measurementType: 'EC25C'
            })
            console.log(measurement)
            await inMemoryWaterECRepository.create(measurement)
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
