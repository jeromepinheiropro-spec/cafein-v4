import React, { useEffect, useRef } from "react";

/*
  Bulles interactives (reprises du fond du hero V1) :
  - petits points menthe + cercles en contour qui dérivent doucement
  - elles s'écartent et s'illuminent au passage de la souris
  Canvas plein cadre, pointer-events: none, respecte prefers-reduced-motion.
*/
export default function Bubbles({ density = 46 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    let w, h, dpr, raf;
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const parts = Array.from({ length: density }, (_, i) => {
      const hollow = i % 4 === 0; // 1 bulle sur 4 est un cercle en contour
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: hollow ? 8 + Math.random() * 18 : 1.2 + Math.random() * 2.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(0.08 + Math.random() * 0.3),
        a: hollow ? 0.1 + Math.random() * 0.12 : 0.25 + Math.random() * 0.4,
        hollow,
        warm: i % 9 === 0, // quelques bulles caramel
      };
    });

    function onMove(e) {
      const rect = parent.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;

          // interaction souris : répulsion douce + éclat
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          const R = 150;
          if (d2 < R * R && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = ((R - d) / R) * 0.9;
            p.x += (dx / d) * f;
            p.y += (dy / d) * f;
          }

          // rebouclage
          if (p.y < -30) p.y = h + 30;
          if (p.x < -30) p.x = w + 30;
          if (p.x > w + 30) p.x = -30;
        }

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const near = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 220);
        const alpha = Math.min(1, p.a + near * 0.5);
        const color = p.warm ? "244,162,89" : "31,206,138";

        if (p.hollow) {
          ctx.strokeStyle = `rgba(${color},${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r + near * 4, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(${color},${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r + near * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
