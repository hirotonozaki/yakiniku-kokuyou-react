import { useMemo } from 'react';
import { slotAvailability, timeSlotsFor } from '@/data/reservation';
import styles from './TimeSelector.module.scss';

// 来店時刻の選択。日付・人数が未選択なら案内を表示し、
// 選択済みなら曜日に応じた枠を出す（満席枠は選択不可）。
interface TimeSelectorProps {
  date: string | null;
  guests: number | null;
  value: string | null;
  onChange: (t: string) => void;
}

export function TimeSelector({ date, guests, value, onChange }: TimeSelectorProps) {
  const slots = useMemo(() => (date ? timeSlotsFor(date) : []), [date]);

  if (!date || !guests) {
    return <p className={styles.placeholder}>日付と人数をお選びください。</p>;
  }

  return (
    <div className={styles.grid} aria-live="polite">
      {slots.map((t) => {
        const av = slotAvailability(date, t);
        const full = av === 'full';
        return (
          <button
            key={t}
            type="button"
            disabled={full}
            aria-pressed={value === t}
            className={[
              styles.slot,
              value === t ? styles.active : '',
              av === 'few' ? styles.few : '',
            ].filter(Boolean).join(' ')}
            onClick={() => onChange(t)}
          >
            {t}
            {av === 'few' && <span className={styles.tag}>残り僅か</span>}
            {full && <span className={styles.tag}>満席</span>}
          </button>
        );
      })}
    </div>
  );
}
