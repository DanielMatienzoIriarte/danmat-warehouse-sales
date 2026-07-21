export interface ITokenRepository {
  saveRefreshToken(token: string, userId: string, ttlSeconds: number): Promise<void>;
  findUserIdByToken(token: string): Promise<string | null>;
  deleteRefreshToken(token: string): Promise<void>;
}