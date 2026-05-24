import type { ReservationData } from '@/types';
import styles from './StepIndicator.module.scss';

// 予約の進み具合を 4 ステップで可視化。入力済みのステップに印を付ける。
const STEPS = ['日付', '人数', 'お時間', 'お客様情報'];

interface StepIndicatorProps {
  data: ReservationData;
}

export function StepIndicator({ data }: StepIndicatorProps) {
  const done = [
    !!data.date,
    !!data.guests,
    !!data.time,
    !!(data.customer.name.trim() && data.customer.tel.trim() && data.customer.email.trim()),
  ];

  return (
    <ol className={styles.steps} aria-label="予約の流れ">
      {STEPS.map((label, i) => (
        <li key={label} className={`${styles.item} ${done[i] ? styles.done : ''}`}>
          <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
          <span className={styles.label}>{label}</span>
        </li>
      ))}
    </ol>
  );
}
