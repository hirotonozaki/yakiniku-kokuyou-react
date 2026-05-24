import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservation } from '@/context/ReservationContext';
import { Button } from '@/components/ui/Button';
import { formatDateJa } from '@/lib/format';
import { courseLabel } from '@/data/courses';
import styles from './ConfirmPage.module.scss';

// 予約内容の確認画面。送信前に全項目を一覧で見せ、ミスを防ぐ。
export default function ConfirmPage() {
  const { data } = useReservation();
  const navigate = useNavigate();

  // 直接アクセスや未入力で来た場合は予約画面へ戻す（状態が無いと表示できないため）
  useEffect(() => {
    if (!data.date || !data.guests || !data.time || !data.customer.name) {
      navigate('/reserve', { replace: true });
    }
  }, [data, navigate]);

  if (!data.date || !data.guests || !data.time) return null;

  const c = data.customer;
  const rows: { k: string; v: string }[] = [
    { k: 'ご来店日', v: formatDateJa(data.date) },
    { k: 'ご利用人数', v: `${data.guests}名様` },
    { k: 'ご来店時刻', v: data.time },
    { k: 'ご希望コース', v: courseLabel(c.course) },
    { k: 'お名前', v: c.name },
    { k: 'フリガナ', v: c.kana || '—' },
    { k: '電話番号', v: c.tel },
    { k: 'メールアドレス', v: c.email },
    { k: 'ご要望', v: c.message || '—' },
  ];

  return (
    <div className={styles.page}>
      <div className={`container ${styles.inner}`}>
        <header className={styles.head}>
          <p className={styles.label}>Confirmation</p>
          <h1 className={styles.title}>ご予約内容の確認</h1>
          <span className={styles.rule} aria-hidden="true" />
          <p className={styles.lead}>
            以下の内容でお申し込みします。よろしければ「この内容で予約する」を押してください。
          </p>
        </header>

        <dl className={styles.list}>
          {rows.map((r) => (
            <div key={r.k} className={styles.row}>
              <dt>{r.k}</dt>
              <dd>{r.v}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.actions}>
          <Button to="/reserve" variant="outline">戻って修正する</Button>
          <Button onClick={() => navigate('/reserve/complete')} arrow>この内容で予約する</Button>
        </div>
      </div>
    </div>
  );
}
