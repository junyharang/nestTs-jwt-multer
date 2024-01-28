import { HttpException, HttpStatus } from "@nestjs/common";
import fs from "fs";
import { diskStorage } from "multer";
import { extname, join } from "path";
import process from "process";

export const mainMulterDiskOptions = {
  fileFilter: (request, file, callback) => {
    // .jpg, jpeg, png 형식의 파일만 허용
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      callback(null, true);
    } else {
      callback(
        new HttpException(
          {
            message: "지원하지 않는 파일 형식입니다.",
            error: "Unsupported Media Type",
          },
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },

  storage: diskStorage({
    destination: (request, file, callback) => {
      // const uploadPath = join(__dirname, configuration().file.image.upload.storage.path + "main");
      const uploadPath = join(process.cwd(), "local", "storage", "product", "images", "main");

      fs.mkdir(uploadPath, { recursive: true }, (error: NodeJS.ErrnoException) => {
        if (error && error.code !== "EEXIST") {
          // EEXIST는 디렉터리가 이미 존재할 때의 에러코드.
          callback(error, uploadPath);
        } else {
          callback(null, uploadPath);
        }
      });
    },

    filename: (request, file, callback) => {
      // 파일 이름 설정
      callback(null, `${Date.now()}${extname(file.originalname)}`);
    },
  }),

  limits: {
    fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
    filedSize: 1024 * 1024, // 필드 사이즈 최대값 (기본값 1MB)
    fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본값 무제한)
    fileSize: 10485760, // multipart 형식 폼의 최대 용량(bytes 단위) "10MB 설정" (기본값 무제한)
    files: 1, // multipart 형식 폼에서 파일 필드의 최대 개수 (기본값 무제한)
  },
};

export const additionalMulterDiskOptions = {
  fileFilter: (request, file, callback) => {
    // .jpg, jpeg, png 형식의 파일만 허용
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      callback(null, true);
    } else {
      callback(
        new HttpException(
          {
            message: "지원하지 않는 파일 형식입니다.",
            error: "Unsupported Media Type",
          },
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },

  storage: diskStorage({
    destination: (request, file, callback) => {
      // const uploadPath = join(__dirname, configuration().file.image.upload.storage.path + "main");
      const uploadPath = join(process.cwd(), "local", "storage", "product", "images", "additional");

      fs.mkdir(uploadPath, { recursive: true }, (error: NodeJS.ErrnoException) => {
        if (error && error.code !== "EEXIST") {
          // EEXIST는 디렉터리가 이미 존재할 때의 에러코드.
          callback(error, uploadPath);
        } else {
          callback(null, uploadPath);
        }
      });
    },

    filename: (request, file, callback) => {
      // 파일 이름 설정
      callback(null, `${Date.now()}${extname(file.originalname)}`);
    },
  }),

  limits: {
    fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
    filedSize: 1024 * 1024, // 필드 사이즈 최대값 (기본값 1MB)
    fields: 5, // 파일 형식이 아닌 필드의 최대 개수 (기본값 무제한)
    fileSize: 10485760, // multipart 형식 폼의 최대 용량(bytes 단위) "10MB 설정" (기본값 무제한)
    files: 5, // multipart 형식 폼에서 파일 필드의 최대 개수 (기본값 무제한)
  },
};

export const detailMulterDiskOptions = {
  fileFilter: (request, file, callback) => {
    // .jpg, jpeg, png 형식의 파일만 허용
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      callback(null, true);
    } else {
      callback(
        new HttpException(
          {
            message: "지원하지 않는 파일 형식입니다.",
            error: "Unsupported Media Type",
          },
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },

  storage: diskStorage({
    destination: (request, file, callback) => {
      // const uploadPath = join(__dirname, configuration().file.image.upload.storage.path + "main");
      const uploadPath = join(process.cwd(), "local", "storage", "product", "images", "detail");

      fs.mkdir(uploadPath, { recursive: true }, (error: NodeJS.ErrnoException) => {
        if (error && error.code !== "EEXIST") {
          // EEXIST는 디렉터리가 이미 존재할 때의 에러코드.
          callback(error, uploadPath);
        } else {
          callback(null, uploadPath);
        }
      });
    },

    filename: (request, file, callback) => {
      // 파일 이름 설정
      callback(null, `${Date.now()}${extname(file.originalname)}`);
    },
  }),

  limits: {
    fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
    filedSize: 1024 * 1024, // 필드 사이즈 최대값 (기본값 1MB)
    fields: 5, // 파일 형식이 아닌 필드의 최대 개수 (기본값 무제한)
    fileSize: 10485760, // multipart 형식 폼의 최대 용량(bytes 단위) "10MB 설정" (기본값 무제한)
    files: 10, // multipart 형식 폼에서 파일 필드의 최대 개수 (기본값 무제한)
  },
};
