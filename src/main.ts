import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // SET LOGGER
  const logger: WinstonLogger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  // SET SWAGGER
  const swaggerConfig = new DocumentBuilder()
    .setTitle('wktpro')
    .setDescription('the wktpro ')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'wktpro Docs',
  };
  SwaggerModule.setup('swagger', app, document, customOptions);

  // ANOTHER
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const configService = app.get(ConfigService);
  const appPort = configService.get<number>('app.port') as number;

  await app.listen(appPort, () => {
    console.log('Nest application successfully started on port: ' + appPort);
  });
}
bootstrap();
