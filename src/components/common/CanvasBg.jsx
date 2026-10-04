import React, { useEffect, useRef } from 'react';

export default function CanvasBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      drawGrid();
    };

    window.addEventListener('resize', handleResize);

    const drawGrid = () => {
      ctx.clearRect(0, 0, width, height);

      const gridSize = 40;
      ctx.strokeStyle = 'rgba(45, 53, 69, 0.4)';
      ctx.lineWidth = 1;

      // Draw faint technical grid lines
      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Precision titanium crosshair marks
      const majorStep = gridSize * 5;
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.2)';
      ctx.lineWidth = 1;
      const arm = 3.5;

      for (let x = majorStep; x < width; x += majorStep) {
        for (let y = majorStep; y < height; y += majorStep) {
          ctx.beginPath();
          ctx.moveTo(x - arm, y);
          ctx.lineTo(x + arm, y);
          ctx.moveTo(x, y - arm);
          ctx.lineTo(x, y + arm);
          ctx.stroke();
        }
      }
    };

    drawGrid();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-35"
      aria-hidden="true"
    />
  );
}
