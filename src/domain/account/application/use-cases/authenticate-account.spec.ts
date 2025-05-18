import { InMemoryAccountsRepository } from 'test/repositories/in-memory-accounts-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { AuthenticateAccountUseCase } from './authenticate-account'
import { makeAccount } from 'test/factories/make-account'

let inMemoryAccountsRepository: InMemoryAccountsRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateAccountUseCase

describe('Authenticate Account', () => {
    beforeEach(() => {
        inMemoryAccountsRepository = new InMemoryAccountsRepository()
        fakeHasher = new FakeHasher()
        fakeEncrypter = new FakeEncrypter()

        sut = new AuthenticateAccountUseCase(inMemoryAccountsRepository, fakeHasher, fakeEncrypter)
    })

    it('should be able to authenticate an account', async () => {
        const account = makeAccount({
            email: 'johndoe@example.com',
            password: await fakeHasher.hash('123456')
        })

        inMemoryAccountsRepository.items.push(account)

        const result = await sut.execute({
            email: 'johndoe@example.com',
            password: '123456'
        })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({
            accessToken: expect.any(String)
        })
    })
})
