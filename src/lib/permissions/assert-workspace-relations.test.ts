import { beforeEach, describe, expect, it, vi } from "vitest";
import { prisma } from "@/lib/db/prisma";
import {
  assertAssigneeBelongsToWorkspace,
  assertClientBelongsToWorkspace,
} from "@/lib/permissions/assert-workspace-relations";
import { ForbiddenError } from "@/lib/permissions/errors";

vi.mock("@/lib/db/prisma", () => ({
  prisma: {
    client: {
      findFirst: vi.fn(),
    },
    workspaceMember: {
      findUnique: vi.fn(),
    },
  },
}));

describe("workspace relation assertions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("allows an empty project client assignment", async () => {
    await expect(
      assertClientBelongsToWorkspace(null, "workspace-1")
    ).resolves.toBeUndefined();
    expect(prisma.client.findFirst).not.toHaveBeenCalled();
  });

  it("rejects a project client outside the current workspace", async () => {
    vi.mocked(prisma.client.findFirst).mockResolvedValue(null);

    await expect(
      assertClientBelongsToWorkspace("client-2", "workspace-1")
    ).rejects.toBeInstanceOf(ForbiddenError);
  });

  it("allows a project client inside the current workspace", async () => {
    vi.mocked(prisma.client.findFirst).mockResolvedValue({ id: "client-1" });

    await expect(
      assertClientBelongsToWorkspace("client-1", "workspace-1")
    ).resolves.toBeUndefined();
  });

  it("allows an empty task assignee assignment", async () => {
    await expect(
      assertAssigneeBelongsToWorkspace(null, "workspace-1")
    ).resolves.toBeUndefined();
    expect(prisma.workspaceMember.findUnique).not.toHaveBeenCalled();
  });

  it("rejects a task assignee outside the current workspace", async () => {
    vi.mocked(prisma.workspaceMember.findUnique).mockResolvedValue(null);

    await expect(
      assertAssigneeBelongsToWorkspace("user-2", "workspace-1")
    ).rejects.toBeInstanceOf(ForbiddenError);
  });

  it("allows a task assignee inside the current workspace", async () => {
    vi.mocked(prisma.workspaceMember.findUnique).mockResolvedValue({
      id: "member-1",
    });

    await expect(
      assertAssigneeBelongsToWorkspace("user-1", "workspace-1")
    ).resolves.toBeUndefined();
  });
});
