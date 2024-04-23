import { Test, TestingModule } from '@nestjs/testing';
import { ServiceHealthService } from '../../../src/service-health/service-health.service';

describe('ServiceHealthService', () => {
  let service: ServiceHealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceHealthService],
    }).compile();

    service = module.get<ServiceHealthService>(ServiceHealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
