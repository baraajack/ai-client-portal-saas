import { describe, expect, it } from "vitest";
import { hasPermission } from "@/lib/permissions/has-permission";

describe("hasPermission", () => {
  it("allows admin to access manager permissions", () => {
    expect(hasPermission("ADMIN", "MANAGER")).toBe(true);
  });

  it("prevents client from accessing admin permissions", () => {
    expect(hasPermission("CLIENT", "ADMIN")).toBe(false);
  });

  it("allows same-role access", () => {
    expect(hasPermission("TEAM_MEMBER", "TEAM_MEMBER")).toBe(true);
  });
});