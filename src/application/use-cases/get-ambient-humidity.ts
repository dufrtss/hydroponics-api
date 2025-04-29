import { Injectable } from '@nestjs/common'

@Injectable()
export class GetAmbientHumidity {
    execute(): string {
        return 'Ambient Humidity Got!'
    }
}
