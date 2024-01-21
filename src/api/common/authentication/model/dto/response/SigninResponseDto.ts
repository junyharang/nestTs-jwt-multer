export class SigninResponseDto {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpireDate: Date;

  constructor(accessToken: string, refreshToken: string, refreshTokenExpireDate: Date) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.refreshTokenExpireDate = refreshTokenExpireDate;
  }
}
