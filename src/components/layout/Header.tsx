import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import styles from './Header.module.scss';

const NAV = [
  { to: '/', label: 'トップ', end: true },
  { to: '/courses', label: 'コース' },
  { to: '/reserve', label: 'ご予約' },
];

// 固定ヘッダー。スクロールで背景を出し、モバイルではドロワーを開閉する。
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // スクロール量でヘッダー背景の有無を切り替え
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ページ遷移したらドロワーを閉じる
  useEffect(() => setOpen(false), [location.pathname]);

  // ドロワー表示中は背面スクロールをロック
  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    return () => document.body.classList.remove('is-locked');
  }, [open]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.inner}`}>
          <Link to="/" className={styles.logo} aria-label="焼肉 黒耀 トップへ">
            <span className={styles.logoJa}>焼肉 黒耀</span>
            <span className={styles.logoEn}>Yakiniku Kokuyou</span>
          </Link>

          <nav className={styles.nav} aria-label="グローバルナビゲーション">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.actions}>
            <span className={styles.cta}>
              <Button to="/reserve" size="sm">ご予約</Button>
            </span>
            <button
              className={styles.hbg}
              type="button"
              aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
              aria-expanded={open}
              aria-controls="drawer"
              onClick={() => setOpen((v) => !v)}
            >
              <span className={`${styles.hbgLine} ${open ? styles.l1 : ''}`} />
              <span className={`${styles.hbgLine} ${open ? styles.l2 : ''}`} />
              <span className={`${styles.hbgLine} ${open ? styles.l3 : ''}`} />
            </button>
          </div>
        </div>
      </header>

      <nav id="drawer" className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`} aria-label="モバイルナビゲーション">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} className={styles.drawerLink}>
            {n.label}
          </NavLink>
        ))}
        <span className={styles.drawerCta}>
          <Button to="/reserve" arrow>オンラインで予約する</Button>
        </span>
      </nav>
    </>
  );
}
