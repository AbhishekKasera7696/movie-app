import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ CORS setup
  app.enableCors({
    origin: [
      'http://localhost:3001', 
      'https://movie-app-alpha-flax.vercel.app' 
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3000, '0.0.0.0'); 
}
bootstrap();
