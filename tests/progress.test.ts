import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  getCourseProgress,
  getUserProgress,
  saveUserProgress,
  updateCourseProgress,
  type UserProgress,
} from "@/lib/progress";

const STORAGE_KEY = "codequest_progress";

describe("progress utilities", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns empty array when window is undefined (server side)", () => {
    const originalWindow = (globalThis as any).window;
    // @ts-expect-error - simulate server environment
    (globalThis as any).window = undefined;

    const result = getUserProgress();

    (globalThis as any).window = originalWindow;
    expect(result).toEqual([]);
  });

  it("saves and retrieves user progress from localStorage", () => {
    const progress: UserProgress[] = [
      { courseId: "course-1", completedLessons: ["l1"], xpEarned: 50 },
    ];

    saveUserProgress(progress);

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    expect(stored).toEqual(progress);
    expect(getUserProgress()).toEqual(progress);
  });

  it("creates new course progress when none exists", () => {
    updateCourseProgress("course-1", "lesson-1", 30);

    const stored = getUserProgress();
    expect(stored).toHaveLength(1);
    expect(stored[0]).toEqual({
      courseId: "course-1",
      completedLessons: ["lesson-1"],
      xpEarned: 30,
    });
  });

  it("appends new lessons and accumulates xp for existing course", () => {
    updateCourseProgress("course-1", "lesson-1", 30);
    updateCourseProgress("course-1", "lesson-2", 20);

    const stored = getUserProgress()[0];
    expect(stored.completedLessons).toEqual(["lesson-1", "lesson-2"]);
    expect(stored.xpEarned).toBe(50);
  });

  it("does not duplicate lessons when the same lesson is updated again", () => {
    updateCourseProgress("course-1", "lesson-1", 30);
    updateCourseProgress("course-1", "lesson-1", 10);

    const stored = getUserProgress()[0];
    expect(stored.completedLessons).toEqual(["lesson-1"]);
    expect(stored.xpEarned).toBe(40); // xp still accumulates
  });

  it("returns default progress for unknown course", () => {
    expect(getCourseProgress("missing")).toEqual({
      completedLessons: [],
      xpEarned: 0,
    });
  });

  it("handles storage failures without throwing", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const spy = vi.spyOn(localStorage, "setItem").mockImplementation(() => {
      throw new Error("quota exceeded");
    });

    expect(() =>
      saveUserProgress([{ courseId: "c1", completedLessons: [], xpEarned: 0 }]),
    ).not.toThrow();

    consoleSpy.mockRestore();
    spy.mockRestore();
  });
});
