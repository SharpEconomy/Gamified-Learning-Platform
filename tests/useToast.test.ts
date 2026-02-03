import { describe, expect, it } from "vitest";

import { reducer } from "@/hooks/use-toast";

const createToast = (id: string, overrides: Record<string, unknown> = {}) => ({
  id,
  title: `Toast ${id}`,
  open: true,
  ...overrides,
});

describe("toast reducer", () => {
  it("adds toast and respects the limit of one active toast", () => {
    const first = reducer(
      { toasts: [] },
      { type: "ADD_TOAST", toast: createToast("1") },
    );
    const second = reducer(first, {
      type: "ADD_TOAST",
      toast: createToast("2"),
    });

    expect(first.toasts).toHaveLength(1);
    expect(second.toasts).toHaveLength(1);
    expect(second.toasts[0].id).toBe("2");
  });

  it("updates an existing toast by id", () => {
    const initial = { toasts: [createToast("1", { description: "old" })] };
    const updated = reducer(initial, {
      type: "UPDATE_TOAST",
      toast: { id: "1", description: "new" },
    });

    expect(updated.toasts[0].description).toBe("new");
  });

  it("dismisses a toast by setting open to false", () => {
    const initial = { toasts: [createToast("1")] };
    const dismissed = reducer(initial, { type: "DISMISS_TOAST", toastId: "1" });

    expect(dismissed.toasts[0].open).toBe(false);
  });

  it("removes a toast when REMOVE_TOAST is dispatched", () => {
    const initial = { toasts: [createToast("1"), createToast("2")] };
    const removed = reducer(initial, { type: "REMOVE_TOAST", toastId: "1" });

    expect(removed.toasts.map((t) => t.id)).toEqual(["2"]);
  });
});
