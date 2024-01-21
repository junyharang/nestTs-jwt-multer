import { FileService } from "./file.service";
import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { DefaultResponse } from "../../constant/default.response";
import configuration from "../../../../../common/config/environment/configuration";
import express from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { File } from "../model/entity/file.entity";
import { Repository } from "typeorm";

@Injectable()
export class FileServiceImpl implements FileService {
  constructor(@InjectRepository(File) private readonly fileRepository: Repository<File>) {}

  async uploadImage(image: Express.Multer.File): Promise<DefaultResponse<{ imageId: number; imageUrl: string }>> {
    if (!image) {
      return DefaultResponse.response(HttpStatus.BAD_REQUEST, "업로드할 파일을 확인해 주세요.");
    }

    const file = await this.fileRepository.save(
      new File(
        image.fieldname,
        image.originalname,
        image.encoding,
        image.mimetype,
        image.destination,
        image.filename,
        image.path,
        image.size,
        `${configuration().server.url}:${configuration().server.port}/file/images/view/${image.filename}`,
      ),
    );

    const imageContent = {
      imageId: file.id,
      imageUrl: file.url,
    };

    return DefaultResponse.responseWithData(HttpStatus.CREATED, "파일 업로드 성공!", imageContent);
  }

  async uploadImages(images: Array<Express.Multer.File>): Promise<DefaultResponse<Array<{ imageContent: { imageId: number; imageUrl: string } }>>> {
    if (!images || images.length === 0) {
      return DefaultResponse.response(HttpStatus.BAD_REQUEST, "업로드할 파일을 확인해 주세요.");
    }

    const result = [];

    for (const image of images) {
      const saveFile = await this.fileRepository.save(
        new File(
          image.fieldname,
          image.originalname,
          image.encoding,
          image.mimetype,
          image.destination,
          image.filename,
          image.path,
          image.size,
          `${configuration().server.url}:${configuration().server.port}/file/images/view/${image.filename}`,
        ),
      );

      if (!saveFile) {
        DefaultResponse.response(HttpStatus.BAD_REQUEST, "파일 업로드에 실패했어요.");
      }

      const imageContent = {
        imageId: saveFile.id,
        imageUrl: saveFile.url,
      };
      result.push(imageContent);
    }

    return DefaultResponse.responseWithData(HttpStatus.CREATED, "파일 업로드 성공!", result);
  }

  viewImage(name: string, response: express.Response): DefaultResponse<void> {
    if (!name) {
      return DefaultResponse.response(HttpStatus.BAD_REQUEST, "조회할 파일 이름을 확인해 주세요.");
    }

    DefaultResponse.responseWithData(HttpStatus.OK, "파일 조회 성공!", response.sendFile(name, { root: "./local/storage/images" }));
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

    return DefaultResponse.responseWithData(HttpStatus.OK, "성공!", image.url);
  }

  async getImagesUrl(imageIds: number[]): Promise<DefaultResponse<{ imageUrl: string }[]>> {
    if (!imageIds || imageIds.length === 0) {
      return DefaultResponse.response(HttpStatus.BAD_REQUEST, "조회할 파일 정보를 확인해 주세요.");
    }

    const images: { imageUrl: string }[] = [];

    for (const id of imageIds) {
      const image = await this.fileRepository.findOne({ where: { id } });
      if (image) {
        images.push({ imageUrl: image.url });
      }
    }
    return DefaultResponse.responseWithData(HttpStatus.OK, "조회 성공!", images);
  }
}
