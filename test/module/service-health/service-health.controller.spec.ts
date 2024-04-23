import { Test, TestingModule } from '@nestjs/testing';
import { ServiceHealthController } from '../../../src/service-health/service-health.controller';

describe('ServiceHealthController', () => {
  let controller: ServiceHealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceHealthController],
    }).compile();

    controller = module.get<ServiceHealthController>(ServiceHealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
