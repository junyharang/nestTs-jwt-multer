import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Inject, Param, Post, Query, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { DefaultResponse } from "../../constant/default.response";
import { FileService } from "../service/file.service";
import { Response } from "express";
import { File } from "../model/entity/file.entity";
import { JwtAuthenticationGuard } from "../../../authentication/guard/jwt.authentication.guard";

@ApiTags("파일 처리 서비스")
@Controller("file")
export class FileController {
  constructor(@Inject("FileService") private readonly fileService: FileService) {}

  @ApiOperation({
    summary: "단일 이미지 업로드 기능",
  })
  @ApiOkResponse({
    description: "파일 업로드 성공!",
    type: DefaultResponse<{ imageUrl: string }>,
  })
  @Post("/uploads/image")
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./local/storage/images",
        filename(_, file, callback): void {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
          return callback(null, `${Date.now()}${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFile() image: Express.Multer.File): Promise<DefaultResponse<File>> {
    return this.fileService.uploadImage(image);
  }

  @ApiOperation({
    summary: "다중 이미지 업로드 기능",
  })
  @ApiOkResponse({
    description: "파일 업로드 성공!",
    type: DefaultResponse<Array<{ imageContent: { originalName: string; filename: string; imageUrl: string } }>>,
  })
  @Post("/uploads/images")
  @UseInterceptors(
    FilesInterceptor("images", 10, {
      storage: diskStorage({
        destination: "./local/storage/images",
        filename(_, file, callback): void {
          const currentDateTime = new Date();
          const formattedDateTime = `[${currentDateTime.getFullYear()}-${(currentDateTime.getMonth() + 1).toString().padStart(2, "0")}-${currentDateTime.getDate().toString().padStart(2, "0")} ${currentDateTime.getHours().toString().padStart(2, "0")}:${currentDateTime.getMinutes().toString().padStart(2, "0")}]`;

          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
          return callback(null, `${formattedDateTime}${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadImages(
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): DefaultResponse<Array<{ imageContent: { originalName: string; filename: string; imageUrl: string } }>> {
    return this.fileService.uploadImages(images);
  }

  @ApiOperation({
    summary: "단일 이미지 출력 기능",
  })
  @ApiOkResponse({
    description: "성공!",
    type: DefaultResponse<{ imageUrl: string }>,
  })
  @Get("/image/view/:filePath")
  viewImage(@Param("filePath") filePath: string, @Res() response: Response): DefaultResponse<void> {
    return this.fileService.viewImage(filePath, response);
  }

  @ApiOperation({
    summary: "단일 이미지 불러 기능",
  })
  @ApiOkResponse({
    description: "성공!",
    type: DefaultResponse<{ imageUrl: string }>,
  })
  @Get("/image/:imageId")
  @UseGuards(JwtAuthenticationGuard)
  getImageUrl(@Param("imageId") imageId: number): Promise<DefaultResponse<string>> {
    return this.fileService.getImageUrl(imageId);
  }

  @ApiOperation({
    summary: "다중 이미지 불러오기 기능",
  })
  @ApiOkResponse({
    description: "성공!",
    type: DefaultResponse<{ imageUrl: string }>,
  })
  @Get("/images/")
  @UseGuards(JwtAuthenticationGuard)
  async getImagesUrl(@Query("imageId") imageId: number[]): Promise<DefaultResponse<{ imageUrl: string }[]>> {
    return this.fileService.getImagesUrl(imageId);
  }
}
