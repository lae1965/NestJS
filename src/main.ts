import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as expressHbs from 'express-handlebars';
import { join } from 'path';
import * as hbs from 'hbs';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(process.cwd(), 'public'), { fallthrough: true });
  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.engine(
    'hbs',
    expressHbs.engine({
      layoutsDir: join(process.cwd(), 'views/layouts'),
      defaultLayout: 'layout',
      extname: 'hbs',
    }),
  );
  hbs.registerPartials(__dirname + 'views/partials');
  app.setViewEngine('hbs');

  await app.listen(PORT, () => {
    console.log(`Server has been started on PORT ${PORT}...`);
  });
}
bootstrap();
