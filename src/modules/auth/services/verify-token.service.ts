import { ApiError } from "@point-hub/express-error-handler";
import { UserRepository } from "../repositories/user.repository.js";
import { issuer, secretKey } from "@src/config/auth.js";
import DatabaseConnection, { IQuery } from "@src/database/connection.js";
import { verify } from "@src/utils/hash.js";
import { signNewToken, verifyToken } from "@src/utils/jwt.js";
export class VerifyTokenUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(token: string) {
    const result: any = verifyToken(token.split(" ")[1], secretKey);

    // token invalid
    if (!result) {
      throw new ApiError(401);
    }

    // token expired
    if (new Date() > result.exp) {
      throw new ApiError(401);
    }

    const userRepository = new UserRepository(this.db);
    const user = (await userRepository.read(result.id)) as any;

    return {
      username: user.username,
      email: user.email,
      fullName: user.fullName,
    };
  }
}
