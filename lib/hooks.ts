"use client";

import { useEffect, type RefObject } from "react";

/** Locks page scroll while an overlay (drawer, modal, menu) is open. */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.dataset.scrollLocked;
    document.body.dataset.scrollLocked = "true";
    return () => {
      if (previous) {
        document.body.dataset.scrollLocked = previous;
      } else {
        delete document.body.dataset.scrollLocked;
      }
    };
  }, [locked]);
}

/** Calls the handler when Escape is pressed, while enabled. */
export function useEscape(enabled: boolean, handler: () => void) {
  useEffect(() => {
    if (!enabled) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handler();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled, handler]);
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Keeps keyboard focus inside an open overlay and restores it to the element
 * that opened the overlay when it closes.
 */
export function useFocusTrap(
  enabled: boolean,
  containerRef: RefObject<HTMLElement | null>,
  initialFocusRef?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusable = () =>
      [...container.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (element) => element.getClientRects().length > 0,
      );

    // Overlays often fade/transition into view. `focus()` is ignored while an
    // element is still `visibility: hidden`, so retry briefly until it lands.
    let attempts = 0;
    const timer = window.setInterval(() => {
      const target = initialFocusRef?.current ?? focusable()[0];
      if (target?.getClientRects().length) target.focus();
      attempts += 1;
      if (container.contains(document.activeElement) || attempts >= 12) {
        window.clearInterval(timer);
      }
    }, 40);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearInterval(timer);
      container.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [enabled, containerRef, initialFocusRef]);
}
