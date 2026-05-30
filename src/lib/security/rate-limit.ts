import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "@/env";
import { ForbiddenError } from "@/lib/permissions/errors";

const hasUpstash =
  !!env.UPSTASH_REDIS_REST_URL &&
  !!env.UPSTASH_REDIS_REST_TOKEN;

const redis = hasUpstash
  ? new Redis({
      url: env.UPSTASH_REDIS_REST_URL!,
      token: env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
};

type RateLimiter = {
  limit: (identifier: string) => Promise<RateLimitResult>;
};

function createInMemoryRateLimit(limit: number, windowMs: number): RateLimiter {
  const entries = new Map<string, { count: number; reset: number }>();

  return {
    async limit(identifier) {
      const now = Date.now();
      const entry = entries.get(identifier);

      if (!entry || entry.reset <= now) {
        const reset = now + windowMs;
        entries.set(identifier, { count: 1, reset });

        return {
          success: true,
          limit,
          remaining: limit - 1,
          reset,
        };
      }

      if (entry.count >= limit) {
        return {
          success: false,
          limit,
          remaining: 0,
          reset: entry.reset,
        };
      }

      entry.count += 1;

      return {
        success: true,
        limit,
        remaining: limit - entry.count,
        reset: entry.reset,
      };
    },
  };
}

function createRateLimit(limit: number, window: `${number} ${"m" | "h"}`) {
  if (redis) {
    return new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limit, window),
      analytics: true,
    });
  }

  const [amount, unit] = window.split(" ");
  const windowMs = Number(amount) * (unit === "h" ? 60 * 60 * 1000 : 60 * 1000);

  return createInMemoryRateLimit(limit, windowMs);
}

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

export const invitationRateLimit = createRateLimit(10, "1 h");
export const fileUploadRateLimit = createRateLimit(30, "1 h");
export const adminMutationRateLimit = createRateLimit(20, "1 h");

export async function assertActionRateLimit(
  limiter: RateLimiter,
  actionType: string,
  userId: string
) {
  const { success } = await limiter.limit(`expensive:${actionType}:${userId}`);

  if (!success) {
    throw new ForbiddenError("Too many requests. Please try again later.");
  }
}
