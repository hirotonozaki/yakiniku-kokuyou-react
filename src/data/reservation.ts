import type { Availability, CalendarDay } from '@/types';

export const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

/** 日付を yyyy-mm-dd へ（タイムゾーンずれを避けてローカル基準で生成） */
export function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// 営業時間に応じた来店枠を生成（曜日で開始・最終受付が変わる）
//   平日 17:00〜 / 土 16:00〜 / 日 16:00〜（最終受付は日のみ21時、他22時）
export function timeSlotsFor(iso: string): string[] {
  const day = new Date(`${iso}T00:00:00`).getDay(); // 0=日, 6=土
  const start = day === 0 || day === 6 ? 16 : 17;
  const lastEntry = day === 0 ? 21 : 22;
  const slots: string[] = [];
  for (let h = start; h <= lastEntry; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
    if (h < lastEntry) slots.push(`${String(h).padStart(2, '0')}:30`);
  }
  return slots;
}

// デモ用：日付から擬似的に空席状況を決める（同じ日付なら常に同じ結果＝再現性あり）
export function availabilityFor(date: Date): Availability {
  const seed = date.getFullYear() * 372 + (date.getMonth() + 1) * 31 + date.getDate();
  const r = seed % 10;
  if (r === 0) return 'full';
  if (r <= 3) return 'few';
  return 'ok';
}

// デモ用：時間枠ごとの空席（満席は選択不可にする）
export function slotAvailability(iso: string, time: string): Availability {
  const seed =
    iso.split('-').reduce((a, b) => a + Number(b), 0) + Number(time.replace(':', ''));
  const r = seed % 7;
  if (r === 0) return 'full';
  if (r <= 2) return 'few';
  return 'ok';
}

// 月のカレンダーグリッド（前後の月を含む 6 週 = 42 マス）
export function buildMonthGrid(year: number, month: number): CalendarDay[] {
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay();
  const gridStart = new Date(year, month, 1 - startWeekday);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days: CalendarDay[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    const inMonth = d.getMonth() === month;
    const isPast = d < today;
    days.push({
      date: d,
      iso: toISO(d),
      inMonth,
      isPast,
      availability: isPast ? 'off' : availabilityFor(d),
    });
  }
  return days;
}
