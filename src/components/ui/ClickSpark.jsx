import { useRef, useEffect } from "react";
import { useTheme } from "next-themes";

const ClickSpark = ({
  sparkColor = "#fff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const startTimeRef = useRef(null);
  const { theme } = useTheme();
  
  const finalSparkColor = sparkColor === "#fff" && theme === "light" ? "#000" : sparkColor;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    let animationId;

    const easeFunc = (t) => {
      switch (easing) {
        case "linear":
          return t;
        case "ease-in":
          return t * t;
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default: // ease-out
          return t * (2 - t);
      }
    };

    const draw = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const easedProgress = easeFunc(progress);

        const distance = easedProgress * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - easedProgress);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = finalSparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = performance.now();

      for (let i = 0; i < sparkCount; i++) {
        const angle = (i / sparkCount) * 2 * Math.PI;
        sparksRef.current.push({
          x,
          y,
          angle,
          startTime: now,
        });
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easing, extraScale, finalSparkColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

export default ClickSpark;
