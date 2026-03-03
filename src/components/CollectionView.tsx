'use client';
import { useEffect, useState } from 'react';
import Section from './Section';
import GlassCard from './GlassCard';
import { listCollection } from '@/lib/firestore';

export default function CollectionView({ title, collectionName, fields }: { title: string; collectionName: string; fields: string[] }) {
  const [items, setItems] = useState<Record<string, string>[]>([]);
  useEffect(() => { listCollection<Record<string, string>>(collectionName).then(setItems); }, [collectionName]);

  return <Section><h1 className="text-3xl font-bold text-cyan-200 mb-4">{title}</h1><div className="grid md:grid-cols-2 gap-4">{items.map((item, idx) => <GlassCard key={item.id || idx}>{fields.map((field) => <p key={field} className="mb-2"><span className="text-cyan-300">{field}: </span>{item[field]}</p>)}</GlassCard>)}{!items.length && <GlassCard>No data found.</GlassCard>}</div></Section>;
}
