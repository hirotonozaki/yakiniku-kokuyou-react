import { GUEST_OPTIONS } from '@/data/reservation';
import styles from './GuestSelector.module.scss';

// 人数選択。タップしやすいボタン群（スマホでの指操作を優先）。
interface GuestSelectorProps {
  value: number | null;
  onChange: (n: number) => void;
}

export function GuestSelector({ value, onChange }: GuestSelectorProps) {
  return (
    <>
      <div className={styles.grid} role="radiogroup" aria-label="人数を選択">
        {GUEST_OPTIONS.map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            className={`${styles.btn} ${value === n ? styles.active : ''}`}
            onClick={() => onChange(n)}
          >
            {n}<span className={styles.unit}>名</span>
          </button>
        ))}
      </div>
      <p className={styles.hint}>※ 9名様以上はお電話にてご相談ください。</p>
    </>
  );
}
