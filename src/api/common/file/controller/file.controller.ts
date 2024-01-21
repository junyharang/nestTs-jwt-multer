import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Bind, Controller, Get, Inject, Param, Post, Query, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { DefaultResponse } from "../../constant/default.response";
import { FileService } from "../service/file.service";
import { Response } from "express";
import { mainMulterDiskOptions } from "../config/multer.options";

@ApiTags("파일 처리 서비스")
@Controller("file")
export class FileController {
  constructor(@Inject("FileService") private readonly fileService: FileService) {}

  @ApiOperation({
    summary: "단일 이미지 업로드 기능",
  })
  @ApiOkResponse({
    description: "파일 업로드 성공!",
    type: Promise<DefaultResponse<{ imageId: number; imageUrl: string }>>,
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
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFile() image: Express.Multer.File): Promise<DefaultResponse<{ imageId: number; imageUrl: string }>> {
    return this.fileService.uploadImage(image);
  }

  @ApiOperation({
    summary: "다중 이미지 업로드 기능",
  })
  @ApiOkResponse({
    description: "파일 업로드 성공!",
    type: Promise<DefaultResponse<Array<{ imageContent: { imageId: number; imageUrl: string } }>>>,
  })
  @Post("/uploads/images")
  @UseInterceptors(FilesInterceptor("images", null, mainMulterDiskOptions))
  @Bind(UploadedFiles())
  uploadImages(
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<DefaultResponse<Array<{ imageContent: { imageId: number; imageUrl: string } }>>> {
    return this.fileService.uploadImages(images);
  }

  @ApiOperation({
    summary: "단일 이미지 출력 기능",
  })
  @ApiOkResponse({
    description: "성공!",
    type: DefaultResponse<{ imageUrl: string }>,
  })
  @Get("/image/view/:name")
  viewImage(@Param("name") name: string, @Res() response: Response): DefaultResponse<void> {
    return this.fileService.viewImage(name, response);
  }

  @ApiOperation({
    summary: "단일 이미지 정보 받기",
  })
  @ApiOkResponse({
    description: "성공!",
    type: DefaultResponse<{ imageUrl: string }>,
  })
  @Get("/image/:imageId")
  getImageUrl(@Param("imageId") imageId: number): Promise<DefaultResponse<string>> {
    return this.fileService.getImageUrl(imageId);
  }

  @ApiOperation({
    summary: "다중 이미지 정보 받기",
  })
  @ApiOkResponse({
    description: "성공!",
    type: DefaultResponse<{ imageUrl: string }>,
  })
  @Get("/images/")
  async getImagesUrl(@Query("imageIds") imageIds: number[]): Promise<DefaultResponse<{ imageUrl: string }[]>> {
    return this.fileService.getImagesUrl(imageIds);
  }
}
