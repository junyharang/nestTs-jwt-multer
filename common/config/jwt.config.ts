export interface JwtConfig {
  accessTokenSecret: string;
  accessTokenExpireIn: string;
  refreshTokenSecret: string;
  refreshTokenExpireIn: string;
  saltOrRounds: number;
}
