import { ForbiddenError, UnauthorizedError } from "@/lib/permissions/errors";
import type { ActionState } from "@/lib/actions/action-state";

export async function safeAction<T>(
  action: () => Promise<T>
): Promise<ActionState<T>> {
  try {
    const data = await action();

    return {
      success: true,
      message: "Action completed successfully.",
      data,
    };
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return {
        success: false,
        message: "You must be signed in to continue.",
      };
    }

    if (error instanceof ForbiddenError) {
      return {
        success: false,
        message: error.message,
      };
    }

    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}