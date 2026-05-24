import type { Course, SelectableCourse } from '@/types';

// コース情報は1箇所のデータとして持ち、トップのプレビュー・コース一覧・
// 予約フォームのセレクトで再利用する（重複を避け、変更を一元化）。
export const COURSES: Course[] = [
  {
    id: 'kiri',
    rankJa: '桐',
    rankEn: 'Kiri Course',
    title: '黒耀の定番コース',
    badge: 'Standard',
    badgeType: 'standard',
    price: 12000,
    imageName: 'course-kiri',
    items: [
      '前菜盛り合わせ',
      '上タン塩（2枚）',
      '上カルビ・特選ロース（各2枚）',
      '季節のサラダ',
      'ガーリックライス・デザート',
    ],
  },
  {
    id: 'take',
    rankJa: '竹',
    rankEn: 'Take Course',
    title: '接待・記念日の定番',
    badge: '人気No.1',
    badgeType: 'popular',
    price: 18000,
    imageName: 'course-take',
    items: [
      '前菜盛り合わせ・特選ユッケ',
      '特上タン厚切り（2枚）',
      '大トロカルビ・特選ロース（各3枚）',
      'ザブトン（2枚）',
      '冷麺・ガーリックライス・デザート',
    ],
  },
  {
    id: 'matsu',
    rankJa: '松',
    rankEn: 'Matsu Course',
    title: '最上の贅沢を',
    badge: 'Premium',
    badgeType: 'premium',
    price: 28000,
    imageName: 'course-matsu',
    items: [
      '前菜三種・特選ユッケ・フォアグラ',
      'シャトーブリアン（80g）',
      '大トロカルビ・特選ロース 食べ放題',
      'ミスジ・ザブトン 食べ放題',
      '冷麺・石焼ガーリックライス・特製デザート',
    ],
  },
];

// 予約フォームのセレクト用（コース＋単品＋未定）
export const COURSE_OPTIONS: { value: SelectableCourse; label: string }[] = [
  { value: '', label: '未定・ご相談' },
  { value: 'kiri', label: '桐コース（12,000円〜）' },
  { value: 'take', label: '竹コース（18,000円〜）' },
  { value: 'matsu', label: '松コース（28,000円〜）' },
  { value: 'alacarte', label: '単品のみ' },
];

export function courseLabel(value: SelectableCourse): string {
  return COURSE_OPTIONS.find((o) => o.value === value)?.label ?? '未定';
}
