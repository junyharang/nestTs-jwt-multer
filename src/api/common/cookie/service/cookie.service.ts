import { Response } from "express";

export interface CookieService {
  setRefreshToken(response: Response, refreshToken: string): void;
  clearRefreshToken(response: Response): void;
}
