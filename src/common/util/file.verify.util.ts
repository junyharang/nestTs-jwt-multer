import sizeOf from "image-size";
import type { ISizeCalculationResult } from "image-size/dist/types/interface";
import { InternalServerErrorException } from "@nestjs/common";

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
}
