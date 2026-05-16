"use client";

interface DiscLogoProps {
  discSize?: number;
  wordmarkSize?: number;
  layout?: "horizontal" | "vertical" | "mark-only" | "wordmark-only";
  gap?: number;
}

export default function DiscLogo({
  discSize = 32,
  wordmarkSize,
  layout = "horizontal",
  gap,
}: DiscLogoProps) {
  const uSize   = discSize * 0.68;
  const notchSz = discSize * 0.12;
  const notchR  = discSize * 0.08;
  const notchB  = discSize * 0.12;
  const wSize   = wordmarkSize ?? Math.max(13, Math.round(discSize * 0.42));
  const gapPx   = gap ?? Math.round(discSize * 0.28);

  const Mark = () => (
    <div
      style={{
        width: discSize,
        height: discSize,
        borderRadius: "50%",
        background: "var(--accent)",
        display: "grid",
        placeItems: "center",
        position: "relative",
        flexShrink: 0,
        transition: "background var(--duration) var(--ease)",
      }}
    >
      <span
        style={{
          fontFamily: "'Fraunces', 'Times New Roman', Georgia, serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: uSize,
          color: "var(--accent-fg)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          transform: "translateY(-4%)",
          userSelect: "none",
          transition: "color var(--duration) var(--ease)",
        }}
      >
        u
      </span>
      {/* Notch — gives the mark a distinct silhouette at small sizes */}
      <div
        style={{
          position: "absolute",
          right: notchR,
          bottom: notchB,
          width: notchSz,
          height: notchSz,
          background: "var(--accent-fg)",
          borderRadius: "50%",
          opacity: 0.7,
          transition: "background var(--duration) var(--ease)",
        }}
      />
    </div>
  );

  const Wordmark = () => (
    <span
      style={{
        fontFamily: "'Fraunces', 'Times New Roman', Georgia, serif",
        fontWeight: 300,
        fontSize: wSize,
        lineHeight: 1,
        letterSpacing: "-0.02em",
        color: "var(--fg-1)",
        whiteSpace: "nowrap",
        transition: "color var(--duration) var(--ease)",
      }}
    >
      usman
      <span style={{ fontStyle: "italic", color: "var(--accent)" }}>codes</span>
    </span>
  );

  if (layout === "mark-only")     return <Mark />;
  if (layout === "wordmark-only") return <Wordmark />;

  if (layout === "vertical") {
    return (
      <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: gapPx }}>
        <Mark />
        <Wordmark />
      </div>
    );
  }

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: gapPx }}>
      <Mark />
      <Wordmark />
    </div>
  );
}
