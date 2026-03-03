'use client';
import { FormEvent, useEffect, useState } from 'react';
import AdminShell from './AdminShell';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { createDoc, listCollection, patchDoc, removeDoc, uploadImage } from '@/lib/firestore';
import { Announcement, BeltExam, BeltRegistration, Branch, DynamicPage, GalleryItem, Program } from '@/types';

const sections = [
  ['homeContent', ['heroTitle','heroSubtitle','heroCta','aboutSnippet']],
  ['programs', ['title','description','level']],
  ['branches', ['name','address','timings','mapLink']],
  ['announcements', ['text','color','visible']],
] as const;

export default function AdminDashboard() {
  const [data, setData] = useState<Record<string, any[]>>({});
  const [pages, setPages] = useState<DynamicPage[]>([]);
  const [exams, setExams] = useState<BeltExam[]>([]);
  const [regs, setRegs] = useState<BeltRegistration[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  const load = async () => {
    const entries = await Promise.all(sections.map(async ([n]) => [n, await listCollection(n)]));
    setData(Object.fromEntries(entries));
    setPages(await listCollection<DynamicPage>('pages'));
    setExams(await listCollection<BeltExam>('beltExams'));
    setRegs(await listCollection<BeltRegistration>('beltRegistrations'));
    setGallery(await listCollection<GalleryItem>('gallery'));
  };
  useEffect(() => { load(); }, []);

  const handleAdd = async (collectionName: string, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget).entries());
    await createDoc(collectionName, values);
    e.currentTarget.reset();
    load();
  };

  return <AdminShell>{() => <div className="space-y-8">
    {sections.map(([name, fields]) => <GlassCard key={name}><h2 className="text-xl text-cyan-200 capitalize">Manage {name}</h2>
      <form onSubmit={(e)=>handleAdd(name, e)} className="mt-3 grid md:grid-cols-4 gap-2">{fields.map(f=> <input key={f} name={f} placeholder={f} className="rounded bg-black/40 border border-cyan-700 p-2" />)}<NeonButton type="submit">Add</NeonButton></form>
      <div className="mt-4 space-y-2">{(data[name]||[]).map((it:any)=><div key={it.id} className="flex justify-between border-b border-cyan-900 pb-2"><span>{JSON.stringify(it)}</span><NeonButton onClick={()=>removeDoc(name,it.id).then(load)}>Delete</NeonButton></div>)}</div>
    </GlassCard>)}

    <GlassCard><h2 className="text-xl text-cyan-200">Dynamic Pages CMS</h2>
      <form onSubmit={(e)=>handleAdd('pages', e)} className="grid md:grid-cols-5 gap-2 mt-3"><input name="title" placeholder="Page title" className="rounded bg-black/40 border border-cyan-700 p-2"/><input name="slug" placeholder="slug" className="rounded bg-black/40 border border-cyan-700 p-2"/><textarea name="content" placeholder="rich text content" className="rounded bg-black/40 border border-cyan-700 p-2 md:col-span-2"/><select name="published" className="rounded bg-black/40 border border-cyan-700 p-2"><option value="true">Publish</option><option value="false">Unpublish</option></select><NeonButton type="submit" className="md:col-span-5">Create Page</NeonButton></form>
      <div className="mt-3 space-y-2">{pages.map(p=><div key={p.id} className="flex flex-wrap items-center gap-2 border-b border-cyan-900 pb-2"><span>{p.title} /{p.slug}</span><NeonButton onClick={()=>patchDoc('pages', p.id!, { published: !p.published }).then(load)}>{p.published?'Unpublish':'Publish'}</NeonButton><NeonButton onClick={()=>removeDoc('pages', p.id!).then(load)}>Delete</NeonButton></div>)}</div>
    </GlassCard>

    <GlassCard><h2 className="text-xl text-cyan-200">Belt Exam Management</h2>
      <form onSubmit={(e)=>handleAdd('beltExams', e)} className="grid md:grid-cols-4 gap-2 mt-3"><input name="title" placeholder="Exam title" className="rounded bg-black/40 border border-cyan-700 p-2"/><input name="examDate" placeholder="Exam date" className="rounded bg-black/40 border border-cyan-700 p-2"/><input name="description" placeholder="Description" className="rounded bg-black/40 border border-cyan-700 p-2"/><select name="visible" className="rounded bg-black/40 border border-cyan-700 p-2"><option value="true">Visible</option><option value="false">Hidden</option></select><NeonButton type="submit" className="md:col-span-4">Create Exam</NeonButton></form>
      <div className="mt-3 space-y-2">{exams.map(ex=><div key={ex.id} className="flex gap-2 flex-wrap items-center border-b border-cyan-900 pb-2"><span>{ex.title} ({ex.examDate})</span><NeonButton onClick={()=>patchDoc('beltExams', ex.id!, { visible: !ex.visible }).then(load)}>{ex.visible?'Disable':'Enable'}</NeonButton><NeonButton onClick={()=>removeDoc('beltExams', ex.id!).then(load)}>Delete</NeonButton></div>)}</div>
    </GlassCard>

    <GlassCard><h2 className="text-xl text-cyan-200">Belt Registrations</h2><div className="space-y-2 mt-3">{regs.map(r=><div key={r.id} className="border-b border-cyan-900 pb-2 flex flex-wrap gap-2 items-center"><span>{r.studentName} - {r.applyingBelt} - {r.feeStatus}</span><NeonButton onClick={()=>patchDoc('beltRegistrations', r.id!, { feeStatus: r.feeStatus === 'Paid' ? 'Not Paid' : 'Paid' }).then(load)}>Toggle Fee</NeonButton><NeonButton onClick={()=>removeDoc('beltRegistrations', r.id!).then(load)}>Delete</NeonButton></div>)}</div></GlassCard>

    <GlassCard><h2 className="text-xl text-cyan-200">Gallery Manager</h2>
      <form onSubmit={async (e)=>{e.preventDefault(); const fd = new FormData(e.currentTarget); const file = fd.get('image') as File; const url = await uploadImage(file, 'gallery'); await createDoc('gallery', { imageUrl: url, category: fd.get('category') }); e.currentTarget.reset(); load();}} className="grid md:grid-cols-3 gap-2 mt-3"><input type="file" name="image" accept="image/*" required className="rounded bg-black/40 border border-cyan-700 p-2"/><input name="category" placeholder="category" className="rounded bg-black/40 border border-cyan-700 p-2"/><NeonButton type="submit">Upload</NeonButton></form>
      <div className="mt-3 space-y-2">{gallery.map(g=><div key={g.id} className="flex justify-between border-b border-cyan-900 pb-2"><span>{g.category}</span><NeonButton onClick={()=>removeDoc('gallery', g.id!).then(load)}>Delete</NeonButton></div>)}</div>
    </GlassCard>
  </div>}</AdminShell>;
}
