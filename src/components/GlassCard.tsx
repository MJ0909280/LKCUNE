import { ReactNode } from 'react';

export default function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`glass neon-border p-5 ${className}`}>{children}</div>;
}
