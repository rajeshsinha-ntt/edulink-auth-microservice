import { NestFactory } from '@nestjs/core';
import { ServiceHealthModule } from './service-health/service-health.module';


async function bootstrap() {
  const app = await NestFactory.create(ServiceHealthModule);
  console.log(process.env.PORT || 3000 );
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
