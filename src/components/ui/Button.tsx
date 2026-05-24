import type { ReactNode, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

// 共通ボタン。用途で要素を出し分ける：
//   to=…   → 内部遷移（React Router の <Link>）
//   href=… → 外部リンク（<a>。http から始まれば別タブ）
//   どちらも無し → <button>（onClick / submit 用）
// 「金スイープ」演出と3バリアント（gold / outline / text）を一元管理する。
interface ButtonProps {
  variant?: 'gold' | 'outline' | 'text';
  size?: 'md' | 'sm' | 'xs';
  children: ReactNode;
  arrow?: boolean;
  to?: string;
  href?: string;
  onClick?: MouseEventHandler;
  type?: 'button' | 'submit';
  disabled?: boolean;
  form?: string;
  className?: string;
  ariaLabel?: string;
}

function Arrow() {
  return (
    <svg className={styles.arrow} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function Button({
  variant = 'gold',
  size = 'md',
  children,
  arrow = false,
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  form,
  className = '',
  ariaLabel,
}: ButtonProps) {
  const cls = [styles.btn, styles[variant], styles[size], className].filter(Boolean).join(' ');
  const inner = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  }
  if (href) {
    const external = href.startsWith('http');
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled} form={form} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}
