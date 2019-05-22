import { Controller, Get } from '@nestjs/common';
import HealthService from './service';

interface HealthResponse {
  keys: ['message', 'services'];
  message: string;
  services: {
    database: boolean;
    server: boolean;
  };
}

@Controller('health')
class HealthController {
  private readonly healthService: HealthService;

  public constructor(healthService: HealthService) {
    this.healthService = healthService;
  }

  @Get()
  private async findAll(): Promise<HealthResponse> {
    const dbAlive = await this.healthService.checkDbHealth();

    return {
      keys: ['message', 'services'],
      message: 'I Am Alive.',
      services: {
        server: true,
        database: dbAlive,
      },
    };
  }
}

export default HealthController;
