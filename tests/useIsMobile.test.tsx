import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useIsMobile } from "@/hooks/use-mobile";

describe("useIsMobile", () => {
  it("returns true when width is below mobile breakpoint", () => {
    window.innerWidth = 500;

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it("returns false on desktop and updates after resize", () => {
    window.innerWidth = 1200;
    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    act(() => {
      window.innerWidth = 600;
      const mql = (window.matchMedia as any).lastReturn;
      mql.dispatchEvent(new Event("change"));
    });

    expect(result.current).toBe(true);
  });
});
