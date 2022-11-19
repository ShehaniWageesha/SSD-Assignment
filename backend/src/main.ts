import * as express from 'express';
import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';

import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server), { cors : true });
   //const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors : true });
  await app.init();
  app.enableCors();

  const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, '../cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../cert', 'cert.pem')),
  },server)

  //HTTP 
  //await app.listen(process.env.PORT || 3000); 

  //HTTPS
  sslServer.listen(process.env.PORT || 3000, () => console.log("Secure Server on port 3000"));
}
bootstrap();
