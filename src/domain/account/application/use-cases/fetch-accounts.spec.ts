import { InMemoryAccountsRepository } from 'test/repositories/in-memory-accounts-repository'
import { FetchAccountsUseCase } from './fetch-accounts'
import { makeAccount } from 'test/factories/make-account'

let inMemoryAccountsRepository: InMemoryAccountsRepository
let sut: FetchAccountsUseCase

describe('Fetch Accounts', () => {
    beforeEach(() => {
        inMemoryAccountsRepository = new InMemoryAccountsRepository()
        sut = new FetchAccountsUseCase(inMemoryAccountsRepository)
    })

    it('should be able to fetch paginated accounts', async () => {
        for (let i = 0; i < 22; i++) {
            const account = makeAccount()
            await inMemoryAccountsRepository.create(account)
        }

        const page = 1

        const result = await sut.execute({ page })

        expect(result.isRight()).toBe(true)

        if (result.isLeft()) {
            return
        }

        const { accounts } = result.value

        expect(accounts).toHaveLength(20)
    })
})
