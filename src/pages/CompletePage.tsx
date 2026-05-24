import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservation } from '@/context/ReservationContext';
import { Button } from '@/components/ui/Button';
import { formatDateJa, genReservationNo } from '@/lib/format';
import styles from './CompletePage.module.scss';

// 予約完了画面。予約番号を発行し、控えを表示する。
// 表示用にスナップショットを取ってから状態をリセットし、次回予約を新規から始められるようにする。
export default function CompletePage() {
  const { data, reset } = useReservation();
  const navigate = useNavigate();
  const [snapshot] = useState(data);
  const reservationNo = useMemo(() => genReservationNo(), []);

  useEffect(() => {
    if (!snapshot.date || !snapshot.time) {
      navigate('/', { replace: true });
      return;
    }
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!snapshot.date || !snapshot.time) return null;

  return (
    <div className={styles.page}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.check} aria-hidden="true">✓</div>
        <p className={styles.label}>Reservation Completed</p>
        <h1 className={styles.title}>ご予約を承りました</h1>
        <span className={styles.rule} aria-hidden="true" />
        <p className={styles.lead}>
          {snapshot.customer.name} 様、ありがとうございます。<br />
          2営業日以内に確認のご連絡をいたします。
        </p>

        <div className={styles.ticket}>
          <p className={styles.ticketLabel}>予約番号</p>
          <p className={styles.ticketNo}>{reservationNo}</p>
          <dl className={styles.mini}>
            <div><dt>ご来店日</dt><dd>{formatDateJa(snapshot.date)}</dd></div>
            <div><dt>お時間</dt><dd>{snapshot.time}</dd></div>
            <div><dt>人数</dt><dd>{snapshot.guests}名様</dd></div>
          </dl>
        </div>

        <p className={styles.note}>
          ※ 本サイトはポートフォリオ用のデモです。実際の予約は確定されません。
        </p>
        <Button to="/" arrow>トップへ戻る</Button>
      </div>
    </div>
  );
}
