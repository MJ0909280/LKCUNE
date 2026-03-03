'use client';
import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Section from '@/components/Section';
import GlassCard from '@/components/GlassCard';
import { getBySlug } from '@/lib/firestore';
import { DynamicPage } from '@/types';

export default function DynamicSlugPage() {
  const params = useParams<{ slug: string }>();
  const [page, setPage] = useState<DynamicPage | null | undefined>(undefined);
  useEffect(() => { getBySlug<DynamicPage>(params.slug).then(setPage); }, [params.slug]);
  if (page === undefined) return <Section><GlassCard>Loading...</GlassCard></Section>;
  if (!page || !page.published) return notFound();
  return <Section><GlassCard><h1 className="text-3xl text-cyan-200">{page.title}</h1><article className="prose prose-invert mt-3 whitespace-pre-wrap">{page.content}</article></GlassCard></Section>;
}
