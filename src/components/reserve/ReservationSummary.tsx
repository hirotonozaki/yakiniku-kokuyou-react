import type { ReservationData } from '@/types';
import { Button } from '@/components/ui/Button';
import { formatDateJa } from '@/lib/format';
import { courseLabel } from '@/data/courses';
import styles from './ReservationSummary.module.scss';

// 選択内容をまとめて表示する sticky パネル。
// 入力進捗バーで「あとどれくらいか」を可視化し、確認画面への導線を常に視界に置く。
interface ReservationSummaryProps {
  data: ReservationData;
  progress: number;
  canProceed: boolean;
  onProceed: () => void;
}

export function ReservationSummary({ data, progress, canProceed, onProceed }: ReservationSummaryProps) {
  const rows: { key: string; value: string | null }[] = [
    { key: 'ご来店日', value: data.date ? formatDateJa(data.date) : null },
    { key: 'ご利用人数', value: data.guests ? `${data.guests}名様` : null },
    { key: 'ご来店時刻', value: data.time },
    { key: 'コース', value: data.customer.course ? courseLabel(data.customer.course) : null },
  ];

  return (
    <aside className={styles.summary} aria-label="ご予約内容">
      <div className={styles.inner}>
        <p className={styles.label}>Your Reservation</p>
        <h3 className={styles.title}>ご予約内容</h3>
        <span className={styles.rule} aria-hidden="true" />

        <dl className={styles.list}>
          {rows.map((r) => (
            <div key={r.key} className={styles.rowItem}>
              <dt>{r.key}</dt>
              <dd className={r.value ? '' : styles.empty}>{r.value ?? '未選択'}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.progress} aria-hidden="true">
          <div className={styles.bar} style={{ width: `${progress}%` }} />
        </div>
        <p className={styles.progressText}>入力進捗 {progress}%</p>

        <Button onClick={onProceed} disabled={!canProceed} arrow className={styles.submit}>
          確認画面へ
        </Button>
        <p className={styles.note}>確認画面で内容をご確認のうえ、お申し込みください。</p>
      </div>
    </aside>
  );
}
