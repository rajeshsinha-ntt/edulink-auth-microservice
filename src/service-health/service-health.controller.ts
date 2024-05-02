import { Controller, Get, Query } from '@nestjs/common';
import { ServiceHealthService } from './service-health.service';
import { CommonHelper } from '../helpers/common.helper';
import {  THealthResponse } from '../types/service-health-response.type';

@Controller('api/health')
export class ServiceHealthController {
    constructor(private readonly healthService: ServiceHealthService){}
    @Get()
   async getServiceHealth(
        @Query('dependency-health') dependency : boolean
    ): Promise<THealthResponse> {
        const serviceHealth = await this.healthService.getHealthInformation(dependency);
		// return service-health response
		return {
			'response-timestamp': CommonHelper.getCurrentTimestampInISOFormat(),
			'response-data': serviceHealth.jsonify(),
		} as THealthResponse;
    }
}
