import type { ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import styles from './Reveal.module.scss';

// 子要素をスクロールで下からフェードイン表示するラッパー。
// delay で時間差をつけ、カード等を順番に出して上質さを演出する。
interface RevealProps {
  children: ReactNode;
  delay?: number; // ms
  className?: string;
}

export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${inView ? styles.on : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
