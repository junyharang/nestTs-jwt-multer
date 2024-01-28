import sizeOf from "image-size";
import type { ISizeCalculationResult } from "image-size/dist/types/interface";
import { InternalServerErrorException } from "@nestjs/common";
import fs from "fs";
import { resolve } from "path";
import Jimp from "jimp";

export class FileVerifyUtil {
  public static singleImageSizeVerify(maxWidthPx: number, maxHeightPx: number, imageFile: Express.Multer.File): boolean {
    try {
      console.log("imageFile:", imageFile);
      console.log("imageFile.path:", imageFile[0].path);
      const dimensions: ISizeCalculationResult = sizeOf(imageFile[0].path);
      console.log("Dimensions:", dimensions);

      return !(dimensions.width > maxWidthPx || dimensions.height > maxHeightPx);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: "이미지 업로드 및 크기 확인 실패했어요. 관리자에게 문의해 주세요.",
        detail: error.message,
      });
    }
  }

  public static manyImageSizeVerify(maxWidthPx: number, maxHeightPx: number, imageFile: Express.Multer.File): boolean {
    try {
      console.log("imageFile:", imageFile);
      console.log("imageFile.path:", imageFile.path);
      const dimensions: ISizeCalculationResult = sizeOf(imageFile.path);
      console.log("Dimensions:", dimensions);

      return !(dimensions.width > maxWidthPx || dimensions.height > maxHeightPx);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: "이미지 업로드 및 크기 확인 실패했어요. 관리자에게 문의해 주세요.",
        detail: error.message,
      });
    }
  }

  public static deleteProductOriginalImages(originalImageDirectoryPath: string, imageName: string): void {
    const originalImageDeleteTargetPath = resolve(originalImageDirectoryPath, imageName);

    console.log("originalImageDirectoryPath:", originalImageDirectoryPath);

    if (fs.existsSync(originalImageDirectoryPath)) {
      fs.unlink(originalImageDeleteTargetPath, (error: NodeJS.ErrnoException): void => {
        if (error) {
          throw new InternalServerErrorException({
            statusCode: 500,
            message: "파일 삭제에 실패하였어요. 관리자에게 문의해 주세요.",
            detail: error.message,
          });
        } else {
          resolve();
        }
      });
    } else {
      // 파일이 이미 삭제 되었거나, 존재하지 않으면 계속 진행
      resolve();

      throw new InternalServerErrorException({ statusCode: 500, message: "삭제 대상 파일이 존재하지 않아요. 관리자에게 문의해 주세요." });
    }
  }

  public static async singleImageResizing(image: Express.Multer.File, maxWidthPx: number, maxHeightPx: number): Promise<boolean> {
    let result = false;
    try {
      const resizeImage = await Jimp.read(image[0].path);
      resizeImage.resize(maxWidthPx, maxHeightPx).write(image[0].path);
      const dimensions: ISizeCalculationResult = sizeOf(image[0].path);
      console.log("Resizing 하기 전 image 정보:", resizeImage, "Dimensions: ", dimensions);
      dimensions.width = maxWidthPx;
      dimensions.height = maxHeightPx;
      console.log("Resizing 한 뒤 image 정보:", resizeImage, "Dimensions: ", dimensions);
      result = true;
      return result;
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: "이미지 Resizing 실패했어요. 관리자에게 문의해 주세요.",
        detail: error.message,
      });
    }
  }

  static async manyImagesResizing(image: Express.Multer.File, maxWidthPx: number, maxHeightPx: number) {
    let result = false;

    console.log("manyImagesResizing() - image:", image);

    try {
      const resizeImage = await Jimp.read(image.path);

      console.log("manyImagesResizing() - resizeImage:", resizeImage);

      resizeImage.resize(maxWidthPx, maxHeightPx).write(image.path);
      const dimensions: ISizeCalculationResult = sizeOf(image.path);
      console.log("Resizing 하기 전 image 정보:", resizeImage, "Dimensions: ", dimensions);
      dimensions.width = maxWidthPx;
      dimensions.height = maxHeightPx;
      console.log("Resizing 한 뒤 image 정보:", resizeImage, "Dimensions: ", dimensions);
      result = true;
      return result;
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: "이미지 Resizing 실패했어요. 관리자에게 문의해 주세요.",
        detail: error.message,
      });
    }
  }
}
