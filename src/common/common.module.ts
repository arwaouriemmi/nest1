import { Global, Module } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
export const PROVIDER_TOKEN = {
    UUID: 'UUID'
}


@Global()
@Module({
    providers: [
        {
            provide: PROVIDER_TOKEN.UUID,
            useValue: uuid
        }
    ],
    exports: [PROVIDER_TOKEN.UUID]
})
export class CommonModule {}


