'use client';
import { useEffect, useState } from 'react';
import { listCollection } from '@/lib/firestore';
import { Announcement } from '@/types';

export default function AnnouncementBar() {
  const [items, setItems] = useState<Announcement[]>([]);
  useEffect(() => { listCollection<Announcement>('announcements').then((d)=> setItems(d.filter(i=>i.visible))); }, []);
  if (!items.length) return null;
  return <div className="bg-cyan-950/80 border-y border-cyan-700 p-2 text-center text-sm">{items[0].text}</div>;
}
