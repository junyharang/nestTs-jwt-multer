import { CookieService } from "./cookie.service";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CookieServiceImpl implements CookieService {
  private readonly DOMAIN = this.configService.get("cookie.domain");

  constructor(private readonly configService: ConfigService) {}

  setRefreshToken(response: Response, refreshToken: string): void {
    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // 쿠키 유효 기간 설정 7일
      maxAge: 1000 * 60 * 60 * 24 * 7,
      domain: this.DOMAIN,
    });
  }

  clearRefreshToken(response: Response): void {
    // Cookie 초기화
    response.clearCookie("refreshToken");

    // Header 초기화
    response.removeHeader("Authorization");
  }
}
