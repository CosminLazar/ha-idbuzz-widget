// ID. Buzz — custom Lovelace card
// Place this file in /config/www/id-buzz-card.js
// Add to resources: /local/id-buzz-card.js (type: module)
// Card type: custom:id-buzz-card

const CSS = `
  :host {
    display: block;
    width: 100%;

    /* dark theme tokens (default) */
    --ha-bg: #16181c;
    --ha-card: #1f2227;
    --ha-card-2: #25292f;
    --ha-line: rgba(255,255,255,0.07);
    --ha-line-strong: rgba(255,255,255,0.12);
    --ha-text: #e6e8ec;
    --ha-text-2: #a8adb6;
    --ha-text-3: #6c7079;

    --ha-card-inset: rgba(255,255,255,0.03);
    --ha-card-shadow: 0 8px 24px rgba(0,0,0,0.25);
    --ha-card-shadow-hover: 0 12px 32px rgba(0,0,0,0.4);
    --ha-dialog-shadow: 0 30px 80px rgba(0,0,0,0.55);
    --ha-track: rgba(255,255,255,0.10);
    --ha-track-soft: rgba(255,255,255,0.05);
    --ha-hover: rgba(255,255,255,0.06);
    --ha-shimmer: rgba(255,255,255,0.07);
    --ha-fill-grad-from: oklch(0.62 0.12 152);
    --ha-fill-grad-to: oklch(0.74 0.13 152);
    --ha-fill-grad-charging-from: oklch(0.78 0.16 152);
    --ha-fill-grad-charging-to: oklch(0.88 0.18 152);
    --ha-scrollbar-thumb: rgba(255,255,255,0.10);
    --ha-grip: rgba(0,0,0,0.25);
    --ha-btn-pending-bg: oklch(0.52 0.08 152);
    --ha-btn-pending-fg: rgba(10,26,18,0.72);

    /* security car svg paint */
    --car-body-fill: rgba(255,255,255,0.04);
    --car-body-stroke: rgba(255,255,255,0.12);
    --car-cabin-fill: rgba(255,255,255,0.025);

    /* accents */
    --ok: oklch(0.74 0.13 152);
    --ok-soft: oklch(0.74 0.13 152 / 0.16);
    --ok-on: #0a1a12;
    --charge: oklch(0.80 0.15 88);
    --charge-soft: oklch(0.80 0.15 88 / 0.18);
    --cool: oklch(0.74 0.09 235);
    --warn: oklch(0.72 0.16 35);

    --r-card: 18px;
    --r-inner: 12px;
    font-family: var(--primary-font-family, "Manrope", system-ui, sans-serif);
  }

  /* light theme — production target per design handoff */
  :host([data-theme="light"]) {
    --ha-bg: #eef0f3;
    --ha-card: #ffffff;
    --ha-card-2: #f5f6f8;
    --ha-line: rgba(15,18,23,0.07);
    --ha-line-strong: rgba(15,18,23,0.14);
    --ha-text: #1a1d22;
    --ha-text-2: #5a6068;
    --ha-text-3: #8a9099;

    --ha-card-inset: rgba(255,255,255,0.7);
    --ha-card-shadow: 0 1px 2px rgba(15,18,23,0.04), 0 6px 18px rgba(15,18,23,0.06);
    --ha-card-shadow-hover: 0 2px 4px rgba(15,18,23,0.05), 0 14px 32px rgba(15,18,23,0.10);
    --ha-dialog-shadow: 0 24px 60px rgba(15,18,23,0.18), 0 6px 16px rgba(15,18,23,0.08);
    --ha-track: rgba(15,18,23,0.08);
    --ha-track-soft: rgba(15,18,23,0.04);
    --ha-hover: rgba(15,18,23,0.04);
    --ha-shimmer: rgba(15,18,23,0.05);
    --ha-fill-grad-from: oklch(0.55 0.13 152);
    --ha-fill-grad-to: oklch(0.65 0.14 152);
    --ha-fill-grad-charging-from: oklch(0.55 0.14 152);
    --ha-fill-grad-charging-to: oklch(0.72 0.17 152);
    --ha-scrollbar-thumb: rgba(15,18,23,0.18);
    --ha-grip: rgba(255,255,255,0.5);
    --ha-btn-pending-bg: color-mix(in oklch, var(--ok), black 28%);
    --ha-btn-pending-fg: color-mix(in oklch, var(--ok-on), transparent 28%);

    --car-body-fill: rgba(15,18,23,0.02);
    --car-body-stroke: rgba(15,18,23,0.14);
    --car-cabin-fill: rgba(15,18,23,0.015);

    --ok: oklch(0.55 0.13 152);
    --ok-soft: oklch(0.55 0.13 152 / 0.12);
    --ok-on: #ffffff;
    --charge: oklch(0.62 0.15 88);
    --charge-soft: oklch(0.62 0.15 88 / 0.16);
    --cool: oklch(0.55 0.10 235);
    --warn: oklch(0.58 0.18 35);
  }

  /* ---- CARD ---- */
  .ha-card {
    background: var(--ha-card);
    color: var(--ha-text);
    border-radius: var(--r-card);
    border: 1px solid var(--ha-line);
    box-shadow: 0 1px 0 var(--ha-card-inset) inset, var(--ha-card-shadow);
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.12s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.18s ease, border-color 0.18s ease;
    display: block;
  }
  .ha-card:hover {
    transform: translateY(-2px);
    border-color: var(--ha-line-strong);
    box-shadow: 0 1px 0 var(--ha-card-inset) inset, var(--ha-card-shadow-hover);
  }
  .ha-card:active { transform: translateY(0); }
  .ha-card:focus-visible { outline: 2px solid var(--ok); outline-offset: 3px; }

  /* photo */
  .hero__photo {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: var(--ha-card);
  }
  .hero__photo-img {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center 58%;
    display: block;
    user-select: none;
    -webkit-user-drag: none;
  }
  .hero__photo-gradient {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.85) 100%);
    pointer-events: none;
  }
  :host([data-theme="light"]) .hero__photo-gradient {
    background: linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.85) 100%);
  }
  .hero__top-row {
    position: absolute; top: 16px; left: 18px; right: 16px;
    display: flex; justify-content: space-between; align-items: flex-start;
  }
  .hero__name { display: flex; flex-direction: column; }
  .hero__name-main { font-size: 17px; font-weight: 700; letter-spacing: -0.01em; color: #fff; }
  .hero__name-sub { font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.7); margin-top: 2px; }
  .hero__status-cluster { display: flex; gap: 6px; }
  .hero__status-item {
    width: 28px; height: 28px;
    display: inline-flex; align-items: center; justify-content: center;
    border-radius: 999px;
    background: rgba(0,0,0,0.45);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    color: rgba(255,255,255,0.92);
    border: 1px solid rgba(255,255,255,0.1);
  }
  .hero__status-item--ok {
    /* Pinned bright green + green-tinted pill so the "ok" state reads clearly
       on top of the dark photo overlay in both light and dark themes. */
    color: oklch(0.92 0.18 152);
    background: color-mix(in oklch, oklch(0.55 0.18 152) 55%, rgba(0,0,0,0.45));
    border-color: color-mix(in oklch, oklch(0.7 0.18 152) 60%, transparent);
  }
  .hero__charge-overlay {
    position: absolute; bottom: 24px; left: 18px; right: 18px;
    display: flex; justify-content: space-between; align-items: flex-end;
    color: #fff;
  }
  .hero__charge-left {
    display: flex; flex-direction: column; gap: 6px; min-width: 0;
  }
  .hero__charge-num { display: flex; align-items: baseline; gap: 4px; }
  .hero__charge-charging {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11.5px; font-weight: 600;
    /* Pinned bright green: --ok is tuned for card surfaces, but this label
       sits over the dark photo gradient in both light and dark themes,
       so it needs to stay legible regardless of the active theme. */
    color: oklch(0.85 0.18 152);
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  }
  .hero__charge-charging[hidden] { display: none; }
  .hero__charge-charging svg {
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.5));
    flex: 0 0 auto;
  }
  .hero__charge-pct { font-size: 56px; font-weight: 700; letter-spacing: -0.03em; line-height: 0.9; }
  .hero__charge-pct-sym { font-size: 22px; font-weight: 600; color: rgba(255,255,255,0.78); }
  .hero__charge-target { margin-left: 8px; font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.65); padding-bottom: 6px; }
  .hero__range { display: flex; align-items: baseline; gap: 4px; padding-bottom: 4px; }
  .hero__range-num { font-size: 24px; font-weight: 700; letter-spacing: -0.02em; line-height: 1; }
  .hero__range-unit { font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.6); }
  .hero__bar { position: absolute; bottom: 0; left: 0; right: 0; height: 6px; background: rgba(255,255,255,0.1); }
  .hero__bar-fill { position: absolute; inset: 0 auto 0 0; background: linear-gradient(90deg, var(--ha-fill-grad-from), var(--ha-fill-grad-to)); }
  .hero__bar-target { position: absolute; top: -2px; bottom: -2px; width: 2px; background: #fff; transform: translateX(-1px); }

  /* footer */
  .hero__footer { display: flex; align-items: center; padding: 14px 18px 16px; }
  .hero__metric { flex: 1 1 0; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .hero__metric-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ha-text-3); }
  .hero__metric-val { font-size: 14px; font-weight: 600; color: var(--ha-text); white-space: nowrap; }
  .hero__metric-val--muted { color: var(--ha-text-2); font-weight: 500; }
  .hero__metric-unit { font-size: 11px; color: var(--ha-text-2); font-weight: 500; }
  .hero__metric-sep { width: 1px; height: 24px; background: var(--ha-line); margin: 0 4px; }

  /* atoms */
  .dot { width: 7px; height: 7px; border-radius: 999px; display: inline-block; background: var(--ha-text-3); }
  .dot--ok { background: var(--ok); box-shadow: 0 0 0 3px var(--ok-soft); }

  /* ---- POPUP ---- */
  .pop-root {
    position: fixed; inset: 0; z-index: 9999;
    display: flex; align-items: center; justify-content: center;
    pointer-events: none; opacity: 0;
    transition: opacity 0.18s ease;
  }
  .pop-root--open { opacity: 1; pointer-events: auto; }
  .pop-backdrop {
    position: absolute; inset: 0;
    background: rgba(8,9,11,0.62);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }
  .pop-dialog {
    position: relative;
    width: min(520px, calc(100vw - 32px));
    max-height: calc(100vh - 48px);
    background: var(--ha-card);
    color: var(--ha-text);
    border-radius: 22px;
    border: 1px solid var(--ha-line-strong);
    box-shadow: 0 1px 0 var(--ha-card-inset) inset, var(--ha-dialog-shadow);
    display: flex; flex-direction: column;
    overflow: hidden;
    transform: translateY(8px) scale(0.985);
    transition: transform 0.22s cubic-bezier(0.2,0.8,0.2,1);
  }
  .pop-root--open .pop-dialog { transform: translateY(0) scale(1); }

  /* popup photo */
  .pop-photo { position: relative; width: 100%; aspect-ratio: 16/9; background: #0e1013; flex: 0 0 auto; overflow: hidden; }
  .pop-photo__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 58%; display: block; user-select: none; -webkit-user-drag: none; }
  .pop-photo__grad {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.85) 100%);
    pointer-events: none;
  }
  .pop-close {
    position: absolute; top: 14px; right: 14px;
    width: 32px; height: 32px; border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(0,0,0,0.5); backdrop-filter: blur(12px);
    color: #fff; display: inline-flex; align-items: center; justify-content: center;
    cursor: pointer; transition: background 0.15s ease;
  }
  .pop-close:hover { background: rgba(0,0,0,0.7); }
  .pop-photo__title { position: absolute; left: 22px; bottom: 16px; right: 22px; }
  .pop-photo__name { font-size: 22px; font-weight: 700; letter-spacing: -0.015em; color: #fff; }
  .pop-photo__sub { margin-top: 4px; display: flex; align-items: center; gap: 7px; font-size: 12px; color: rgba(255,255,255,0.78); }

  /* popup body */
  .pop-body {
    flex: 1 1 auto; overflow-y: auto;
    padding: 18px 20px 8px;
    display: flex; flex-direction: column; gap: 14px;
    scrollbar-width: thin; scrollbar-color: var(--ha-scrollbar-thumb) transparent;
  }
  .pop-body::-webkit-scrollbar { width: 8px; }
  .pop-body::-webkit-scrollbar-thumb { background: var(--ha-scrollbar-thumb); border-radius: 4px; }

  .pop-section { background: var(--ha-card-2); border: 1px solid var(--ha-line); border-radius: 14px; padding: 14px 16px; }
  .pop-section__head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .pop-section__title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--ha-text-2); }

  .pop-tag { font-size: 10.5px; font-weight: 600; padding: 3px 8px; border-radius: 999px; background: var(--ha-track-soft); color: var(--ha-text-2); }
  .pop-tag--ok { background: var(--ok-soft); color: var(--ok); }
  .pop-tag--muted { background: var(--ha-track-soft); color: var(--ha-text-3); }
  .pop-tag--warn { background: color-mix(in oklch, var(--warn) 18%, transparent); color: var(--warn); }

  /* charge */
  .pop-charge { display: flex; align-items: center; gap: 16px; margin-bottom: 12px; }
  .pop-charge__num { display: flex; align-items: baseline; gap: 2px; }
  .pop-charge__pct { font-size: 48px; font-weight: 700; letter-spacing: -0.025em; line-height: 0.95; }
  .pop-charge__sym { font-size: 22px; font-weight: 600; color: var(--ha-text-2); }
  .pop-charge__meta { display: flex; flex-direction: column; gap: 2px; }
  .pop-charge__target { font-size: 13px; color: var(--ha-text-2); }
  .pop-charge__target strong { color: var(--ha-text); font-weight: 600; }
  .pop-charge__hint { font-size: 11.5px; color: var(--ha-text-3); }

  .pop-bar {
    position: relative; height: 8px;
    background: var(--ha-track); border-radius: 999px;
    cursor: ew-resize; touch-action: none;
    margin-top: 18px; margin-bottom: 22px;
  }
  .pop-bar__fill {
    position: absolute; inset: 0 auto 0 0;
    background: linear-gradient(90deg, var(--ha-fill-grad-from), var(--ha-fill-grad-to));
    border-radius: 999px; pointer-events: none;
  }
  /* ---- Charging indicator pattern ---- */
  .hero__bar--charging {
    background: color-mix(in oklch, var(--ok) 22%, rgba(255,255,255,0.1));
  }
  .hero__bar--charging .hero__bar-fill {
    overflow: hidden;
    background: linear-gradient(90deg, var(--ha-fill-grad-charging-from), var(--ha-fill-grad-charging-to));
    animation: charge-glow-hero 2.4s ease-in-out infinite;
  }
  .hero__bar-sheen {
    position: absolute; top: 0; bottom: 0;
    width: 40%; left: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%);
    animation: charge-sheen 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    pointer-events: none;
  }
  .pop-bar--charging {
    background: color-mix(in oklch, var(--ok) 18%, var(--ha-track));
  }
  .pop-bar--charging .pop-bar__fill {
    overflow: hidden;
    background: linear-gradient(90deg, var(--ha-fill-grad-charging-from), var(--ha-fill-grad-charging-to));
    animation: charge-glow-pop 2.4s ease-in-out infinite;
  }
  .pop-bar__sheen {
    position: absolute; top: 0; bottom: 0;
    width: 40%; left: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%);
    animation: charge-sheen 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    pointer-events: none;
  }
  @keyframes charge-sheen {
    0%   { transform: translateX(-120%); }
    100% { transform: translateX(360%); }
  }
  @keyframes charge-glow-hero {
    0%, 100% {
      box-shadow: 0 0 4px 0 color-mix(in oklch, var(--ok) 55%, transparent),
                  0 0 8px 0 color-mix(in oklch, var(--ok) 22%, transparent);
    }
    50% {
      box-shadow: 0 0 6px 0 color-mix(in oklch, var(--ok) 70%, transparent),
                  0 0 12px 1px color-mix(in oklch, var(--ok) 32%, transparent);
    }
  }
  @keyframes charge-glow-pop {
    0%, 100% {
      box-shadow: 0 0 5px 0 color-mix(in oklch, var(--ok) 55%, transparent),
                  0 0 10px 0 color-mix(in oklch, var(--ok) 22%, transparent);
    }
    50% {
      box-shadow: 0 0 8px 1px color-mix(in oklch, var(--ok) 70%, transparent),
                  0 0 15px 1px color-mix(in oklch, var(--ok) 32%, transparent);
    }
  }
  .pop-tag--charging {
    background: var(--ok-soft);
    color: var(--ok);
    display: inline-flex; align-items: center; gap: 6px;
  }
  .pop-tag__pulse {
    width: 6px; height: 6px;
    border-radius: 999px;
    background: var(--ok);
    animation: charge-pulse 1.4s ease-out infinite;
  }
  .dot--pulse {
    background: var(--ok);
    animation: charge-pulse 1.4s ease-out infinite;
  }
  @keyframes charge-pulse {
    0%   { box-shadow: 0 0 0 0 color-mix(in oklch, var(--ok) 60%, transparent); }
    70%  { box-shadow: 0 0 0 6px color-mix(in oklch, var(--ok) 0%, transparent); }
    100% { box-shadow: 0 0 0 0 color-mix(in oklch, var(--ok) 0%, transparent); }
  }
  .hero__metric-val--ok { color: var(--ok); font-weight: 600; }
  @media (prefers-reduced-motion: reduce) {
    .hero__bar-sheen, .pop-bar__sheen { animation: none; opacity: 0; }
    .pop-tag__pulse, .dot--pulse { animation: none; }
    .hero__bar--charging .hero__bar-fill,
    .pop-bar--charging .pop-bar__fill { animation: none; }
  }
  .pop-bar__target {
    position: absolute; top: 50%;
    width: 14px; height: 22px; border-radius: 5px;
    background: var(--ha-text);
    transform: translate(-50%, -50%);
    cursor: ew-resize;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.25), 0 0 0 2px var(--ha-card);
    transition: transform 0.12s cubic-bezier(0.2,0.8,0.2,1);
    touch-action: none;
  }
  .pop-bar__target:focus-visible { outline: 2px solid var(--ok); outline-offset: 3px; }
  .pop-bar__target--applying { animation: pop-target-pulse 1.1s ease-in-out infinite; }
  @keyframes pop-target-pulse {
    0%, 100% { box-shadow: 0 2px 6px rgba(0,0,0,0.25), 0 0 0 2px var(--ha-card), 0 0 0 4px rgba(120,180,255,0.55); }
    50%      { box-shadow: 0 2px 6px rgba(0,0,0,0.25), 0 0 0 2px var(--ha-card), 0 0 0 8px rgba(120,180,255,0.0); }
  }
  .pop-bar__target-grip { width: 2px; height: 10px; background: var(--ha-grip); border-radius: 2px; box-shadow: 3px 0 0 var(--ha-grip), -3px 0 0 var(--ha-grip); }
  .pop-bar__target-label {
    position: absolute; bottom: calc(100% + 4px); left: 50%; transform: translateX(-50%);
    font-size: 10.5px; font-weight: 700; color: var(--ha-text);
    background: var(--ha-card-2); border: 1px solid var(--ha-line-strong);
    padding: 2px 6px; border-radius: 6px; white-space: nowrap;
    pointer-events: none; font-variant-numeric: tabular-nums;
  }

  /* kv grid */
  .pop-kv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 18px; }
  .pop-kv { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .pop-kv--inline { flex-direction: row; justify-content: space-between; align-items: baseline; width: 100%; }
  .pop-kv__k { font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--ha-text-3); }
  .pop-kv__v { font-size: 13.5px; font-weight: 600; color: var(--ha-text); }
  .pop-kv__v--muted { color: var(--ha-text-2); font-weight: 500; }
  .pop-kv__v--ok { color: var(--ok); }

  /* range stats */
  .pop-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .pop-stat { display: flex; flex-direction: column; gap: 3px; padding: 4px 0; }
  .pop-stat__v { font-size: 22px; font-weight: 700; letter-spacing: -0.02em; line-height: 1; color: var(--ha-text); }
  .pop-stat__u { font-size: 11px; font-weight: 500; color: var(--ha-text-2); }
  .pop-stat__k { font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--ha-text-3); }

  /* security */
  .pop-security { display: grid; grid-template-columns: 96px 1fr; gap: 18px; align-items: center; }
  .pop-car-svg { width: 96px; height: auto; display: block; }
  .pop-checks { display: flex; flex-direction: column; gap: 8px; }
  .pop-check { display: flex; align-items: center; gap: 10px; font-size: 12.5px; }
  .pop-check__dot { width: 6px; height: 6px; border-radius: 999px; background: var(--ha-text-3); flex: 0 0 auto; }
  .pop-check__dot--ok { background: var(--ok); box-shadow: 0 0 0 3px var(--ok-soft); }
  .pop-check__dot--warn { background: var(--warn); box-shadow: 0 0 0 3px oklch(0.72 0.16 35 / 0.2); }
  .pop-check__label { flex: 1 1 auto; color: var(--ha-text); }
  .pop-check__hint { color: var(--ha-text-3); font-size: 11px; font-variant-numeric: tabular-nums; }

  /* climate */
  .pop-climate { display: flex; align-items: center; gap: 18px; }
  .pop-climate__big { display: flex; flex-direction: column; align-items: flex-start; gap: 0; }
  .pop-climate__t { font-size: 42px; font-weight: 700; letter-spacing: -0.025em; line-height: 0.95; }
  .pop-climate__t-deg { font-size: 26px; color: var(--ha-text-2); }
  .pop-climate__t-label { font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ha-text-3); margin-top: 2px; }
  .pop-climate__meta { flex: 1 1 auto; display: flex; flex-direction: column; gap: 8px; }

  /* actions */
  .pop-actions {
    flex: 0 0 auto; display: flex; gap: 8px;
    padding: 12px 16px 16px;
    border-top: 1px solid var(--ha-line);
    background: var(--ha-card);
  }
  .pop-btn {
    flex: 1 1 0; display: inline-flex; align-items: center; justify-content: center; gap: 7px;
    height: 40px; border-radius: 12px;
    font-family: inherit; font-size: 13px; font-weight: 600;
    cursor: pointer; position: relative; isolation: isolate; overflow: hidden;
    font-variant-numeric: tabular-nums;
    transition: background 0.12s ease, transform 0.06s ease;
    border: 1px solid var(--ha-line);
    background: var(--ha-card-2); color: var(--ha-text);
  }
  .pop-btn:hover { background: var(--ha-hover); }
  .pop-btn:active { transform: scale(0.985); }
  .pop-btn--primary { background: var(--ok); color: var(--ok-on); border-color: transparent; }
  .pop-btn--primary:hover { background: color-mix(in oklch, var(--ok), white 8%); }

  /* ---- LOADING BUTTON STATES ---- */
  .pop-btn:disabled { cursor: default; pointer-events: none; }
  .pop-btn::before {
    content: ''; position: absolute; inset: 0; z-index: -1;
    background: linear-gradient(90deg, transparent 0%, var(--ha-shimmer) 50%, transparent 100%);
    transform: translateX(-100%); opacity: 0;
  }
  .pop-btn--pending::before { opacity: 1; animation: btn-shimmer 1.4s linear infinite; }
  .pop-btn--primary.pop-btn--pending::before {
    background: linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.08) 50%, transparent 100%);
  }
  @keyframes btn-shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
  .pop-btn--pending { background: var(--ha-card-2); color: var(--ha-text-2); border-color: var(--ha-line); }
  .pop-btn--primary.pop-btn--pending { background: var(--ha-btn-pending-bg); color: var(--ha-btn-pending-fg); border-color: transparent; }
  .pop-btn--success { background: var(--ok-soft); color: var(--ok); border-color: color-mix(in oklch, var(--ok) 45%, transparent); }
  .pop-btn--primary.pop-btn--success { background: var(--ok); color: var(--ok-on); border-color: transparent; }
  .pop-spinner { display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; }
  .pop-spinner > svg { animation: btn-spin 0.9s linear infinite; }
  @keyframes btn-spin { to { transform: rotate(360deg); } }
  .pop-btn__check { display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; animation: check-pop 0.28s cubic-bezier(0.2,0.9,0.3,1.2) forwards; }
  @keyframes check-pop {
    0%   { transform: scale(0.4); opacity: 0; }
    60%  { transform: scale(1.15); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @media (prefers-reduced-motion: reduce) {
    .pop-spinner > svg { animation: none; }
    .pop-btn--pending::before { animation: none; opacity: 0.4; }
    .pop-btn__check { animation: none; }
  }
`;

const SVG = {
  lock: `<svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M4 6V4a3 3 0 016 0v2M3 6h8v6H3V6z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
  window: `<svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="2" y="3" width="10" height="8" rx="1" stroke="currentColor" stroke-width="1.4"/><path d="M2 7h10" stroke="currentColor" stroke-width="1.4"/></svg>`,
  shield: `<svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 1L2 3v4c0 3 2 5 5 6 3-1 5-3 5-6V3L7 1z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
  close: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  btnLock: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 6V4a3 3 0 016 0v2M3 6h8v6H3V6z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
  btnClimate: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v3M7 9v3M2 7h3M9 7h3M3.5 3.5l2 2M8.5 8.5l2 2M3.5 10.5l2-2M8.5 5.5l2-2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`,
  btnCharge: `<svg width="12" height="14" viewBox="0 0 12 14" fill="none"><path d="M7 1L1.5 7H5L5 13L10.5 6H7V1Z" fill="currentColor"/></svg>`,
  bolt: `<svg width="10" height="11" viewBox="0 0 12 14" fill="none" aria-hidden="true"><path d="M7 1L1.5 7H5L5 13L10.5 6H7V1Z" fill="currentColor"/></svg>`,
  spinner: `<span class="pop-spinner"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.6" stroke-opacity="0.22"/><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.6" stroke-dasharray="8 24" stroke-linecap="round"/></svg></span>`,
  check: `<span class="pop-btn__check"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7.5l2.5 2.5L11 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`,
};

class IDBuzzCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = {};
    this._hass = null;
    this._popupOpen = false;
    this._localTarget = null;
    this._rendered = false;
    this._dragState = null;
  }

  setConfig(config) {
    if (!config) throw new Error('Invalid configuration');
    this._config = config;
    this._localTarget = null;
    this._applyTheme();
    // Defer initial render until hass is available so _targetBounds()
    // can read entity attributes (min/max/step) when building the popup.
    // If hass is already set (config change after first render), re-render now.
    if (this._hass) this._doRender();
  }

  set hass(hass) {
    const prev = this._hass;
    this._hass = hass;
    this._applyTheme();
    if (!this._rendered) {
      this._doRender();
      return;
    }
    // Lightweight update — only patch values that changed
    this._patchValues(prev);
  }

  _applyTheme() {
    // theme: 'light' | 'dark' | 'auto' (default 'auto' — follows HA's dark mode)
    const choice = this._config.theme || 'auto';
    let dark;
    if (choice === 'light') dark = false;
    else if (choice === 'dark') dark = true;
    else dark = this._hass?.themes?.darkMode !== false; // default to dark when hass not ready
    const next = dark ? 'dark' : 'light';
    if (this.getAttribute('data-theme') !== next) this.setAttribute('data-theme', next);
  }

  getCardSize() { return 5; }

  getGridOptions() {
    return {
      columns: 12,
      rows: 6,
      min_columns: 6,
      min_rows: 4,
      max_rows: 12,
    };
  }

  static getConfigElement() {
    return document.createElement('id-buzz-card-editor');
  }

  static getStubConfig() {
    return { title: 'ID. Buzz', image: '/local/idbuzz.webp', entities: {} };
  }

  // --- Helpers ---

  _e(key) {
    return this._config.entities?.[key];
  }

  _state(key) {
    const id = this._e(key);
    return id && this._hass?.states[id];
  }

  _val(key, fallback = '—') {
    return this._state(key)?.state ?? fallback;
  }

  _num(key, fallback = 0) {
    return parseFloat(this._val(key, String(fallback))) || fallback;
  }

  _isClosed(key) {
    const v = this._val(key, '').toLowerCase();
    // binary_sensor: 'off' = the door/trunk is closed
    return v === 'off' || v === 'closed' || v === 'locked';
  }

  _isParkingLightOff(key) {
    const v = this._val(key, '').toLowerCase();
    return v === 'off' || v === 'no light';
  }

  _isOn(key) {
    const v = this._val(key, '').toLowerCase();
    return v === 'on' || v === 'connected' || v === 'plugged' || v === 'locked';
  }

  _soc() { return this._num('battery_level'); }
  _target() { return this._localTarget ?? this._num('target_charge'); }

  _isCharging() {
    const s = this._val('charging_state', '').toLowerCase();
    return s.includes('charg') && !s.includes('not');
  }

  _fmtChargingPower() {
    const p = this._val('charging_power');
    if (!p || p === '—') return null;
    return /kw/i.test(String(p)) ? p : `${p} kW`;
  }

  _fmtTimeToTarget() {
    const t = this._val('charging_time_left');
    if (!t || t === '—') return null;
    const s = String(t);
    const hMatch = s.match(/(\d+)\s*h/i);
    const mMatch = s.match(/(\d+)\s*m/i);
    let mins;
    if (hMatch || mMatch) {
      mins = (hMatch ? parseInt(hMatch[1], 10) * 60 : 0) + (mMatch ? parseInt(mMatch[1], 10) : 0);
    } else {
      mins = parseInt(s, 10);
    }
    if (!Number.isFinite(mins) || mins <= 0) return null;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m}m`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
  }

  _heroSubInner(charging) {
    if (!charging) return this._parkingText().toLowerCase();
    const t = this._fmtTimeToTarget();
    const target = this._target();
    const txt = t ? `charging · ${t} to ${target}%` : `charging · target ${target}%`;
    return `${SVG.bolt}<span>${txt}</span>`;
  }

  _cableMetricInner(charging) {
    if (!charging) return this._cableText();
    return this._fmtChargingPower() ?? this._cableText();
  }

  _photoSubInner(charging) {
    if (!charging) {
      const secureText = this._secureBadge();
      return `<span class="dot dot--ok" aria-hidden="true"></span><span id="pop-photo-park">${this._parkingText()}</span> · <span id="pop-photo-secure">${secureText}</span>`;
    }
    const power = this._fmtChargingPower();
    const t = this._fmtTimeToTarget();
    const target = this._target();
    const parts = ['Charging'];
    if (power) parts.push(power);
    parts.push(t ? `${t} to ${target}%` : `target ${target}%`);
    return `<span class="dot dot--pulse" aria-hidden="true"></span><span>${parts.join(' · ')}</span>`;
  }

  _chargingTagInner(charging) {
    if (!charging) return 'Not charging';
    const power = this._fmtChargingPower();
    return `<span class="pop-tag__pulse" aria-hidden="true"></span>${power ? `Charging · ${power}` : 'Charging'}`;
  }

  _syncSheen(fillEl, charging, sheenClass) {
    if (!fillEl) return;
    const existing = fillEl.querySelector('.' + sheenClass);
    if (charging && !existing) {
      const span = document.createElement('span');
      span.className = sheenClass;
      span.setAttribute('aria-hidden', 'true');
      fillEl.appendChild(span);
    } else if (!charging && existing) {
      existing.remove();
    }
  }

  _allDoorsClosed() {
    return ['door_closed_left_front', 'door_closed_left_back', 'door_closed_right_front', 'door_closed_right_back']
      .every(k => this._isClosed(k));
  }

  _allWindowsClosed() {
    if (this._state('windows_closed')) return this._isClosed('windows_closed');
    return ['window_closed_left_front', 'window_closed_left_back', 'window_closed_right_front', 'window_closed_right_back']
      .every(k => this._isClosed(k));
  }

  _safetyStatus() {
    if (!this._state('safety_status')) return { label: '—', ok: false };
    const ok = this._isClosed('safety_status');
    return { label: ok ? 'Safe' : 'Unsafe', ok };
  }

  _connectionLabel() {
    if (!this._state('connection_online')) return '—';
    return this._isOn('connection_online') ? 'Online' : 'Offline';
  }

  _externalPowerLabel() {
    if (!this._state('external_power')) return '—';
    return this._isOn('external_power') ? 'Connected' : 'Not connected';
  }

  _secureBadge() {
    const locked = this._isClosed('doors_locked');
    const doors = this._allDoorsClosed();
    const windows = this._allWindowsClosed();
    const trunk = this._isClosed('trunk_closed') && this._isClosed('trunk_locked');
    const hood = this._isClosed('hood_closed');
    return (locked && doors && windows && trunk && hood) ? 'All secure' : 'Check security';
  }

  _secureOk() { return this._secureBadge() === 'All secure'; }

  _parkingTextShort() {
    const raw = this._val('parking_time', '');
    const parking_timestamp = Date.parse(raw);

    if (isNaN(parking_timestamp)) {
      return "Driving";
    }

    return this._timeAgo(new Date(parking_timestamp));
  }

  _parkingText() {
    const raw = this._val('parking_time', '');
    const parking_timestamp = Date.parse(raw);

    if (isNaN(parking_timestamp)) {
      return "Driving";
    }

    return `Parked ${this._timeAgo(new Date(parking_timestamp))}`;

    // if (!raw || raw === '—') return 'Parked';
    // const lower = raw.toLowerCase();
    // if (lower.includes('ago') || lower.includes('h') || lower.includes('m')) return `Parked · ${raw}`;
    // return `Parked · ${raw}`;
  }

  _climTemp() {
    const raw = this._val('climatisation_target_temperature');
    const n = parseFloat(raw);
    return isNaN(n) ? '—' : n;
  }

  _cableText() {
    const cable_connected = this._isOn('charging_cable_connected');
    return cable_connected ? "plugged" : "unplugged";
  }

  _climateState() {
    return this._val('climatisation_state');
  }

  _timeAgo(date) {
    const now = new Date();
    const seconds = Math.round((date.getTime() - now.getTime()) / 1000);

    const units = [
      ["year", 60 * 60 * 24 * 365],
      ["month", 60 * 60 * 24 * 30],
      ["week", 60 * 60 * 24 * 7],
      ["day", 60 * 60 * 24],
      ["hour", 60 * 60],
      ["minute", 60],
      ["second", 1],
    ];

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto", style:"short" });

    for (const [unit, secondsInUnit] of units) {
      const value = Math.round(seconds / secondsInUnit);

      if (Math.abs(value) >= 1) {
        return rtf.format(value, unit);
      }
    }

    return "just now";
  }
  // --- Full render ---

  _doRender() {
    this._rendered = false;
    const sr = this.shadowRoot;
    sr.innerHTML = '';

    const style = document.createElement('style');
    style.textContent = CSS;
    sr.appendChild(style);

    const soc = this._soc();
    const target = this._target();
    const range = this._num('electric_range') ?? this._num('battery_cruising_range') ?? '—';
    const odometer = this._val('odometer');
    const cable = this._cableText();
    const climTemp = this._climTemp();
    const climState = this._climateState();
    const serviceDay = this._val('service_inspection_days');
    const charging = this._isCharging();
    const secure = this._secureOk();
    const doorsLocked = this._isClosed('doors_locked');
    const allWindows = this._allWindowsClosed();
    const parkText = this._parkingText();
    const parkTextShort = this._parkingTextShort();
    const imageSrc = this._config.image || '/local/idbuzz.webp';
    const title = this._config.title || 'ID. Buzz';

    // --- CARD ---
    const card = document.createElement('div');
    card.className = 'ha-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${title} — tap for details`);
    card.innerHTML = `
      <div class="hero__photo">
        <img class="hero__photo-img" src="${imageSrc}" alt="${title}" draggable="false">
        <div class="hero__photo-gradient"></div>
        <div class="hero__top-row">
          <div class="hero__name">
            <span class="hero__name-main">${title}</span>
            <span class="hero__name-sub" id="card-park-text">${this._heroSubInner(false)}</span>
          </div>
          <div class="hero__status-cluster">
            <span class="hero__status-item${doorsLocked ? ' hero__status-item--ok' : ''}" id="card-lock-icon" title="Lock status">${SVG.lock}</span>
            <span class="hero__status-item${allWindows ? ' hero__status-item--ok' : ''}" id="card-windows-icon" title="Windows">${SVG.window}</span>
            <span class="hero__status-item${secure ? ' hero__status-item--ok' : ''}" id="card-shield" title="Security">${SVG.shield}</span>
          </div>
        </div>
        <div class="hero__charge-overlay">
          <div class="hero__charge-left">
            <div class="hero__charge-num">
              <span class="hero__charge-pct" id="card-soc">${soc}</span>
              <span class="hero__charge-pct-sym">%</span>
              <span class="hero__charge-target" id="card-target">→ ${target}%</span>
            </div>
            <div class="hero__charge-charging" id="card-charging"${charging ? '' : ' hidden'}>${this._heroSubInner(true)}</div>
          </div>
          <div class="hero__range">
            <span class="hero__range-num" id="card-range">${range}</span>
            <span class="hero__range-unit">km</span>
          </div>
        </div>
        <div class="hero__bar${charging ? ' hero__bar--charging' : ''}" id="card-bar">
          <div class="hero__bar-fill" id="card-bar-fill" style="width:${soc}%">
            ${charging ? '<span class="hero__bar-sheen" aria-hidden="true"></span>' : ''}
          </div>
          <div class="hero__bar-target" id="card-bar-target" style="left:${target}%"></div>
        </div>
      </div>
      <div class="hero__footer">
        <div class="hero__metric">
          <span class="hero__metric-label">Odometer</span>
          <span class="hero__metric-val"><span id="card-odo">${odometer}</span><span class="hero__metric-unit"> km</span></span>
        </div>
        <div class="hero__metric-sep"></div>
        <div class="hero__metric">
          <span class="hero__metric-label">Cable</span>
          <span class="hero__metric-val ${charging ? 'hero__metric-val--ok' : 'hero__metric-val--muted'}" id="card-cable">${this._cableMetricInner(charging)}</span>
        </div>
        <div class="hero__metric-sep"></div>
        <div class="hero__metric">
          <span class="hero__metric-label">Climate</span>
          <span class="hero__metric-val hero__metric-val--muted" id="card-clim">${climState} · ${climTemp}°</span>
        </div>
        <div class="hero__metric-sep"></div>
        <div class="hero__metric">
          <span class="hero__metric-label">Service</span>
          <span class="hero__metric-val" id="card-service">${serviceDay} d</span>
        </div>
      </div>
    `;
    sr.appendChild(card);

    // --- POPUP ---
    const popup = this._buildPopup(soc, target, range, odometer, charging, imageSrc, title, secure, parkTextShort, climTemp, climState);
    sr.appendChild(popup);

    // --- Listeners ---
    card.addEventListener('click', () => this._openPopup());
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._openPopup(); }
    });

    this._attachPopupListeners();
    this._rendered = true;
  }

  _buildPopup(soc, target, range, odometer, charging, imageSrc, title, secure, parkTextShort, climTemp, climState) {
    const el = this._e;
    const v = (k) => this._val(k);
    const { min: targetMin, max: targetMax } = this._targetBounds();
    const charging_state = v('charging_state');
    const charging_power = this._fmtChargingPower() ?? '—';
    const time_to_target = v('charging_time_left');
    const ac_setting = v('charger_max_ac_setting');
    const batt_level = v('battery_power_level');
    //const cable_conn = v('charging_cable_connected');
    // const cable_lock = v('charging_cable_locked');
    const cable_connected = this._isOn('charging_cable_connected');
    const cableText = this._pop_cable_text();

    const doorLF = this._isClosed('door_closed_left_front');
    const doorLB = this._isClosed('door_closed_left_back');
    const doorRF = this._isClosed('door_closed_right_front');
    const doorRB = this._isClosed('door_closed_right_back');
    const allDoors = doorLF && doorLB && doorRF && doorRB;
    const doorsLocked = this._isClosed('doors_locked');
    const allWindows = this._allWindowsClosed();
    const trunkClosed = this._isClosed('trunk_closed');
    const trunkLocked = this._isClosed('trunk_locked');
    const hoodClosed = this._isClosed('hood_closed');
    const parkingLightOff = this._isParkingLightOff('parking_light');

    const climRemain = v('electric_remaining_climatisation_time');
    const extPower = this._externalPowerLabel();

    const hvMin = v('hv_battery_min_temperature');
    const hvMax = v('hv_battery_max_temperature');
    const hvTemp = (hvMin !== '—' && hvMax !== '—') ? `${parseFloat(hvMin) | 0} – ${parseFloat(hvMax) | 0} °C` : '—';
    const serviceDay = v('service_inspection_days');
    const { label: safetyLabel, ok: safetyOk } = this._safetyStatus();
    const connOnline = this._connectionLabel();
    const dailyBudget = v('daily_power_budget');
    const carType = v('car_type');

    const lockEntityState = this._config.lock_entity && this._hass?.states[this._config.lock_entity]?.state;
    const lockLabel = lockEntityState === 'locked' ? 'Unlock' : 'Lock';

    const chargingTagClass = charging ? 'pop-tag pop-tag--charging' : 'pop-tag pop-tag--muted';
    const chargingTag = `<span id="pop-charging-tag" class="${chargingTagClass}">${this._chargingTagInner(charging)}</span>`;
    const hint = soc >= target ? 'At or above target' : (charging ? `Charging · target ${target}%` : (cable_connected ? `Plugged in, not charging` : `Plug in to reach ${target}%`));
    const ttFmt = this._fmtTimeToTarget();
    const timeVal = ttFmt ? ttFmt : '<span class="pop-kv__v--muted">—</span>';
    const ok = (v) => v ? 'pop-check__dot--ok' : '';
    const dotClass = (v) => v ? 'pop-check__dot--ok' : 'pop-check__dot--warn';

    const pop = document.createElement('div');
    pop.className = 'pop-root';
    pop.id = 'pop-root';
    pop.setAttribute('aria-hidden', 'true');
    pop.innerHTML = `
      <div class="pop-backdrop" id="pop-backdrop"></div>
      <div class="pop-dialog" role="dialog" aria-label="${title} details">
        <div class="pop-photo">
          <img class="pop-photo__img" src="${imageSrc}" alt="${title}" draggable="false">
          <div class="pop-photo__grad"></div>
          <button class="pop-close" id="pop-close" aria-label="Close">${SVG.close}</button>
          <div class="pop-photo__title">
            <div class="pop-photo__name">${title}</div>
            <div class="pop-photo__sub" id="pop-photo-sub">${this._photoSubInner(charging)}</div>
          </div>
        </div>

        <div class="pop-body">

          <!-- Charging -->
          <section class="pop-section">
            <div class="pop-section__head">
              <span class="pop-section__title">Charge</span>
              ${chargingTag}
            </div>
            <div class="pop-charge">
              <div class="pop-charge__num">
                <span class="pop-charge__pct" id="pop-soc">${soc}</span>
                <span class="pop-charge__sym">%</span>
              </div>
              <div class="pop-charge__meta">
                <div class="pop-charge__target" id="pop-target-text">Target charge · <strong>${target}%</strong></div>
                <div class="pop-charge__hint" id="pop-hint">${hint}</div>
              </div>
            </div>
            <div class="pop-bar${charging ? ' pop-bar--charging' : ''}" id="pop-bar">
              <div class="pop-bar__fill" id="pop-bar-fill" style="width:${soc}%">
                ${charging ? '<span class="pop-bar__sheen" aria-hidden="true"></span>' : ''}
              </div>
              <div class="pop-bar__target" id="pop-bar-target"
                style="left:${target}%"
                role="slider" tabindex="0"
                aria-label="Target charge limit"
                aria-valuemin="${targetMin}" aria-valuemax="${targetMax}" aria-valuenow="${target}">
                <span class="pop-bar__target-grip"></span>
                <span class="pop-bar__target-label" id="pop-target-label">${target}%</span>
              </div>
            </div>
            <div class="pop-kv-grid">
              <div class="pop-kv"><span class="pop-kv__k">Charging state</span><span class="pop-kv__v" id="pop-charge-state">${charging_state}</span></div>
              <div class="pop-kv"><span class="pop-kv__k">Charging power</span><span class="pop-kv__v" id="pop-charge-power">${charging_power}</span></div>
              <div class="pop-kv"><span class="pop-kv__k">Time to target</span><span class="pop-kv__v" id="pop-time-target">${timeVal}</span></div>
              <div class="pop-kv"><span class="pop-kv__k">AC charge setting</span><span class="pop-kv__v" id="pop-ac-setting">${ac_setting}</span></div>
              <div class="pop-kv"><span class="pop-kv__k">Battery power level</span><span class="pop-kv__v" id="pop-batt-level">${batt_level}</span></div>
              <div class="pop-kv"><span class="pop-kv__k">Cable</span><span class="pop-kv__v pop-kv__v--muted" id="pop-cable">${this._pop_cable_text()}</span></div>
            </div>
          </section>

          <!-- Range & trip -->
          <section class="pop-section">
            <div class="pop-section__head"><span class="pop-section__title">Range &amp; trip</span></div>
            <div class="pop-stats">
              <div class="pop-stat">
                <span class="pop-stat__v"><span id="pop-range">${range}</span><span class="pop-stat__u"> km</span></span>
                <span class="pop-stat__k">Electric range</span>
              </div>
              <div class="pop-stat">
                <span class="pop-stat__v"><span id="pop-odo">${odometer}</span><span class="pop-stat__u"> km</span></span>
                <span class="pop-stat__k">Odometer</span>
              </div>
              <div class="pop-stat">
                <span class="pop-stat__v" id="pop-parked">${parkTextShort}</span>
                <span class="pop-stat__k">Parked</span>
              </div>
            </div>
          </section>

          <!-- Security -->
          <section class="pop-section">
            <div class="pop-section__head">
              <span class="pop-section__title">Security</span>
              <span class="pop-tag ${secure ? 'pop-tag--ok' : 'pop-tag--warn'}" id="pop-secure-tag">${secure ? 'All secure' : 'Check security'}</span>
            </div>
            <div class="pop-security">
              <div id="pop-car-svg"></div>
              <div class="pop-checks">
                <div class="pop-check">
                  <span class="pop-check__dot" id="sec-dot-doors"></span>
                  <span class="pop-check__label">All doors closed</span>
                  <span class="pop-check__hint" id="sec-hint-doors"></span>
                </div>
                <div class="pop-check">
                  <span class="pop-check__dot" id="sec-dot-windows"></span>
                  <span class="pop-check__label">All windows closed</span>
                </div>
                <div class="pop-check">
                  <span class="pop-check__dot" id="sec-dot-locked"></span>
                  <span class="pop-check__label">Doors locked</span>
                </div>
                <div class="pop-check">
                  <span class="pop-check__dot" id="sec-dot-trunk"></span>
                  <span class="pop-check__label">Trunk closed &amp; locked</span>
                </div>
                <div class="pop-check">
                  <span class="pop-check__dot" id="sec-dot-hood"></span>
                  <span class="pop-check__label">Hood closed</span>
                </div>
                <div class="pop-check">
                  <span class="pop-check__dot" id="sec-dot-parking"></span>
                  <span class="pop-check__label">Parking light off</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Climate -->
          <section class="pop-section">
            <div class="pop-section__head">
              <span class="pop-section__title">Climate</span>
              <span class="pop-tag pop-tag--muted" id="pop-clim-tag">${climState}</span>
            </div>
            <div class="pop-climate">
              <div class="pop-climate__big">
                <span class="pop-climate__t" id="pop-clim-temp">${climTemp}<span class="pop-climate__t-deg">°</span></span>
                <span class="pop-climate__t-label">target</span>
              </div>
              <div class="pop-climate__meta">
                <div class="pop-kv pop-kv--inline">
                  <span class="pop-kv__k">Remaining time</span>
                  <span class="pop-kv__v pop-kv__v--muted" id="pop-clim-remain">${climRemain}</span>
                </div>
                <div class="pop-kv pop-kv--inline">
                  <span class="pop-kv__k">External power</span>
                  <span class="pop-kv__v pop-kv__v--muted" id="pop-ext-power">${extPower}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Battery & service -->
          <section class="pop-section">
            <div class="pop-section__head"><span class="pop-section__title">Battery &amp; service</span></div>
            <div class="pop-kv-grid">
              <div class="pop-kv"><span class="pop-kv__k">HV battery temp</span><span class="pop-kv__v" id="pop-hv-temp">${hvTemp}</span></div>
              <div class="pop-kv"><span class="pop-kv__k">Service inspection</span><span class="pop-kv__v" id="pop-service">${serviceDay} days</span></div>
              <div class="pop-kv"><span class="pop-kv__k">Safety status</span><span class="pop-kv__v ${safetyOk ? 'pop-kv__v--ok' : ''}" id="pop-safety">${safetyLabel}</span></div>
              <div class="pop-kv"><span class="pop-kv__k">Connection</span><span class="pop-kv__v" id="pop-conn">${connOnline}</span></div>
              <div class="pop-kv"><span class="pop-kv__k">Daily power budget</span><span class="pop-kv__v" id="pop-budget">${dailyBudget}</span></div>
              <div class="pop-kv"><span class="pop-kv__k">Car type</span><span class="pop-kv__v" id="pop-cartype">${carType}</span></div>
            </div>
          </section>

        </div>

        <div class="pop-actions">
          <button class="pop-btn pop-btn--ghost" id="btn-lock"><span id="btn-lock-icon">${SVG.btnLock}</span><span id="btn-lock-label">${lockLabel}</span></button>
          <button class="pop-btn pop-btn--ghost" id="btn-climate"><span id="btn-climate-icon">${SVG.btnClimate}</span><span id="btn-climate-label">Climate</span></button>
          <button class="pop-btn pop-btn--primary" id="btn-charge"><span id="btn-charge-icon">${SVG.btnCharge}</span><span id="btn-charge-label">Start charge</span></button>
        </div>
      </div>
    `;
    return pop;
  }

  _carSVG(doors, windows, locked, trunk, hood) {
    const ok = 'var(--ok)';
    const warn = 'var(--warn)';
    const dc = doors ? ok : warn;
    const wc = windows ? ok : warn;
    const lc = locked ? ok : warn;
    const tc = trunk ? ok : warn;
    const hc = hood ? ok : warn;
    // theme-aware paints — green tints sourced from --ok with opacity, body fills from theme tokens.
    const greenPanel = 'color-mix(in oklch, var(--ok) 14%, transparent)';
    const greenDoor = 'color-mix(in oklch, var(--ok) 10%, transparent)';
    const greenHood = 'color-mix(in oklch, var(--ok) 8%, transparent)';
    const greenLock = 'color-mix(in oklch, var(--ok) 22%, transparent)';
    return `<svg class="pop-car-svg" viewBox="0 0 160 240" fill="none">
      <rect x="20" y="22" width="120" height="196" rx="34" style="fill: var(--car-body-fill); stroke: var(--car-body-stroke);"/>
      <rect x="30" y="60" width="100" height="120" rx="14" style="fill: var(--car-cabin-fill);"/>
      <path d="M40 60 Q80 50 120 60 L116 78 Q80 70 44 78 Z" stroke="${wc}" stroke-width="1.4" style="fill: ${greenPanel};"/>
      <path d="M40 180 Q80 190 120 180 L116 162 Q80 170 44 162 Z" stroke="${wc}" stroke-width="1.4" style="fill: ${greenPanel};"/>
      <rect x="28" y="92" width="14" height="40" rx="2" stroke="${dc}" stroke-width="1.4" style="fill: ${greenDoor};"/>
      <rect x="28" y="138" width="14" height="40" rx="2" stroke="${dc}" stroke-width="1.4" style="fill: ${greenDoor};"/>
      <rect x="118" y="92" width="14" height="40" rx="2" stroke="${dc}" stroke-width="1.4" style="fill: ${greenDoor};"/>
      <rect x="118" y="138" width="14" height="40" rx="2" stroke="${dc}" stroke-width="1.4" style="fill: ${greenDoor};"/>
      <rect x="44" y="28" width="72" height="10" rx="3" stroke="${hc}" stroke-width="1.4" style="fill: ${greenHood};"/>
      <rect x="44" y="202" width="72" height="10" rx="3" stroke="${tc}" stroke-width="1.4" style="fill: ${greenHood};"/>
      <circle cx="80" cy="120" r="13" stroke="${lc}" stroke-width="1.2" style="fill: ${greenLock};"/>
      <path d="M76 119v-3a4 4 0 018 0v3M73.5 119h13v8h-13z" stroke="${lc}" stroke-width="1.4" stroke-linejoin="round" fill="none"/>
    </svg>`;
  }

  _attachPopupListeners() {
    const sr = this.shadowRoot;

    const popRoot = sr.getElementById('pop-root');
    const closeBtn = sr.getElementById('pop-close');
    const backdrop = sr.getElementById('pop-backdrop');
    const bar = sr.getElementById('pop-bar');
    const barTarget = sr.getElementById('pop-bar-target');
    const btnLock = sr.getElementById('btn-lock');
    const btnClimate = sr.getElementById('btn-climate');
    const btnCharge = sr.getElementById('btn-charge');

    closeBtn?.addEventListener('click', () => this._closePopup());
    backdrop?.addEventListener('click', () => this._closePopup());

    // Esc key
    this._onKeyDown = (e) => { if (e.key === 'Escape' && this._popupOpen) this._closePopup(); };
    document.addEventListener('keydown', this._onKeyDown);

    // Draggable target
    if (bar && barTarget) {
      bar.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this._startDrag(e.clientX);
      });
      barTarget.addEventListener('keydown', (e) => {
        const { min, max, step } = this._targetBounds();
        let t = this._target();
        if (e.key === 'ArrowLeft') { e.preventDefault(); t = t - step; }
        else if (e.key === 'ArrowRight') { e.preventDefault(); t = t + step; }
        else if (e.key === 'Home') { e.preventDefault(); t = min; }
        else if (e.key === 'End') { e.preventDefault(); t = max; }
        else return;
        this._setTarget(this._snapTarget(t), true);
      });
    }

    // Action buttons
    btnLock?.addEventListener('click', () => {
      const eid = this._config.lock_entity;
      if (!eid || !this._hass) return;
      const isLocked = this._hass.states[eid]?.state === 'locked';
      this._runBtnAction('btn-lock', {
        pendingLabel: isLocked ? 'Unlocking…' : 'Locking…',
        successLabel: isLocked ? 'Unlocked' : 'Locked',
        idleIcon: SVG.btnLock,
        idleLabel: () => this._hass?.states[eid]?.state === 'locked' ? 'Unlock' : 'Lock',
        action: async () => {
          await this._hass.callService('lock', isLocked ? 'unlock' : 'lock', { entity_id: eid });
          await this._awaitEntityState(eid, s => s.state === (isLocked ? 'unlocked' : 'locked'), 10000);
        },
      });
    });
    btnClimate?.addEventListener('click', () => {
      const eid = this._config.climate_entity;
      if (!eid || !this._hass) return;
      this._runBtnAction('btn-climate', {
        pendingLabel: 'Starting…',
        successLabel: 'Running',
        idleIcon: SVG.btnClimate,
        idleLabel: () => 'Climate',
        action: async () => {
          await this._hass.callService('climate', 'turn_on', { entity_id: eid });
          await this._awaitEntityState(eid, s => s.state !== 'off', 10000);
        },
      });
    });
    btnCharge?.addEventListener('click', () => {
      const eid = this._config.charge_entity;
      if (!eid || !this._hass) return;
      this._runBtnAction('btn-charge', {
        pendingLabel: 'Starting…',
        successLabel: 'Charging',
        idleIcon: SVG.btnCharge,
        idleLabel: () => 'Start charge',
        action: async () => {
          await this._hass.callService('switch', 'turn_on', { entity_id: eid });
          await this._awaitEntityState(eid, s => s.state === 'on', 10000);
        },
      });
    });
  }

  _targetBounds() {
    const entityId = this._e('target_charge');
    const attrs = entityId ? this._hass?.states?.[entityId]?.attributes : null;
    const min = Number.isFinite(attrs?.min) ? attrs.min : 0;
    const max = Number.isFinite(attrs?.max) ? attrs.max : 100;
    const step = Number.isFinite(attrs?.step) && attrs.step > 0 ? attrs.step : 1;
    return { min, max, step };
  }

  _snapTarget(value) {
    const { min, max, step } = this._targetBounds();
    const clamped = Math.max(min, Math.min(max, value));
    return Math.round((clamped - min) / step) * step + min;
  }

  _startDrag(startX) {
    const bar = this.shadowRoot.getElementById('pop-bar');
    if (!bar) return;

    const onMove = (e) => {
      const x = e.clientX ?? e.touches?.[0]?.clientX;
      if (x == null) return;
      const rect = bar.getBoundingClientRect();
      const pct = ((x - rect.left) / rect.width) * 100;
      this._setTarget(this._snapTarget(pct), false);
    };

    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      // Push final value to HA if entity configured
      this._pushTargetToHA();
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);

    // Initial position
    const rect = bar.getBoundingClientRect();
    const pct = ((startX - rect.left) / rect.width) * 100;
    this._setTarget(this._snapTarget(pct), false);
  }

  _setTarget(value, pushToHA) {
    this._localTarget = value;
    // Patch DOM directly — no full re-render
    const sr = this.shadowRoot;
    const updateEl = (id, text) => { const el = sr.getElementById(id); if (el) el.textContent = text; };

    const barTarget = sr.getElementById('pop-bar-target');
    if (barTarget) {
      barTarget.style.left = `${value}%`;
      barTarget.setAttribute('aria-valuenow', value);
    }

    updateEl('pop-target-label', `${value}%`);

    const targetText = sr.getElementById('pop-target-text');
    if (targetText) targetText.innerHTML = `Target charge · <strong>${value}%</strong>`;

    const soc = this._soc();
    const hint = sr.getElementById('pop-hint');
    if (hint) hint.textContent = soc >= value ? 'At or above target' : (this._isCharging() ? `Charging · target ${value}%` : `Plug in to reach ${value}%`);

    // Card target arrow
    const cardTarget = sr.getElementById('card-target');
    if (cardTarget) cardTarget.textContent = `→ ${value}%`;
    const cardBarTarget = sr.getElementById('card-bar-target');
    if (cardBarTarget) cardBarTarget.style.left = `${value}%`;

    if (pushToHA) this._pushTargetToHA();
  }

  async _pushTargetToHA() {
    if (!this._hass || this._localTarget == null) return;
    const entityId = this._e('target_charge');
    if (!entityId) return;
    const domain = entityId.split('.')[0];
    if (domain !== 'number' && domain !== 'input_number') return;

    const value = this._localTarget;
    const token = (this._applyToken = (this._applyToken || 0) + 1);
    this._applyingTarget = value;
    this._renderApplyingState();

    // Keep the indicator visible for a minimum so the user perceives the apply,
    // even when the integration echoes state immediately (assumed_state: true).
    const minVisible = new Promise(r => setTimeout(r, 600));

    try {
      await this._hass.callService(domain, 'set_value', { entity_id: entityId, value });
      await this._awaitEntityState(entityId, s => parseFloat(s.state) === value, 30000);
      await minVisible;
      if (token !== this._applyToken) return; // superseded by a newer drag
      // Confirmed — drop local override so live state takes over
      this._localTarget = null;
    } catch {
      await minVisible;
      if (token !== this._applyToken) return;
      // Timed out or service rejected — keep _localTarget so the user still sees their attempt
    } finally {
      if (token === this._applyToken) {
        this._applyingTarget = null;
        this._renderApplyingState();
        // If we cleared _localTarget on success, refresh visible text/marker from live state
        if (this._localTarget == null) this._refreshTargetDisplay();
      }
    }
  }

  _renderApplyingState() {
    const sr = this.shadowRoot;
    if (!sr) return;
    const popTargetText = sr.getElementById('pop-target-text');
    const popBarTarget = sr.getElementById('pop-bar-target');
    if (this._applyingTarget != null) {
      if (popTargetText) popTargetText.innerHTML = `Applying · <strong>${this._applyingTarget}%</strong>…`;
      if (popBarTarget) popBarTarget.classList.add('pop-bar__target--applying');
    } else {
      if (popBarTarget) popBarTarget.classList.remove('pop-bar__target--applying');
      // popTargetText is restored by _refreshTargetDisplay or _patchValues
    }
  }

  _refreshTargetDisplay() {
    const sr = this.shadowRoot;
    if (!sr) return;
    const t = this._target();
    const popTargetText = sr.getElementById('pop-target-text');
    if (popTargetText) popTargetText.innerHTML = `Target charge · <strong>${t}%</strong>`;
    const popBarTarget = sr.getElementById('pop-bar-target');
    if (popBarTarget) { popBarTarget.style.left = `${t}%`; popBarTarget.setAttribute('aria-valuenow', t); }
    const popLabel = sr.getElementById('pop-target-label');
    if (popLabel) popLabel.textContent = `${t}%`;
    const cardTarget = sr.getElementById('card-target');
    if (cardTarget) cardTarget.textContent = `→ ${t}%`;
    const cardBarTarget = sr.getElementById('card-bar-target');
    if (cardBarTarget) cardBarTarget.style.left = `${t}%`;
  }

  _awaitEntityState(entityId, predicate, timeoutMs = 10000) {
    return new Promise((resolve, reject) => {
      const current = this._hass?.states?.[entityId];
      if (current && predicate(current)) { resolve(); return; }
      let unsubPromise = null;
      const timer = setTimeout(() => {
        unsubPromise?.then(fn => fn?.());
        reject(new Error('timeout'));
      }, timeoutMs);
      const onEvent = (event) => {
        if (event?.data?.entity_id !== entityId) return;
        const ns = event?.data?.new_state;
        if (ns && predicate(ns)) { clearTimeout(timer); unsubPromise?.then(fn => fn?.()); resolve(); }
      };
      try {
        unsubPromise = this._hass.connection.subscribeEvents(onEvent, 'state_changed');
      } catch {
        clearTimeout(timer);
        reject(new Error('subscribeEvents unavailable'));
      }
    });
  }

  _setBtnState(btn, iconEl, labelEl, state, icon, label) {
    btn.dataset.btnState = state;
    btn.disabled = state === 'pending';
    btn.classList.remove('pop-btn--pending', 'pop-btn--success');
    if (state === 'pending') btn.classList.add('pop-btn--pending');
    if (state === 'success') btn.classList.add('pop-btn--success');
    if (iconEl) iconEl.innerHTML = icon;
    if (labelEl) labelEl.textContent = label;
  }

  async _runBtnAction(btnId, opts) {
    const sr = this.shadowRoot;
    const btn = sr.getElementById(btnId);
    const iconEl = sr.getElementById(`${btnId}-icon`);
    const labelEl = sr.getElementById(`${btnId}-label`);
    if (!btn || btn.dataset.btnState === 'pending' || btn.dataset.btnState === 'success') return;
    this._setBtnState(btn, iconEl, labelEl, 'pending', SVG.spinner, opts.pendingLabel);
    try {
      await opts.action();
      this._setBtnState(btn, iconEl, labelEl, 'success', SVG.check, opts.successLabel);
      setTimeout(() => {
        if (btn.dataset.btnState === 'success') {
          this._setBtnState(btn, iconEl, labelEl, 'idle', opts.idleIcon, opts.idleLabel());
        }
      }, 1400);
    } catch {
      this._setBtnState(btn, iconEl, labelEl, 'idle', opts.idleIcon, opts.idleLabel());
    }
  }

  _openPopup() {
    this._popupOpen = true;
    const pop = this.shadowRoot.getElementById('pop-root');
    if (pop) {
      pop.classList.add('pop-root--open');
      pop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    this._patchValues(null);
  }

  _closePopup() {
    this._popupOpen = false;
    const pop = this.shadowRoot.getElementById('pop-root');
    if (pop) {
      pop.classList.remove('pop-root--open');
      pop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  _patchSecurity() {
    const sr = this.shadowRoot;
    if (!sr) return;

    const doorLF = this._isClosed('door_closed_left_front');
    const doorLB = this._isClosed('door_closed_left_back');
    const doorRF = this._isClosed('door_closed_right_front');
    const doorRB = this._isClosed('door_closed_right_back');
    const allDoors = doorLF && doorLB && doorRF && doorRB;
    const doorsLocked = this._isClosed('doors_locked');
    const allWindows = this._allWindowsClosed();
    const trunkOk = this._isClosed('trunk_closed') && this._isClosed('trunk_locked');
    const hoodClosed = this._isClosed('hood_closed');
    const parkingLightOff = this._isParkingLightOff('parking_light');
    const secure = allDoors && allWindows && doorsLocked && trunkOk && hoodClosed;

    const setDot = (id, ok) => {
      const el = sr.getElementById(id);
      if (el) el.className = 'pop-check__dot ' + (ok ? 'pop-check__dot--ok' : 'pop-check__dot--warn');
    };
    setDot('sec-dot-doors', allDoors);
    setDot('sec-dot-windows', allWindows);
    setDot('sec-dot-locked', doorsLocked);
    setDot('sec-dot-trunk', trunkOk);
    setDot('sec-dot-hood', hoodClosed);
    setDot('sec-dot-parking', parkingLightOff);

    const hint = sr.getElementById('sec-hint-doors');
    if (hint) hint.textContent = `${[doorLF, doorLB, doorRF, doorRB].filter(Boolean).length}/4`;

    const secureText = secure ? 'All secure' : 'Check security';

    const tag = sr.getElementById('pop-secure-tag');
    if (tag) {
      tag.textContent = secureText;
      tag.className = 'pop-tag ' + (secure ? 'pop-tag--ok' : 'pop-tag--warn');
    }

    const photoSecure = sr.getElementById('pop-photo-secure');
    if (photoSecure) photoSecure.textContent = secureText;

    const svgWrap = sr.getElementById('pop-car-svg');
    if (svgWrap) svgWrap.innerHTML = this._carSVG(allDoors, allWindows, doorsLocked, trunkOk, hoodClosed);
  }

  _pop_cable_text() {
    let cable_connection_status_text = this._cableText();
    let cable_lock_status = this._val('charging_cable_locked').toLowerCase();
    let cable_lock_status_text = cable_lock_status === "off" ? "locked" : "unlocked";
    return `${cable_connection_status_text} · ${cable_lock_status_text}`;
  }

  // Lightweight DOM patches when hass updates (avoids re-render flash)
  _patchValues(prev) {
    const sr = this.shadowRoot;
    if (!sr) return;

    const patch = (id, val) => {
      const el = sr.getElementById(id);
      if (el && el.textContent !== String(val)) el.textContent = val;
    };

    const soc = this._soc();
    const target = this._target();
    const range = this._num('electric_range') || this._num('battery_cruising_range') || '—';

    // Card values
    const cardSoc = sr.getElementById('card-soc');
    if (cardSoc) cardSoc.textContent = soc;
    const cardRange = sr.getElementById('card-range');
    if (cardRange) cardRange.textContent = range;
    const cardBarFill = sr.getElementById('card-bar-fill');
    if (cardBarFill) cardBarFill.style.width = `${soc}%`;
    const cardTarget = sr.getElementById('card-target');
    if (cardTarget) cardTarget.textContent = `→ ${target}%`;
    const cardBarTarget = sr.getElementById('card-bar-target');
    if (cardBarTarget) cardBarTarget.style.left = `${target}%`;
    patch('card-odo', this._val('odometer'));

    const isCharging = this._isCharging();
    const cable_connected = this._isOn('charging_cable_connected');
    const cardBar = sr.getElementById('card-bar');
    if (cardBar) cardBar.className = 'hero__bar' + (isCharging ? ' hero__bar--charging' : '');
    this._syncSheen(cardBarFill, isCharging, 'hero__bar-sheen');

    const cardSub = sr.getElementById('card-park-text');
    if (cardSub) {
      const subHTML = this._heroSubInner(false);
      if (cardSub.innerHTML !== subHTML) cardSub.innerHTML = subHTML;
    }

    const cardCharging = sr.getElementById('card-charging');
    if (cardCharging) {
      if (isCharging) {
        if (cardCharging.hasAttribute('hidden')) cardCharging.removeAttribute('hidden');
        const chHTML = this._heroSubInner(true);
        if (cardCharging.innerHTML !== chHTML) cardCharging.innerHTML = chHTML;
      } else if (!cardCharging.hasAttribute('hidden')) {
        cardCharging.setAttribute('hidden', '');
      }
    }

    const cardCable = sr.getElementById('card-cable');
    if (cardCable) {
      const cableClass = 'hero__metric-val ' + (isCharging ? 'hero__metric-val--ok' : 'hero__metric-val--muted');
      if (cardCable.className !== cableClass) cardCable.className = cableClass;
      const cableVal = this._cableMetricInner(isCharging);
      if (cardCable.textContent !== String(cableVal)) cardCable.textContent = cableVal;
    }

    const climState = this._climateState();
    const climTemp = this._climTemp();
    const cardClim = sr.getElementById('card-clim');
    if (cardClim) cardClim.textContent = `${climState} · ${climTemp}°`;
    const serviceDay = this._val('service_inspection_days');
    patch('card-service', `${serviceDay} d`);
    const cardLockIcon = sr.getElementById('card-lock-icon');
    if (cardLockIcon) cardLockIcon.classList.toggle('hero__status-item--ok', this._isClosed('doors_locked'));
    const cardWindowsIcon = sr.getElementById('card-windows-icon');
    if (cardWindowsIcon) cardWindowsIcon.classList.toggle('hero__status-item--ok', this._allWindowsClosed());
    const cardShield = sr.getElementById('card-shield');
    if (cardShield) cardShield.classList.toggle('hero__status-item--ok', this._secureOk());

    // Popup values (if open)
    if (this._popupOpen) {
      const popSoc = sr.getElementById('pop-soc');
      if (popSoc) popSoc.textContent = soc;
      const popBarFill = sr.getElementById('pop-bar-fill');
      if (popBarFill) popBarFill.style.width = `${soc}%`;
      const popBar = sr.getElementById('pop-bar');
      if (popBar) popBar.className = 'pop-bar' + (isCharging ? ' pop-bar--charging' : '');
      this._syncSheen(popBarFill, isCharging, 'pop-bar__sheen');
      // Only update target display if not locally overridden
      if (this._localTarget == null) {
        const popBarTarget = sr.getElementById('pop-bar-target');
        if (popBarTarget) { popBarTarget.style.left = `${target}%`; popBarTarget.setAttribute('aria-valuenow', target); }
        sr.getElementById('pop-target-label') && (sr.getElementById('pop-target-label').textContent = `${target}%`);
        const popTargetText = sr.getElementById('pop-target-text');
        if (popTargetText) popTargetText.innerHTML = `Target charge · <strong>${target}%</strong>`;
      }
      patch('pop-range', range);
      patch('pop-odo', this._val('odometer'));
      patch('pop-charge-state', this._val('charging_state'));
      patch('pop-charge-power', this._fmtChargingPower() ?? '—');
      patch('pop-time-target', this._fmtTimeToTarget() ?? '—');
      patch('pop-ac-setting', this._val('charger_max_ac_setting'));
      patch('pop-batt-level', this._val('battery_power_level'));
      patch('pop-cable', `${this._pop_cable_text()}`);
      patch('pop-clim-remain', this._val('electric_remaining_climatisation_time'));
      patch('pop-ext-power', this._externalPowerLabel());
      patch('pop-clim-tag', climState);
      const chargingTagEl = sr.getElementById('pop-charging-tag');
      if (chargingTagEl) {
        const tagClass = isCharging ? 'pop-tag pop-tag--charging' : 'pop-tag pop-tag--muted';
        if (chargingTagEl.className !== tagClass) chargingTagEl.className = tagClass;
        const tagHTML = this._chargingTagInner(isCharging);
        if (chargingTagEl.innerHTML !== tagHTML) chargingTagEl.innerHTML = tagHTML;
        if (chargingTagEl.style.cssText) chargingTagEl.style.cssText = '';
      }
      const photoSub = sr.getElementById('pop-photo-sub');
      if (photoSub) {
        const photoHTML = this._photoSubInner(isCharging);
        if (photoSub.innerHTML !== photoHTML) photoSub.innerHTML = photoHTML;
      }
      const hintEl = sr.getElementById('pop-hint');
      if (hintEl) {
        const hint = soc >= target ? 'At or above target' : (isCharging ? `Charging · target ${target}%` : (cable_connected ? `Plugged in, not charging` : `Plug in to reach ${target}%`));
        hintEl.textContent = hint;
      }
      this._patchSecurity();
      const popClimTemp = sr.getElementById('pop-clim-temp');
      if (popClimTemp) popClimTemp.innerHTML = `${climTemp}<span class="pop-climate__t-deg">°</span>`;
      const hvMin = this._val('hv_battery_min_temperature');
      const hvMax = this._val('hv_battery_max_temperature');
      patch('pop-hv-temp', (hvMin !== '—' && hvMax !== '—') ? `${parseFloat(hvMin) | 0} – ${parseFloat(hvMax) | 0} °C` : '—');
      patch('pop-service', `${serviceDay} days`);
      const safetyInfo = this._safetyStatus();
      patch('pop-safety', safetyInfo.label);
      const safetyEl = sr.getElementById('pop-safety');
      if (safetyEl) {
        const safetyClass = 'pop-kv__v' + (safetyInfo.ok ? ' pop-kv__v--ok' : '');
        if (safetyEl.className !== safetyClass) safetyEl.className = safetyClass;
      }
      patch('pop-conn', this._connectionLabel());
      patch('pop-budget', this._val('daily_power_budget'));
      patch('pop-cartype', this._val('car_type'));
      patch('pop-parked', this._parkingTextShort());
      const lockBtn = sr.getElementById('btn-lock');
      if (lockBtn?.dataset.btnState !== 'pending' && lockBtn?.dataset.btnState !== 'success') {
        const lockState = this._config.lock_entity && this._hass?.states[this._config.lock_entity]?.state;
        patch('btn-lock-label', lockState === 'locked' ? 'Unlock' : 'Lock');
      }
    }
  }

  disconnectedCallback() {
    if (this._onKeyDown) document.removeEventListener('keydown', this._onKeyDown);
  }
}

if (!customElements.get('id-buzz-card')) customElements.define('id-buzz-card', IDBuzzCard);

class IDBuzzCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = {};
    this._hass = null;
    this._form = null;
  }

  setConfig(config) {
    this._config = config;
    this._renderForm();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._form) this._form.hass = hass;
  }

  connectedCallback() {
    this._renderForm();
  }

  _renderForm() {
    if (!this._form) {
      const form = document.createElement('ha-form');
      form.computeLabel = (s) => s.label ?? s.name;
      form.addEventListener('value-changed', (ev) => {
        this._config = ev.detail.value;
        this.dispatchEvent(new CustomEvent('config-changed', {
          detail: { config: this._config },
          bubbles: true,
          composed: true,
        }));
      });
      this.shadowRoot.appendChild(form);
      this._form = form;
    }
    this._form.schema = [
      { name: 'title', label: 'Card title', selector: { text: {} } },
      { name: 'image', label: 'Image path (e.g. /local/idbuzz.webp)', selector: { text: {} } },
      { name: 'theme', label: 'Theme', selector: { select: { options: [
        { value: 'auto', label: 'Auto (follow Home Assistant)' },
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
      ] } } },
      { name: 'lock_entity', label: 'Lock entity (optional)', selector: { entity: { domain: 'lock' } } },
      { name: 'climate_entity', label: 'Climate entity (optional)', selector: { entity: { domain: 'climate' } } },
      { name: 'charge_entity', label: 'Start charge entity (optional)', selector: { entity: { domain: 'switch' } } },
    ];
    this._form.data = this._config;
    if (this._hass) this._form.hass = this._hass;
  }
}
if (!customElements.get('id-buzz-card-editor')) customElements.define('id-buzz-card-editor', IDBuzzCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'id-buzz-card',
  name: 'ID. Buzz Card',
  description: 'Hero card with photo, SoC, range, and detail popup for the Volkswagen ID. Buzz',
  preview: true,
  documentationURL: 'https://github.com/your-repo/id-buzz-card',
});
