export interface ICacheService {
  createData<T>(key: string, value: T, ttlInSeconds?: number): Promise<void>;
  readData<T>(key: string): Promise<T | null>;
  readDataByPattern<T>(pattern: string): Promise<Array<T> | null>;
  updateData<T>(key: string, value: T, ttlInSeconds?: number): Promise<void>;
  deleteData(key: string): Promise<void>;
}
