import { DefaultResponse } from "../../constant/default.response";
import express from "express";

export interface FileService {
  uploadImage(image: Express.Multer.File): Promise<DefaultResponse<{ imageId: number; imageUrl: string }>>;

  uploadImages(images: Array<Express.Multer.File>): Promise<DefaultResponse<Array<{ imageContent: { imageId: number; imageUrl: string } }>>>;

  viewImage(name: string, response: express.Response): DefaultResponse<void>;

  getImageUrl(imageId: number): Promise<DefaultResponse<string>>;

  getImagesUrl(imageIds: number[]): Promise<DefaultResponse<{ imageUrl: string }[]>>;
}
