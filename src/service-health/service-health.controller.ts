import { Controller, Get, Query } from '@nestjs/common';
import { ServiceHealthService } from './service-health.service';
import { CommonHelper } from '../helpers/common.helper';
import { HealthResponse } from '../types/service-health-response.type';

@Controller('api/service-health')
export class ServiceHealthController {
    constructor(private readonly healthService: ServiceHealthService){}
    @Get()
    getServiceHealth(
        @Query('dependency-health') dependency : boolean
    ): HealthResponse {
        const serviceHealth = this.healthService.getHealthInformation(dependency);
		// return service-health response
		return {
			'response-timestamp': CommonHelper.getCurrentTimestampInISOFormat(),
			'response-data': serviceHealth.jsonify(),
		} as HealthResponse;
    }
}
