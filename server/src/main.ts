import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as compression from 'compression';
import rateLimit from 'express-rate-limit';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //get the port from the ENV
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<any>('FRONTEND_URL'), //allow only frontend origin
    credentials: true, // if you're sending cookies (optional) but i didnt add you can
  });

  // use decument builder
  const config = new DocumentBuilder()
    .setTitle('Arday-bile')
    .setDescription('API DOCS')
    .setVersion('0.1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // helmet for security
  app.use(helmet());

  // compression for speed apis
  app.use(compression());

  // rate limiting for
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  //thats it done!!!
  // start your app

  // and use it
  const PORT = configService.get<number>('PORT')!;
  await app.listen(PORT);
}
bootstrap();
