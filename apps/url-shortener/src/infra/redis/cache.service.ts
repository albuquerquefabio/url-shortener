import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ttlSecToMs } from './cache-constants';
import { ICacheService } from './interface/cache.interface';
import { hasObject } from '../../utils/utility';

@Injectable()
export class CacheService implements ICacheService {
  private redisClient: Cache['store'];

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.redisClient = this.cacheManager.store;
  }

  async createData<T>(
    key: string,
    value: T,
    ttlInSeconds?: number
  ): Promise<void> {
    const ttlMs = ttlInSeconds ? ttlSecToMs(ttlInSeconds) : undefined;
    if (ttlMs) {
      await this.redisClient.set(key, JSON.stringify(value), ttlMs);
    } else {
      await this.redisClient.set(key, JSON.stringify(value));
    }
  }

  async readData<T>(key: string): Promise<T | null> {
    const value = await this.cacheManager.get<T>(key);
    if (value && hasObject(value)) return value;
    return null;
  }

  async readDataByPattern<T>(pattern: string): Promise<Array<T> | null> {
    const keys = await this.redisClient.keys(pattern);
    if (!keys.length) return null;
    const values = (await this.redisClient.mget(...keys)) as Array<T>;
    return values.filter((value) => hasObject(value));
  }

  async updateData<T>(
    key: string,
    value: T,
    ttlInSeconds?: number
  ): Promise<void> {
    const ttlMs = ttlInSeconds ? ttlSecToMs(ttlInSeconds) : undefined;
    if (ttlMs) {
      await this.redisClient.set(key, JSON.stringify(value), ttlMs); // Use Redis PX option for TTL in milliseconds
    } else {
      await this.redisClient.set(key, JSON.stringify(value));
    }
  }

  async deleteData(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}
