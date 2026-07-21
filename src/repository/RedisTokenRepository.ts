import { ITokenRepository } from "../interfaces/auth_repository_interface";

class RedisTokenRepository implements ITokenRepository {
    private redisClient: any;

    constructor(redisClient: any) {
        this.redisClient = redisClient;
    }

    private formatKey(token: string): string {
        return 'token: '.concat(token);
    }

    public async saveRefreshToken(token: string, userId: string, ttlSeconds: number): Promise<void> {
        await this.redisClient.set(this.formatKey(token), userId, {EX: ttlSeconds});
    }

    public async findUserIdByToken(token: string): Promise<string | null> {
        return await this.redisClient.get(this.formatKey(token));
    }

    public async deleteRefreshToken(token: string): Promise<void> {
        await this.redisClient.del(this.formatKey(token));
    }
}

export default RedisTokenRepository;
