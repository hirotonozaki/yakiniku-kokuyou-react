import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

// サイト共通フッター。ブランド・回遊リンク・店舗情報をまとめる。
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <div className={styles.brand}>
            <span className={styles.brandJa}>焼肉 黒耀</span>
            <span className={styles.brandEn}>Yakiniku Kokuyou</span>
          </div>
          <p className={styles.desc}>
            恵比寿の隠れ家で、最高級の黒毛和牛を。<br />
            接待・記念日・大切な方との会食に。
          </p>
          <a href="tel:0312345678" className={styles.tel}>03-1234-5678</a>
        </div>

        <nav aria-label="フッターナビゲーション">
          <p className={styles.colTitle}>Navigation</p>
          <ul className={styles.links}>
            <li><Link to="/" className={styles.link}>トップ</Link></li>
            <li><Link to="/courses" className={styles.link}>コース</Link></li>
            <li><Link to="/reserve" className={styles.link}>ご予約</Link></li>
          </ul>
        </nav>

        <div>
          <p className={styles.colTitle}>Information</p>
          <address className={styles.info}>
            〒150-0013<br />
            東京都渋谷区恵比寿1-1-1<br />
            黒耀ビル B1F<br /><br />
            月〜金｜17:00〜23:30<br />
            土　　｜16:00〜23:30<br />
            日・祝｜16:00〜22:30<br />
            完全個室／完全予約制
          </address>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <small>© 2026 焼肉 黒耀 All Rights Reserved.</small>
        <span className={styles.policy}>※ ポートフォリオ用の架空店舗デモです</span>
      </div>
    </footer>
  );
}
