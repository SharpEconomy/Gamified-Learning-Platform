import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

const matchMediaMock = vi.fn((query: string) => {
  const listeners: Array<(event: MediaQueryListEvent) => void> = [];

  const mql = {
    media: query,
    get matches() {
      return window.innerWidth < 768;
    },
    onchange: null,
    addEventListener: (
      _event: string,
      listener: (event: MediaQueryListEvent) => void,
    ) => {
      listeners.push(listener);
    },
    removeEventListener: (
      _event: string,
      listener: (event: MediaQueryListEvent) => void,
    ) => {
      const index = listeners.indexOf(listener);
      if (index >= 0) listeners.splice(index, 1);
    },
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: (event: Event) => {
      listeners.forEach((listener) => listener(event as MediaQueryListEvent));
      return true;
    },
  } as MediaQueryList & {
    __listeners?: Array<(event: MediaQueryListEvent) => void>;
  };

  (mql as any).__listeners = listeners;
  (matchMediaMock as any).lastReturn = mql;
  return mql;
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: matchMediaMock,
});
