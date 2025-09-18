import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);
  private client: RedisClientType | null = null;
  private isConnected = false;

  constructor(private configService: ConfigService) {
    this.initializeRedis();
  }

  private async initializeRedis() {
    const redisUrl = this.configService.get('REDIS_URL');

    // Skip Redis if no URL is provided or if we're in development mode without Redis
    if (!redisUrl || this.configService.get('NODE_ENV') === 'development') {
      this.logger.warn('Redis not configured or in development mode - caching disabled');
      return;
    }

    try {
      // Convert redis:// to rediss:// for Upstash TLS connection
      const tlsRedisUrl = redisUrl.startsWith('redis://')
        ? redisUrl.replace('redis://', 'rediss://')
        : redisUrl;

      this.client = createClient({
        url: tlsRedisUrl,
      });

      this.client.on('error', err => {
        this.logger.error('Redis Client Error:', err);
        this.isConnected = false;
      });

      this.client.on('connect', () => {
        this.logger.log('Connected to Redis successfully');
        this.isConnected = true;
      });

      await this.client.connect();
    } catch (error) {
      this.logger.error('Failed to initialize Redis:', error);
      this.client = null;
      this.isConnected = false;
    }
  }

  async get(key: string): Promise<string | null> {
    if (!this.client || !this.isConnected) {
      return null;
    }
    try {
      return await this.client.get(key);
    } catch (error) {
      this.logger.error('Error getting cache:', error);
      return null;
    }
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (!this.client || !this.isConnected) {
      return;
    }
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
    if (!this.client || !this.isConnected) {
      return;
    }
    try {
      await this.client.del(key);
    } catch (error) {
      this.logger.error('Error deleting cache:', error);
    }
  }

  async flush(): Promise<void> {
    if (!this.client || !this.isConnected) {
      return;
    }
    try {
      await this.client.flushAll();
    } catch (error) {
      this.logger.error('Error flushing cache:', error);
    }
  }
}
