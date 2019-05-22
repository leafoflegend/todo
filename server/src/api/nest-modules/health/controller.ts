import { Controller, Get } from '@nestjs/common';
import { Logger } from '../../../utils';
import HealthService from './service';

interface HealthResponse {
  keys: ['message', 'services'];
  message: string;
  services: {
    database: boolean;
    server: boolean;
    redis: boolean;
  };
}

const l = new Logger('health controller');

@Controller('health')
class HealthController {
  private readonly healthService: HealthService;

  public constructor(healthService: HealthService) {
    this.healthService = healthService;
  }

  @Get()
  private async findAll(): Promise<HealthResponse> {
    try {
      const dbAlive = await this.healthService.checkDbHealth();
      const redisAlive = await this.healthService.checkRedisHealth();

      return {
        keys: ['message', 'services'],
        message: 'I Am Alive.',
        services: {
          server: true,
          database: dbAlive,
          redis: redisAlive,
        },
      };
    } catch (e) {
      l.err('Error checking health of services.', e);

      throw e;
    }
  }
}

export default HealthController;
