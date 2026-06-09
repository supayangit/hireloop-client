"use client";

import { useEffect } from "react";

export default function TextareaEnhancer() {
  useEffect(() => {
    const selector = ".textarea-scroll";

    const updateOverflow = (el) => {
      try {
        const textarea = el.querySelector("textarea") || el.querySelector(".custom-textarea");
        if (!textarea) return;
        const hasOverflow = textarea.scrollHeight > el.clientHeight;
        if (hasOverflow) {
          el.classList.remove("no-overflow");
        } else {
          el.classList.add("no-overflow");
        }
      } catch (e) {
        // ignore
      }
    };

    const observeEl = (el) => {
      updateOverflow(el);
      const onScrollOrInput = () => updateOverflow(el);
      el.addEventListener("scroll", onScrollOrInput, { passive: true });
      el.addEventListener("input", onScrollOrInput);
      // if the inner textarea resizes (e.g., typing), update
      const ta = el.querySelector("textarea") || el.querySelector(".custom-textarea");
      if (ta) ta.addEventListener("input", onScrollOrInput);

      // observe size changes
      const ro = new ResizeObserver(() => updateOverflow(el));
      ro.observe(el);
      if (ta) ro.observe(ta);

      return () => {
        el.removeEventListener("scroll", onScrollOrInput);
        el.removeEventListener("input", onScrollOrInput);
        if (ta) ta.removeEventListener("input", onScrollOrInput);
        ro.disconnect();
      };
    };

    const observed = new Map();

    const scan = () => {
      document.querySelectorAll(selector).forEach((el) => {
        if (!observed.has(el)) {
          const cleanup = observeEl(el);
          observed.set(el, cleanup);
        } else {
          // update state
          updateOverflow(el);
        }
      });
    };

    scan();

    const mo = new MutationObserver((mutations) => {
      scan();
    });

    mo.observe(document.body, { childList: true, subtree: true });

    const onResize = () => scan();
    window.addEventListener("resize", onResize);

    return () => {
      mo.disconnect();
      window.removeEventListener("resize", onResize);
      observed.forEach((cleanup) => {
        if (typeof cleanup === "function") cleanup();
      });
      observed.clear();
    };
  }, []);

  return null;
}
