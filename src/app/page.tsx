'use client';
import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import GlassCard from '@/components/GlassCard';
import { listCollection } from '@/lib/firestore';
import { HomeContent, Program } from '@/types';

const fallback = { heroTitle: 'Forge Discipline. Ignite Power.', heroSubtitle: 'Future-ready karate training in Pune.', heroCta: 'Join Trial Session', aboutSnippet: 'Traditional values + modern coaching.' };
export default function HomePage() {
  const [home, setHome] = useState<HomeContent>(fallback);
  const [programs, setPrograms] = useState<Program[]>([]);
  useEffect(() => { listCollection<HomeContent>('homeContent').then(d=>d[0]&&setHome(d[0])); listCollection<Program>('programs').then(setPrograms); }, []);
  return <>
    <Hero title={home.heroTitle} subtitle={home.heroSubtitle} cta={home.heroCta} />
    <Section><GlassCard><h2 className="text-2xl text-cyan-200">Why Lions Karate</h2><p className="mt-3 text-white/90">{home.aboutSnippet}</p></GlassCard></Section>
    <Section><div className="grid gap-4 md:grid-cols-3">{programs.slice(0,3).map(p=> <GlassCard key={p.id}><h3 className="text-cyan-100 font-semibold">{p.title}</h3><p className="text-sm mt-2">{p.description}</p></GlassCard>)}</div></Section>
  </>;
}
