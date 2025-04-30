import { Injectable } from '@nestjs/common'

@Injectable()
export class GetAmbientHumidityUseCase {
    execute(): string {
        return 'Ambient Humidity Got!'
    }
}
