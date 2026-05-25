import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import styles from './SectionHeading.module.scss';

// 「英字ラベル → 金の罫線 → 和文見出し → 説明」の定型セクション見出し。
// 全セクションで同じ構造を使い回し、リズムと一貫性を保つ。
interface SectionHeadingProps {
  label: string;
  title: string;
  description?: ReactNode;
  align?: 'center' | 'left';
}

export function SectionHeading({ label, title, description, align = 'center' }: SectionHeadingProps) {
  return (
    <Reveal className={`${styles.head} ${align === 'left' ? styles.left : ''}`}>
      <p className={styles.label}>{label}</p>
      <span className={styles.rule} aria-hidden="true" />
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.desc}>{description}</p>}
    </Reveal>
  );
}
