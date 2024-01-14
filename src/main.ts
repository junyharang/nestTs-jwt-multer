import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import configuration from "../common/config/environment/configuration";
import { swaggerConfig } from "../common/config/document/swagger.config";
import { ValidationPipe } from "@nestjs/common";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = configuration();
  const environment = serverConfig.server.environment;
  const port = serverConfig.server.port;
  const dbType = serverConfig.db.type;
  const dbSyncStatus = serverConfig.db.synchronize;
  swaggerConfig(app);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  console.log(
    `주니의 Nest.js를 이용한 JWT와 Multi Part 실습 서버 구동! \n 구동 환경 ${environment} \n Server Port Num: ${port} \n 연결 DB Type: ${dbType} \n 연결 DB: ${serverConfig.db.database} \n 연결 동기화 여부: ${dbSyncStatus}`,
  );
}
bootstrap();
