import { InMemoryAccountsRepository } from 'test/repositories/in-memory-accounts-repository'
import { RegisterAccountUseCase } from './register-account'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let inMemoryAccountsRepository: InMemoryAccountsRepository
let fakeHasher: FakeHasher
let sut: RegisterAccountUseCase

describe('Register Account', () => {
    beforeEach(() => {
        inMemoryAccountsRepository = new InMemoryAccountsRepository()
        fakeHasher = new FakeHasher()

        sut = new RegisterAccountUseCase(inMemoryAccountsRepository, fakeHasher)
    })

    it('should be able to register an account', async () => {
        const result = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({
            account: inMemoryAccountsRepository.items[0]
        })  
    })

    it('should hash account password upon registration', async () => {
        const result = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        const hashedPassword = await fakeHasher.hash('123456')

        expect(result.isRight()).toBe(true)
        expect(inMemoryAccountsRepository.items[0].password).toBe(hashedPassword)
    })
})
