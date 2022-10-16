import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/AppModule';
class Application {
  constructor() {
    this.bootstrap();
  }
  async bootstrap() {
    const app = await NestFactory.create(AppModule);

    await app.listen(3000);
  }
}
new Application();
