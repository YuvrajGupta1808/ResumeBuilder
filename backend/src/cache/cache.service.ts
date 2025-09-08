import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class CacheService {
    private readonly logger = new Logger(CacheService.name);
    private client: RedisClientType;

    constructor(private configService: ConfigService) {
        this.client = createClient({
            url: this.configService.get('REDIS_URL'),
        });

        this.client.on('error', (err) => {
            this.logger.error('Redis Client Error:', err);
        });

        this.client.connect();
    }

    async get(key: string): Promise<string | null> {
        try {
            return await this.client.get(key);
        } catch (error) {
            this.logger.error('Error getting cache:', error);
            return null;
        }
    }

    async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
        try {
            if (ttlSeconds) {
                await this.client.setEx(key, ttlSeconds, value);
            } else {
                await this.client.set(key, value);
            }
        } catch (error) {
            this.logger.error('Error setting cache:', error);
        }
    }

    async del(key: string): Promise<void> {
        try {
            await this.client.del(key);
        } catch (error) {
            this.logger.error('Error deleting cache:', error);
        }
    }

    async flush(): Promise<void> {
        try {
            await this.client.flushAll();
        } catch (error) {
            this.logger.error('Error flushing cache:', error);
        }
    }
}
