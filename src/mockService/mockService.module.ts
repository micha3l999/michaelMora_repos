import { Module } from '@nestjs/common';
import { MockServiceController } from './mockService.controller';
import { MockServiceService } from './mockService.service';

@Module({
    controllers: [MockServiceController],
    providers: [MockServiceService],
})
export class MockServiceModule {}
