"use client";
import { useEffect } from "react";
import { Gradient } from "./Gradient.jsx";
function MeshGradientBackground() {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
  }, []);
  return (
    <canvas
      id="gradient-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        '--gradient-color-1': '#e0ffff',
        '--gradient-color-2': '#e1ffff',
        '--gradient-color-3': '#bbdee3',
        '--gradient-color-4': '#e9f9fb',
      }}
    >
    </canvas>
  );
}
export default MeshGradientBackground;
