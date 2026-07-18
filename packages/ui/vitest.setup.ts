// jsdom lacks the pointer-capture, scroll, and observer APIs Radix primitives call.
// oxlint-disable-next-line no-empty-function -- intentional no-op stub
const noop = () => {};

window.HTMLElement.prototype.scrollIntoView = noop;
window.HTMLElement.prototype.hasPointerCapture = () => false;
window.HTMLElement.prototype.releasePointerCapture = noop;

window.ResizeObserver ??= class {
  observe = noop;
  unobserve = noop;
  disconnect = noop;
};
