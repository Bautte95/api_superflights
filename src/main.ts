import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExcepionFilter } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TimeOutInterceptor());
  app.useGlobalFilters(new AllExcepionFilter());
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Super flight API')
    .setDescription('Scheduled Fligths App')
    .setVersion('1.0.0')
    .build();
  const document = () => SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: {
      filter: true,
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
