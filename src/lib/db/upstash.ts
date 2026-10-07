import { Redis } from "@upstash/redis";

let redisClient: Redis | null = null;

export function getUpstashRedis(): Redis | null {
  if (redisClient) return redisClient;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token || url.trim() === "" || token.trim() === "") {
    return null;
  }

  try {
    redisClient = new Redis({
      url,
      token,
    });
    return redisClient;
  } catch (error) {
    console.error("Failed to initialize Upstash Redis client:", error);
    return null;
  }
}

/**
 * Cache helper for retrieving JSON values from Upstash Redis
 */
export async function redisGet<T>(key: string): Promise<T | null> {
  const redis = getUpstashRedis();
  if (!redis) return null;
  try {
    return await redis.get<T>(key);
  } catch (err) {
    console.warn("Upstash Redis get error:", err);
    return null;
  }
}

/**
 * Cache helper for storing JSON values in Upstash Redis (TTL in seconds, default 1 hour)
 */
export async function redisSet<T>(key: string, value: T, exSeconds = 3600): Promise<void> {
  const redis = getUpstashRedis();
  if (!redis) return;
  try {
    await redis.set(key, value, { ex: exSeconds });
  } catch (err) {
    console.warn("Upstash Redis set error:", err);
  }
}

/**
 * Cache helper for invalidating keys in Upstash Redis
 */
export async function redisDel(key: string): Promise<void> {
  const redis = getUpstashRedis();
  if (!redis) return;
  try {
    await redis.del(key);
  } catch (err) {
    console.warn("Upstash Redis del error:", err);
  }
}
