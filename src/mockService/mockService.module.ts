import { Module } from '@nestjs/common';
import { MockServiceController } from './mockService.controller';
import { MockServiceService } from './mockService.service';

@Module({
    controllers: [MockServiceController],
    providers: [MockServiceService],
    exports: [MockServiceService],
})
export class MockServiceModule {}
