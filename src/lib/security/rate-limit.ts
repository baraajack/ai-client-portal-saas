import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "@/env";

const hasUpstash =
  !!env.UPSTASH_REDIS_REST_URL &&
  !!env.UPSTASH_REDIS_REST_TOKEN;

const redis = hasUpstash
  ? new Redis({
      url: env.UPSTASH_REDIS_REST_URL!,
      token: env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

export const authRateLimit = hasUpstash
  ? new Ratelimit({
      redis: redis!,
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      analytics: true,
    })
  : {
      limit: async () => ({
        success: true,
        limit: 5,
        remaining: 5,
        reset: Date.now() + 10 * 60 * 1000,
      }),
    };