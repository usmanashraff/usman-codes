"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [phase, setPhase] = useState<"visible" | "fading" | "gone">("visible");

  useEffect(() => {
    const MIN_DISPLAY = 900; // ms — let the bar finish its animation
    const start = Date.now();

    const dismiss = () => {
      const elapsed = Date.now() - start;
      const delay = Math.max(0, MIN_DISPLAY - elapsed);
      setTimeout(() => {
        setPhase("fading");
        setTimeout(() => setPhase("gone"), 650);
      }, delay);
    };

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
    }
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={`uc-loader${phase === "fading" ? " uc-loader--out" : ""}`}>
      <div className="uc-loader__content">
        <p className="uc-loader__name">
          usman<em>.codes</em>
        </p>
        <div className="uc-loader__track">
          <div className="uc-loader__fill" />
        </div>
      </div>
    </div>
  );
}
