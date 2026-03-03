import { ButtonHTMLAttributes } from 'react';

export default function NeonButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`px-5 py-2 rounded-lg border border-cyan-300 text-cyan-200 hover:text-white hover:shadow-neon transition ${props.className || ''}`} />;
}
