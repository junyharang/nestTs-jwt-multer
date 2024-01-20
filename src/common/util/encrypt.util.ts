import * as bcrypt from "bcrypt";
import configuration from "../../../common/config/environment/configuration";

export class EncryptUtil {
  public static async hashingEncrypt(division: string, plainText: string): Promise<string> {
    if (division === "token") {
      return await bcrypt.hash(plainText, parseInt(configuration().jwt.salt));
    } else if (division === "password") {
      return await bcrypt.hash(plainText, parseInt(configuration().bcrypt.salt));
    } else {
      throw new Error("해싱 암호화 작업에 실패했어요. 암호 대상의 구분값을 확인해 주세요.");
    }
  }
}
