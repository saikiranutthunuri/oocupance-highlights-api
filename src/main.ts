import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  // Add Swagger documentation
  setupSwagger(app);

  await app.listen(3001);
}
bootstrap();
