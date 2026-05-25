// 表示整形のユーティリティ（価格・日付・予約番号）。

export const yen = (n: number): string => `¥${n.toLocaleString('ja-JP')}`;

const WEEK = ['日', '月', '火', '水', '木', '金', '土'];

export function formatDateJa(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${WEEK[d.getDay()]}）`;
}

/** デモ用の予約番号を発行（KK- + 時刻ベースの英数字） */
export function genReservationNo(): string {
  return `KK-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}
