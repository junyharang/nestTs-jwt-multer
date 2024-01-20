import { DefaultResponse } from "../../constant/default.response";
import express from "express";
import { File } from "../model/entity/file.entity";

export interface FileService {
  uploadImage(image: Express.Multer.File): Promise<DefaultResponse<File>>;

  uploadImages(
    images: Array<Express.Multer.File>,
  ): Promise<DefaultResponse<Array<{ imageContent: { imageId: number; filename: string; imageUrl: string } }>>>;

  viewImage(filePath: string, response: express.Response): DefaultResponse<void>;

  getImageUrl(imageId: number): Promise<DefaultResponse<string>>;

  getImagesUrl(imageId: number[]): Promise<DefaultResponse<{ imageUrl: string }[]>>;
}
