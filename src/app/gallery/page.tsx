'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Section from '@/components/Section';
import GlassCard from '@/components/GlassCard';
import { listCollection } from '@/lib/firestore';
import { GalleryItem } from '@/types';

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  useEffect(() => { listCollection<GalleryItem>('gallery').then(setItems); }, []);
  return <Section><h1 className="text-3xl text-cyan-200 mb-4">Gallery</h1><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((img)=><GlassCard key={img.id}><div className="relative h-52"><Image src={img.imageUrl} alt={img.caption || 'gallery'} fill className="object-cover rounded" loading="lazy" /></div><p className="mt-2 text-sm">{img.category}</p></GlassCard>)}</div></Section>
}
