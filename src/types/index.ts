// アプリ全体で使う型定義を集約。
// データの形を最初に決めることで、コンポーネント間の受け渡しを型安全にする。

export type CourseId = 'kiri' | 'take' | 'matsu';
export type SelectableCourse = CourseId | 'alacarte' | '';
export type BadgeType = 'standard' | 'popular' | 'premium';

export interface Course {
  id: CourseId;
  rankJa: string;       // 桐 / 竹 / 松
  rankEn: string;       // Kiri Course など
  title: string;        // コースの一言コピー
  badge: string;        // Standard / 人気No.1 / Premium
  badgeType: BadgeType; // バッジの見た目の出し分け
  price: number;        // 1名あたり（税込・サービス料別）
  items: string[];      // 含まれる品
  imageName: string;    // assets/images の基底ファイル名（拡張子なし）
}

// 空席状況：○空席 / △残りわずか / ×満席 / 定休・対象外
export type Availability = 'ok' | 'few' | 'full' | 'off';

export interface CalendarDay {
  date: Date;
  iso: string;          // yyyy-mm-dd
  inMonth: boolean;     // 表示中の月に属するか
  isPast: boolean;      // 過去日（選択不可）
  availability: Availability;
}

export interface Customer {
  name: string;
  kana: string;
  tel: string;
  email: string;
  course: SelectableCourse;
  message: string;
  agree: boolean;
}

export interface ReservationData {
  date: string | null;  // yyyy-mm-dd
  guests: number | null;
  time: string | null;
  customer: Customer;
}
