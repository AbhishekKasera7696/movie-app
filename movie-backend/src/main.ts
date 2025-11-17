import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 const allowedOrigins = [
  'https://movie-app-alpha-flax.vercel.app',
  'http://localhost:3001',
];

  app.enableCors({
    origin: (origin:any, callback:any) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('CORS: Not allowed by CORS'));
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000,'0.0.0.0');
}
bootstrap();
