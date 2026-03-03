'use client';
import { useMemo } from 'react';

export default function ParticleBackground() {
  const particles = useMemo(() => Array.from({ length: 35 }, (_, i) => ({ id: i, left: `${Math.random()*100}%`, delay: `${Math.random()*8}s`, duration: `${8+Math.random()*8}s` })), []);
  return <div className="fixed inset-0 -z-10 overflow-hidden">{particles.map(p => <span key={p.id} className="absolute h-1 w-1 rounded-full bg-cyan-300/80 animate-ping" style={{ left: p.left, top: '-10px', animationDelay: p.delay, animationDuration: p.duration }} />)}</div>;
}
