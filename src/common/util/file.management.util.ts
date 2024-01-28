import type { ISizeCalculationResult } from "image-size/dist/types/interface";
import sizeOf from "image-size";
import { InternalServerErrorException } from "@nestjs/common";
import { resolve } from "path";
import fs from "fs";
import Jimp from "jimp";

export class FileManagementUtil {
  public static deleteProductOriginalImages(originalImageDirectoryPath: string, imageName: string): void {
    const originalImageDeleteTargetPath: string = resolve(originalImageDirectoryPath, imageName);

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
    let result: boolean = false;
    try {
      const resizeImage: Jimp = await Jimp.read(image[0].path);
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
      const resizeImage: Jimp = await Jimp.read(image.path);

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
