import { Injectable } from '@nestjs/common'

@Injectable()
export class GetAmbientTemperature {
    execute(): string {
        return 'Ambient Temperature Got!'
    }
}
