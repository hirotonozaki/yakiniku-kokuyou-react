import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Customer, ReservationData } from '@/types';

// 予約の入力状態を複数ページ（予約→確認→完了）で共有するための Context。
// ページ遷移しても選択内容を保持し、確認画面でまとめて表示できる。

const emptyCustomer: Customer = {
  name: '', kana: '', tel: '', email: '', course: '', message: '', agree: false,
};

interface ReservationContextValue {
  data: ReservationData;
  setDate: (iso: string) => void;
  setGuests: (n: number) => void;
  setTime: (t: string) => void;
  setCustomer: (patch: Partial<Customer>) => void;
  reset: () => void;
  isComplete: boolean; // 必須項目がすべて埋まっているか
  progress: number;    // 入力進捗 0–100（%）
}

const ReservationContext = createContext<ReservationContextValue | null>(null);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ReservationData>({
    date: null, guests: null, time: null, customer: emptyCustomer,
  });

  const value = useMemo<ReservationContextValue>(() => {
    const c = data.customer;
    // 必須：日付・人数・時間・氏名・電話・メール・規約同意
    const checks = [
      !!data.date, !!data.guests, !!data.time,
      !!c.name.trim(), !!c.tel.trim(), !!c.email.trim(), c.agree,
    ];
    const done = checks.filter(Boolean).length;

    return {
      data,
      // 日付/人数を変えたら時間は選び直し（在庫条件が変わるため）
      setDate: (iso) => setData((p) => ({ ...p, date: iso, time: null })),
      setGuests: (n) => setData((p) => ({ ...p, guests: n, time: null })),
      setTime: (t) => setData((p) => ({ ...p, time: t })),
      setCustomer: (patch) =>
        setData((p) => ({ ...p, customer: { ...p.customer, ...patch } })),
      reset: () => setData({ date: null, guests: null, time: null, customer: emptyCustomer }),
      isComplete: checks.every(Boolean),
      progress: Math.round((done / checks.length) * 100),
    };
  }, [data]);

  return <ReservationContext.Provider value={value}>{children}</ReservationContext.Provider>;
}

export function useReservation(): ReservationContextValue {
  const ctx = useContext(ReservationContext);
  if (!ctx) throw new Error('useReservation は ReservationProvider 内で使用してください');
  return ctx;
}
