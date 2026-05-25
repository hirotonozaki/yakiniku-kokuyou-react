import type { Customer, SelectableCourse } from '@/types';
import { COURSE_OPTIONS } from '@/data/courses';
import styles from './CustomerForm.module.scss';

// お客様情報の入力フォーム（表示専用＝状態は親が保持）。
// バリデーションエラーは親から errors で受け取り、各項目の下に表示する。
interface CustomerFormProps {
  customer: Customer;
  errors: Partial<Record<keyof Customer, string>>;
  onChange: (patch: Partial<Customer>) => void;
}

export function CustomerForm({ customer, errors, onChange }: CustomerFormProps) {
  return (
    <div className={styles.form}>
      <div className={styles.row}>
        <div className={styles.group}>
          <label className={styles.label} htmlFor="name">お名前<span className={styles.req}>*</span></label>
          <input
            id="name" type="text" className={styles.input} placeholder="山田 太郎"
            autoComplete="name" value={customer.name}
            onChange={(e) => onChange({ name: e.target.value })}
          />
          {errors.name && <span className={styles.err}>{errors.name}</span>}
        </div>
        <div className={styles.group}>
          <label className={styles.label} htmlFor="kana">フリガナ</label>
          <input
            id="kana" type="text" className={styles.input} placeholder="ヤマダ タロウ"
            value={customer.kana} onChange={(e) => onChange({ kana: e.target.value })}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.group}>
          <label className={styles.label} htmlFor="tel">電話番号<span className={styles.req}>*</span></label>
          <input
            id="tel" type="tel" className={styles.input} placeholder="03-0000-0000"
            autoComplete="tel" value={customer.tel}
            onChange={(e) => onChange({ tel: e.target.value })}
          />
          {errors.tel && <span className={styles.err}>{errors.tel}</span>}
        </div>
        <div className={styles.group}>
          <label className={styles.label} htmlFor="email">メールアドレス<span className={styles.req}>*</span></label>
          <input
            id="email" type="email" className={styles.input} placeholder="example@mail.com"
            autoComplete="email" value={customer.email}
            onChange={(e) => onChange({ email: e.target.value })}
          />
          {errors.email && <span className={styles.err}>{errors.email}</span>}
        </div>
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor="course">ご希望コース</label>
        <div className={styles.selectWrap}>
          <select
            id="course" className={styles.select} value={customer.course}
            onChange={(e) => onChange({ course: e.target.value as SelectableCourse })}
          >
            {COURSE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor="message">ご要望・アレルギー等</label>
        <textarea
          id="message" className={styles.textarea} rows={3}
          placeholder="記念日のサプライズ、アレルギー、その他ご要望をご記入ください。"
          value={customer.message} onChange={(e) => onChange({ message: e.target.value })}
        />
      </div>

      <label className={styles.check}>
        <input type="checkbox" checked={customer.agree} onChange={(e) => onChange({ agree: e.target.checked })} />
        <span className={styles.checkBox} aria-hidden="true" />
        <span className={styles.checkText}>プライバシーポリシーに同意します<span className={styles.req}>*</span></span>
      </label>
      {errors.agree && <span className={styles.err}>{errors.agree}</span>}
    </div>
  );
}
