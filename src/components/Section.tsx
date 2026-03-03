'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function Section({ children }: { children: ReactNode }) {
  return <motion.section initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mx-auto mt-8 max-w-6xl px-4">{children}</motion.section>;
}
