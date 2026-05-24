import { useMemo, useState } from 'react';
import { buildMonthGrid } from '@/data/reservation';
import type { Availability } from '@/types';
import styles from './Calendar.module.scss';

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

// 来店日を選ぶカレンダー。過去日・満席日は選択不可、空席は色で示す。
// 操作できる期間は当月〜2か月先までに制限（実運用に近い受付窓）。
interface CalendarProps {
  selected: string | null;
  onSelect: (iso: string) => void;
}

export function Calendar({ selected, onSelect }: CalendarProps) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });

  const days = useMemo(() => buildMonthGrid(view.y, view.m), [view]);

  const canPrev =
    view.y > today.getFullYear() ||
    (view.y === today.getFullYear() && view.m > today.getMonth());
  const limit = new Date(today.getFullYear(), today.getMonth() + 2, 1);
  const canNext = new Date(view.y, view.m, 1) < limit;

  const move = (delta: number) =>
    setView((v) => {
      const d = new Date(v.y, v.m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });

  const dotClass: Record<Availability, string> = {
    ok: styles.dotOk,
    few: styles.dotFew,
    full: styles.dotFull,
    off: styles.dotOff,
  };

  return (
    <div className={styles.cal}>
      <div className={styles.nav}>
        <button type="button" className={styles.navBtn} onClick={() => move(-1)} disabled={!canPrev} aria-label="前の月">
          ‹
        </button>
        <span className={styles.title}>{view.y}年 {view.m + 1}月</span>
        <button type="button" className={styles.navBtn} onClick={() => move(1)} disabled={!canNext} aria-label="次の月">
          ›
        </button>
      </div>

      <div className={styles.weekdays} aria-hidden="true">
        {WEEKDAYS.map((w, i) => (
          <span key={w} className={i === 0 ? styles.sun : i === 6 ? styles.sat : ''}>{w}</span>
        ))}
      </div>

      <div className={styles.grid} role="grid" aria-label="日付を選択">
        {days.map((d) => {
          const selectable = d.inMonth && !d.isPast && d.availability !== 'full';
          const isSelected = selected === d.iso;
          return (
            <button
              key={d.iso}
              type="button"
              role="gridcell"
              disabled={!selectable}
              aria-pressed={isSelected}
              aria-label={`${d.date.getMonth() + 1}月${d.date.getDate()}日`}
              className={[
                styles.day,
                !d.inMonth ? styles.outside : '',
                isSelected ? styles.selected : '',
              ].filter(Boolean).join(' ')}
              onClick={() => selectable && onSelect(d.iso)}
            >
              <span className={styles.dayNum}>{d.date.getDate()}</span>
              {d.inMonth && !d.isPast && <span className={`${styles.dot} ${dotClass[d.availability]}`} />}
            </button>
          );
        })}
      </div>

      <p className={styles.legend}>
        <span><i className={`${styles.dot} ${styles.dotOk}`} />空席あり</span>
        <span><i className={`${styles.dot} ${styles.dotFew}`} />残りわずか</span>
        <span><i className={`${styles.dot} ${styles.dotFull}`} />満席</span>
      </p>
    </div>
  );
}
