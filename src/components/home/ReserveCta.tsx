import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { photoStyle } from '@/lib/images';
import styles from './ReserveCta.module.scss';

// ページ下部の予約導線。電話とオンラインの2経路を併置し、
// 検討段階の違うユーザーを取りこぼさない（2階層CTA設計）。
export function ReserveCta() {
  return (
    <section className={styles.cta} id="reserve">
      <div className={styles.bg} style={photoStyle('reserve-bg', 'rgba(10,8,5,.7), rgba(10,8,5,.8)')} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <Reveal>
          <p className={styles.label}>Reservation</p>
          <h2 className={styles.title}>ご予約・お問い合わせ</h2>
          <span className={styles.rule} aria-hidden="true" />
          <p className={styles.copy}>
            A5黒毛和牛と完全個室で過ごす、特別な時間。<br />
            接待・記念日・大切な会食にご利用ください。
          </p>
        </Reveal>

        <Reveal delay={120} className={styles.cards}>
          <div className={styles.card}>
            <span className={styles.cardLabel}>Tel Reservation</span>
            <h3 className={styles.cardTitle}>お電話でのご予約</h3>
            <p className={styles.cardText}>当日のご予約はお電話にて承ります。</p>
            <a href="tel:0312345678" className={styles.tel}>03-1234-5678</a>
            <p className={styles.hours}>平日 17:00〜23:00 / 土日祝 16:00〜</p>
          </div>

          <div className={`${styles.card} ${styles.cardGold}`}>
            <span className={styles.cardLabel}>Online Reservation</span>
            <h3 className={styles.cardTitle}>オンラインご予約</h3>
            <p className={styles.cardText}>ご希望の日時・人数を選んで、24時間いつでも。</p>
            <Button to="/reserve" arrow className={styles.cardBtn}>オンラインで予約する</Button>
            <p className={styles.note}>2営業日以内に確認のご連絡をいたします</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
