'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import NeonButton from './NeonButton';

export default function Hero({ title, subtitle, cta }: { title: string; subtitle: string; cta: string }) {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!heroRef.current) return;
    gsap.fromTo(heroRef.current.querySelectorAll('.animate-gsap'), { y: 45, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.18, ease: 'power3.out' });
  }, []);

  return <section ref={heroRef} className="glass mx-auto mt-10 max-w-5xl p-10 text-center"><h1 className="animate-gsap text-4xl font-bold text-cyan-200 md:text-6xl">{title}</h1><p className="animate-gsap mt-4 text-lg text-cyan-100/90">{subtitle}</p><NeonButton className="animate-gsap mt-6">{cta}</NeonButton></section>;
}
