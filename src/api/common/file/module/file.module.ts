import { Module } from "@nestjs/common";
import { FileController } from "../controller/file.controller";
import { FileServiceImpl } from "../service/file.service-impl";
import { TypeOrmModule } from "@nestjs/typeorm";
import { File } from "../entity/file.entity";

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [FileController],
  providers: [
    FileServiceImpl,
    {
      provide: "FileService",
      useClass: FileServiceImpl,
    },
  ],
})
export class FileModule {}
