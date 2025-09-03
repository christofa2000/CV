
// Extiende Jest con matchers adicionales de jest-dom
// como .toBeInTheDocument(), .toHaveTextContent(), etc.
import '@testing-library/jest-dom';

// Polyfills/mocks for JSDOM
class MockIntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
}

(globalThis as any).IntersectionObserver = (globalThis as any).IntersectionObserver || MockIntersectionObserver;
