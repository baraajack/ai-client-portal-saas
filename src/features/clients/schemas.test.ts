import { describe, expect, it } from "vitest";
import { clientSchema } from "@/features/clients/schemas";

describe("clientSchema", () => {
  it("accepts valid client data", () => {
    const result = clientSchema.safeParse({
      name: "Acme Corp",
      email: "client@example.com",
      company: "Acme",
      notes: "Important client",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = clientSchema.safeParse({
      name: "Acme Corp",
      email: "not-email",
    });

    expect(result.success).toBe(false);
  });
});