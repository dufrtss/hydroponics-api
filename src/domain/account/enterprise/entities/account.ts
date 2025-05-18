import { Entity } from '../../../../core/entities/entity.js'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.js'
import { Optional } from '../../../../core/types/optional'

export interface AccountProps {
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt?: Date
}

export class Account extends Entity<AccountProps> {
    get name() {
        return this.props.name
    }

    set name(name: string) {
        this.props.name = name
        this.touch()
    }

    get email() {
        return this.props.email
    }

    get password() {
        return this.props.password
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    static create(props: Optional<AccountProps, 'createdAt'>, id?: UniqueEntityID) {
        const account = new Account({
            ...props,
            createdAt: props.createdAt ?? new Date()
        }, id)

        return account
    }
}
