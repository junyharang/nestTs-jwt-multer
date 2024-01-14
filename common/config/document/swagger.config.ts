import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import configuration from "../environment/configuration";

export function swaggerConfig(app: INestApplication): void {
  const serverEnvironment = configuration().server.environment;
  const options = new DocumentBuilder()
    .setTitle("Hello, Juny!!")
    .setDescription("<h1> 주니의 Nest.ts 실습!</h1> \n <h3> WAS 구동 환경: " + serverEnvironment)
    .setVersion("1.0.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("swagger-ui/index.html", app, document);
}
