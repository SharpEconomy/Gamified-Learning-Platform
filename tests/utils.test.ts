import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges class names and resolves tailwind conflicts", () => {
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });

  it("ignores falsy values while keeping valid classes", () => {
    expect(cn("p-2", undefined, false, "text-sm")).toBe("p-2 text-sm");
  });

  it("returns empty string when called with no arguments", () => {
    expect(cn()).toBe("");
  });
});
