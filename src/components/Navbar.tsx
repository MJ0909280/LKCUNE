'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = ['/', '/about', '/programs', '/branches', '/gallery', '/belt-exam', '/announcements', '/contact'];
export default function Navbar() {
  const pathname = usePathname();
  return <nav className="sticky top-0 z-50 glass mx-4 mt-4 p-3"><div className="flex flex-wrap gap-4 items-center justify-between"><Link href="/" className="font-bold text-cyan-300">LIONS KARATE CLUB PUNE</Link><div className="flex flex-wrap gap-3">{links.map((href) => <Link key={href} href={href} className={pathname===href? 'text-cyan-300':'text-white/80 hover:text-cyan-200'}>{href === '/' ? 'home' : href.replace('/', '')}</Link>)}<Link href="/admin" className="text-red-300">admin</Link></div></div></nav>;
}
