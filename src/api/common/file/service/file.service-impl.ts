import { FileService } from "./file.service";
import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { DefaultResponse } from "../../constant/default.response";
import configuration from "../../../../../common/config/environment/configuration";
import express from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { File } from "../model/entity/file.entity";
import { Repository } from "typeorm";
import * as console from "console";

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
      console.log(`Image File 정보: `);
      console.log(images);
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

  viewImage(filePath: string, response: express.Response): DefaultResponse<void> {
    if (!filePath) {
      return DefaultResponse.response(HttpStatus.BAD_REQUEST, "조회할 파일 이름을 확인해 주세요.");
    }

    DefaultResponse.responseWithData(HttpStatus.OK, "파일 조회 성공!", response.sendFile(filePath, { root: "./local/storage/images" }));
  }

  async getImageUrl(imageId: number): Promise<DefaultResponse<string>> {
    if (imageId <= 0 || !imageId) {
      return DefaultResponse.response(HttpStatus.BAD_REQUEST, "조회할 파일 정보를 확인해 주세요.");
    }

    const id = imageId;

    const image = await this.fileRepository.findOne({ where: { id } });

    if (!image) {
      throw new NotFoundException({ statusCode: 404, message: "요청에 대한 내용을 찾지 못했어요." });
    }

    return DefaultResponse.responseWithData(HttpStatus.OK, "성공!", image.imageUrl);
  }

  async getImagesUrl(imageId: number[]): Promise<DefaultResponse<{ imageUrl: string }[]>> {
    if (!imageId || imageId.length === 0) {
      return DefaultResponse.response(HttpStatus.BAD_REQUEST, "조회할 파일 정보를 확인해 주세요.");
    }

    const images: { imageUrl: string }[] = [];

    for (const id of imageId) {
      const image = await this.fileRepository.findOne({ where: { id } });
      if (image) {
        images.push({ imageUrl: image.imageUrl });
      } else {
        images.push({ imageUrl: "이미지를 찾을 수 없어요." });
      }
    }
    return DefaultResponse.responseWithData(HttpStatus.OK, "조회 성공!", images);
  }
}
