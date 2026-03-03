'use client';
import { FormEvent, useEffect, useState } from 'react';
import Section from '@/components/Section';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { createDoc, listCollection } from '@/lib/firestore';
import { BeltExam } from '@/types';

const beltOptions = ['White','Yellow','Orange','Green','Blue','Purple','Red','Brown','Brown 1+2','Brown 2+3'];

export default function BeltExamPage() {
  const [exam, setExam] = useState<BeltExam | null>(null);
  const [ok, setOk] = useState('');
  useEffect(() => { listCollection<BeltExam>('beltExams').then(d => setExam(d.find(e=>e.visible) || null)); }, []);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    await createDoc('beltRegistrations', {
      studentName: f.get('studentName'), currentBelt: f.get('currentBelt'), applyingBelt: f.get('applyingBelt'),
      parentName: f.get('parentName'), schoolName: f.get('schoolName'), branchName: f.get('branchName'), phoneNumber: f.get('phoneNumber'), feeStatus: 'Not Paid'
    });
    setOk('Registration submitted successfully.');
    e.currentTarget.reset();
  };

  if (!exam) return <Section><GlassCard>Belt exam registrations are currently disabled.</GlassCard></Section>;

  return <Section><GlassCard><h1 className="text-3xl text-cyan-200">{exam.title}</h1><p>{exam.examDate}</p><p className="mt-2">{exam.description}</p>
    <form onSubmit={submit} className="mt-4 grid gap-3 md:grid-cols-2">
      {['studentName','currentBelt','parentName','schoolName','branchName','phoneNumber'].map((n)=><input key={n} required name={n} placeholder={n} className="rounded bg-black/40 border border-cyan-700 p-2" />)}
      <select name="applyingBelt" required className="rounded bg-black/40 border border-cyan-700 p-2">{beltOptions.map(b=><option key={b}>{b}</option>)}</select>
      <NeonButton type="submit" className="md:col-span-2">Submit Registration</NeonButton>
      {ok && <p className="text-green-400 md:col-span-2">{ok}</p>}
    </form>
  </GlassCard></Section>;
}
