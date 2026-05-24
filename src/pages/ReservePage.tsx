import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Customer } from '@/types';
import { useReservation } from '@/context/ReservationContext';
import { StepIndicator } from '@/components/reserve/StepIndicator';
import { Calendar } from '@/components/reserve/Calendar';
import { GuestSelector } from '@/components/reserve/GuestSelector';
import { TimeSelector } from '@/components/reserve/TimeSelector';
import { CustomerForm } from '@/components/reserve/CustomerForm';
import { ReservationSummary } from '@/components/reserve/ReservationSummary';
import styles from './ReservePage.module.scss';

// 各ステップを囲む共通カード（番号＋見出し）。
function StepCard({ num, title, children }: { num: string; title: string; children: ReactNode }) {
  return (
    <section className={styles.card}>
      <header className={styles.cardHead}>
        <span className={styles.cardNum}>{num}</span>
        <h2 className={styles.cardTitle}>{title}</h2>
      </header>
      {children}
    </section>
  );
}

// 予約ページ：日付→人数→時間→お客様情報を1画面で選び、確認画面へ進む。
// 「席選びの体験」として段階的に提示し、心理的負担を下げる設計。
export default function ReservePage() {
  const { data, setDate, setGuests, setTime, setCustomer, progress } = useReservation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>({});

  // 選択ステップ（日付・人数・時間）が揃えば確認へ進める
  const canProceed = !!data.date && !!data.guests && !!data.time;

  const validate = (): Partial<Record<keyof Customer, string>> => {
    const e: Partial<Record<keyof Customer, string>> = {};
    const c = data.customer;
    if (!c.name.trim()) e.name = 'お名前をご入力ください。';
    if (!c.tel.trim()) e.tel = '電話番号をご入力ください。';
    else if (!/^[0-9+\-\s()]{8,}$/.test(c.tel)) e.tel = '電話番号の形式をご確認ください。';
    if (!c.email.trim()) e.email = 'メールアドレスをご入力ください。';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) e.email = 'メールアドレスの形式をご確認ください。';
    if (!c.agree) e.agree = 'プライバシーポリシーへの同意が必要です。';
    return e;
  };

  const handleProceed = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0 && canProceed) {
      navigate('/reserve/confirm');
    } else {
      document.getElementById('customer')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.head}>
          <p className={styles.label}>Online Reservation</p>
          <h1 className={styles.title}>ご予約</h1>
          <span className={styles.rule} aria-hidden="true" />
          <p className={styles.lead}>
            ご希望の日時をお選びください。当日のご予約はお電話にて承ります。
          </p>
        </header>

        <StepIndicator data={data} />

        <div className={styles.board}>
          <div className={styles.main}>
            <StepCard num="01" title="ご来店日">
              <Calendar selected={data.date} onSelect={setDate} />
            </StepCard>
            <StepCard num="02" title="ご利用人数">
              <GuestSelector value={data.guests} onChange={setGuests} />
            </StepCard>
            <StepCard num="03" title="ご来店時刻">
              <TimeSelector date={data.date} guests={data.guests} value={data.time} onChange={setTime} />
            </StepCard>
            <div id="customer">
              <StepCard num="04" title="お客様情報">
                <CustomerForm customer={data.customer} errors={errors} onChange={setCustomer} />
              </StepCard>
            </div>
          </div>

          <ReservationSummary
            data={data}
            progress={progress}
            canProceed={canProceed}
            onProceed={handleProceed}
          />
        </div>
      </div>
    </div>
  );
}
