import * as bcrypt from "bcrypt";
import configuration from "../../../common/config/environment/configuration";

export class EncryptUtil {
  private constructor() {}

  public static async hashingEncrypt(password: string) {
    return await bcrypt.hash(password, parseInt(configuration().bcrypt.salt));
  }
}
