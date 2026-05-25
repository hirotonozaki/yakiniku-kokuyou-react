import type { Course } from '@/types';
import { Button } from '@/components/ui/Button';
import { yen } from '@/lib/format';
import { photoStyle } from '@/lib/images';
import styles from './CourseCard.module.scss';

// コース1枚分のカード。トップのプレビューと一覧ページで再利用する。
// 写真が無い場合はサムネ部が金×黒のグラデーション代替になる。
interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className={`${styles.card} ${course.badgeType === 'popular' ? styles.featured : ''}`}>
      <div
        className={styles.thumb}
        style={photoStyle(course.imageName, 'rgba(10,8,5,.25), rgba(10,8,5,.7)')}
      >
        <span className={`${styles.badge} ${styles[course.badgeType]}`}>{course.badge}</span>
        <div className={styles.watermark}>
          <span className={styles.wmJa}>{course.rankJa}</span>
          <span className={styles.wmEn}>{course.rankEn}</span>
        </div>
      </div>

      <div className={styles.body}>
        <span className={styles.label}>{course.rankJa}コース</span>
        <h3 className={styles.name}>{course.title}</h3>
        <ul className={styles.items}>
          {course.items.map((item) => (
            <li key={item} className={styles.item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className={styles.foot}>
        <p className={styles.price}>
          {yen(course.price)}<small>／1名</small>
        </p>
        <Button to="/reserve" variant={course.badgeType === 'popular' ? 'gold' : 'outline'} size="xs">
          予約する
        </Button>
      </div>
    </article>
  );
}
