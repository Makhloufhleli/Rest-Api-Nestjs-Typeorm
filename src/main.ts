import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/AppModule';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { openApiConfig, serverConfig } from '@Config/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
class Application {
  constructor() {
    this.bootstrap();
  }
  async bootstrap() {
    const app = await NestFactory.create(AppModule);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    const options = new DocumentBuilder()
      .setTitle(openApiConfig.title)
      .setDescription(openApiConfig.description)
      .setVersion(openApiConfig.version)
      .addBearerAuth({
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      })
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
    await app.listen(serverConfig.port);
  }
}
new Application();
