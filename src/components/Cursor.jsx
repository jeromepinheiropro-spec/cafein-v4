import React, { useEffect, useRef } from "react";

/*
  Curseur custom V4 — version 100% impérative pour une fluidité parfaite :
  - aucun re-render React pendant le mouvement (transforms directes en rAF)
  - point vert qui suit exactement, anneau qui suit avec un lerp doux
  - grossit sur les éléments interactifs, affiche le label [data-cursor]
*/
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.body.classList.add("custom-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    const labelEl = labelRef.current;

    const mouse = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let ringSize = 36;
    let targetSize = 36;
    let scale = 1;
    let targetScale = 1;
    let currentLabel = null;
    let raf;

    function onMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const t = e.target.closest?.("[data-cursor]");
      const interactive = e.target.closest?.("a, button, [role='button'], input, textarea, [data-hover]");
      const label = t ? t.getAttribute("data-cursor") : null;

      if (label !== currentLabel) {
        currentLabel = label;
        if (label) {
          labelEl.textContent = label;
          labelEl.style.opacity = "1";
          ring.style.backgroundColor = "#1FCE8A";
        } else {
          labelEl.style.opacity = "0";
          ring.style.backgroundColor = "transparent";
        }
      }
      targetSize = label ? 84 : interactive ? 56 : 36;
    }

    function onDown() {
      targetScale = 0.8;
    }
    function onUp() {
      targetScale = 1;
    }

    function loop() {
      // le point suit exactement
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;

      // l'anneau suit avec un retard doux (lerp)
      ringPos.x += (mouse.x - ringPos.x) * 0.2;
      ringPos.y += (mouse.y - ringPos.y) * 0.2;
      ringSize += (targetSize - ringSize) * 0.18;
      scale += (targetScale - scale) * 0.25;

      ring.style.transform = `translate3d(${ringPos.x - ringSize / 2}px, ${ringPos.y - ringSize / 2}px, 0) scale(${scale})`;
      ring.style.width = `${ringSize}px`;
      ring.style.height = `${ringSize}px`;

      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });

    return () => {
      document.body.classList.remove("custom-cursor");
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      {/* Point central */}
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 z-[10000] pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div className="w-2 h-2 -ml-1 -mt-1 rounded-full bg-mint" />
      </div>

      {/* Anneau / bulle */}
      <div
        ref={ringRef}
        aria-hidden
        className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center rounded-full border-2 border-mint"
        style={{
          width: 36,
          height: 36,
          willChange: "transform, width, height",
          transition: "background-color 0.25s ease",
        }}
      >
        <span
          ref={labelRef}
          className="font-mono text-[10px] font-bold tracking-widest text-espresso uppercase text-center leading-tight px-1"
          style={{ opacity: 0, transition: "opacity 0.2s ease" }}
        />
      </div>
    </>
  );
}
