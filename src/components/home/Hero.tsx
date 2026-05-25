import { Button } from '@/components/ui/Button';
import { photoStyle } from '@/lib/images';
import styles from './Hero.module.scss';

// ファーストビュー。「何の店か」が一目で伝わるコピー＋ご予約への明快な導線。
// 背景写真が無い間は炭火を思わせるグラデーションで世界観を保つ。
const STATS = [
  { num: '8', unit: '年', label: 'Since 2016' },
  { num: '4', unit: '室', label: 'Private Room' },
  { num: 'A', unit: '5', label: 'Black Wagyu' },
];

export function Hero() {
  return (
    <section className={styles.hero} aria-label="メインビジュアル">
      <div
        className={styles.bg}
        style={photoStyle('hero-main', 'rgba(10,8,5,.92) 0%, rgba(10,8,5,.55) 40%, rgba(10,8,5,.2) 100%')}
        aria-hidden="true"
      />
      <div className={styles.atmosphere} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <p className={styles.label}>Premium Wagyu Yakiniku</p>
        <h1 className={styles.title}>
          <span className={styles.titleLine}>炭火が宿す</span>
          <span className={`${styles.titleLine} ${styles.accent}`}>最高の一品</span>
        </h1>
        <p className={styles.subtitle}>Ebisu, Tokyo — Est. 2016</p>
        <p className={styles.copy}>
          最高級の黒毛和牛を、熟練の技と炭火で。<br />
          接待、記念日、大切な方との会食に。<br />
          個室でゆったりと、極上のひとときをお過ごしください。
        </p>

        <div className={styles.actions}>
          <Button to="/reserve" arrow>ご予約はこちら</Button>
          <Button to="/courses" variant="outline">コースを見る</Button>
        </div>

        <div className={styles.stats}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statNum}>{s.num}<em>{s.unit}</em></span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
