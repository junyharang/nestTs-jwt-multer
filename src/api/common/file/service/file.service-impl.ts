import { FileService } from "./file.service";
import { HttpStatus, Injectable } from "@nestjs/common";
import { DefaultResponse } from "../../constant/default.response";
import configuration from "../../../../../common/config/environment/configuration";
import express from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { File } from "../entity/file.entity";
import { Repository } from "typeorm";

@Injectable()
export class FileServiceImpl implements FileService {
  constructor(@InjectRepository(File) private readonly fileRepository: Repository<File>) {}
  async uploadImage(image: Express.Multer.File): Promise<DefaultResponse<File>> {
    if (!image) {
      return DefaultResponse.response(HttpStatus.BAD_REQUEST, "업로드할 파일을 확인해 주세요.");
    }

    const originalFileName = image.filename;
    const fileName = image.filename;
    const imageUrl = `${configuration().server.url}:${configuration().server.port}/file/images/view/${image.filename}`;

    const file = await this.fileRepository.save(new File(originalFileName, fileName, imageUrl));

    return DefaultResponse.responseWithData(HttpStatus.CREATED, "파일 업로드 성공!", file);
  }

  uploadImages(
    images: Array<Express.Multer.File>,
  ): DefaultResponse<Array<{ imageContent: { originalName: string; filename: string; imageUrl: string } }>> {
    if (!images || images.length === 0) {
      return DefaultResponse.response(HttpStatus.BAD_REQUEST, "업로드할 파일을 확인해 주세요.");
    }

    const result = [];

    images.forEach((images) => {
      const imageContent = {
        originalName: images.originalname,
        fileName: images.filename,
        imageUrl: `${configuration().server.url}:${configuration().server.port}/file/images/view/${images.filename}`,
      };
      result.push(imageContent);
    });

    return DefaultResponse.responseWithData(HttpStatus.CREATED, "파일 업로드 성공!", result);
  }

  viewImage(filePath: string, response: express.Response): DefaultResponse<unknown> {
    if (!filePath) {
      return DefaultResponse.response(HttpStatus.BAD_REQUEST, "조회할 파일 이름을 확인해 주세요.");
    }

    response.sendFile(filePath, { root: "./local/storage/images" });
  }
}
