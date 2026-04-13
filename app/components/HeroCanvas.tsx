"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const w = window.innerWidth;
    const h = window.innerHeight;
    const camera = new THREE.OrthographicCamera(-w / 2, w / 2, h / 2, -h / 2, 1, 1000);
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particleCount = 250;
    const colors = [
      { r: 0.78, g: 0.41, b: 0.30 },
      { r: 0.91, g: 0.84, b: 0.77 },
      { r: 0.96, g: 0.93, b: 0.89 },
      { r: 0.78, g: 0.66, b: 0.42 },
    ];

    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const particleColors = new Float32Array(particleCount * 3);

    interface ParticleData {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      phaseX: number;
      phaseY: number;
      freqX: number;
      freqY: number;
      ampX: number;
      ampY: number;
    }

    const particleData: ParticleData[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * w;
      const y = (Math.random() - 0.5) * h;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = 0;
      sizes[i] = 1 + Math.random() * 3;
      const col = colors[Math.floor(Math.random() * colors.length)];
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
      particleData.push({
        x, y, baseX: x, baseY: y,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        freqX: 0.0005 + Math.random() * 0.001,
        freqY: 0.0005 + Math.random() * 0.001,
        ampX: 20 + Math.random() * 40,
        ampY: 20 + Math.random() * 40,
      });
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const material = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * 2.0;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.2, d) * 0.6;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const maxLines = particleCount * 6;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    lineGeometry.setDrawRange(0, 0);

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.02;
      mouseY = -(e.clientY - window.innerHeight / 2) * 0.02;
    };
    document.addEventListener("mousemove", onMouseMove);

    const threshold = 120;
    let time = 0;
    let animId: number;

    function animate() {
      animId = requestAnimationFrame(animate);
      time++;

      let lineIndex = 0;
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const linePosAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
      const lineColAttr = lineGeometry.attributes.color as THREE.BufferAttribute;

      for (let i = 0; i < particleCount; i++) {
        const p = particleData[i];
        const newX = p.baseX + Math.sin(time * p.freqX + p.phaseX) * p.ampX + mouseX;
        const newY = p.baseY + Math.cos(time * p.freqY + p.phaseY) * p.ampY + mouseY;
        posAttr.array[i * 3] = newX;
        posAttr.array[i * 3 + 1] = newY;
        p.x = newX;
        p.y = newY;
      }
      posAttr.needsUpdate = true;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particleData[i].x - particleData[j].x;
          const dy = particleData[i].y - particleData[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < threshold && lineIndex < maxLines) {
            const idx = lineIndex * 6;
            linePosAttr.array[idx] = particleData[i].x;
            linePosAttr.array[idx + 1] = particleData[i].y;
            linePosAttr.array[idx + 2] = 0;
            linePosAttr.array[idx + 3] = particleData[j].x;
            linePosAttr.array[idx + 4] = particleData[j].y;
            linePosAttr.array[idx + 5] = 0;
            const alpha = 1 - dist / threshold;
            lineColAttr.array[idx] = 0.78 * alpha;
            lineColAttr.array[idx + 1] = 0.55 * alpha;
            lineColAttr.array[idx + 2] = 0.38 * alpha;
            lineColAttr.array[idx + 3] = 0.78 * alpha;
            lineColAttr.array[idx + 4] = 0.55 * alpha;
            lineColAttr.array[idx + 5] = 0.38 * alpha;
            lineIndex++;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex * 2);
      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;
      renderer.render(scene, camera);
    }

    animate();

    const onResize = () => {
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      camera.left = -nw / 2;
      camera.right = nw / 2;
      camera.top = nh / 2;
      camera.bottom = -nh / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="hero-canvas" />;
}