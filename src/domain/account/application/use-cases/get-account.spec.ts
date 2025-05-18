import { InMemoryAccountsRepository } from 'test/repositories/in-memory-accounts-repository'
import { makeAccount } from 'test/factories/make-account'
import { GetAccountUseCase } from './get-account'

let inMemoryAccountsRepository: InMemoryAccountsRepository
let sut: GetAccountUseCase

describe('Get Account', () => {
    beforeEach(() => {
        inMemoryAccountsRepository = new InMemoryAccountsRepository()
        sut = new GetAccountUseCase(inMemoryAccountsRepository)
    })

    it('should be able to get an account', async () => {
        const account = makeAccount({
            email: 'johndoe@example.com'
        })

        inMemoryAccountsRepository.items.push(account)

        const result = await sut.execute({
            id: account.id.toString()
        })

        expect(result.isRight()).toBe(true)

        if (result.isLeft()) {
            return
        }

        expect(result.value.account).toEqual(expect.objectContaining({
            name: account.name
        }))
    })
})
