import { Controller, Get } from '@nestjs/common'
import { HealthCheckService } from '@nestjs/terminus'

@Controller('healthz')
export class HealthzController {
  constructor(private health: HealthCheckService) {}

  @Get()
  check() {
    return this.health.check([])
  }
}
