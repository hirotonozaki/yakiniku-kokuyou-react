import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { CourseCard } from '@/components/course/CourseCard';
import { COURSES } from '@/data/courses';
import styles from './CoursePreview.module.scss';

// トップのコース紹介。共通の CourseCard を使い、一覧ページと見た目を統一。
export function CoursePreview() {
  return (
    <section className={styles.section} id="course">
      <div className="container">
        <SectionHeading
          label="Course Menu"
          title="コースメニュー"
          description={<>接待・記念日・特別な会食に。<br />※要予約 / 2名様より / 価格は税込・サービス料別</>}
        />
        <div className={styles.grid}>
          {COURSES.map((course, i) => (
            <Reveal key={course.id} delay={i * 80}>
              <CourseCard course={course} />
            </Reveal>
          ))}
        </div>
        <Reveal className={styles.more}>
          <Button to="/courses" variant="outline" arrow>コースを詳しく見る</Button>
        </Reveal>
      </div>
    </section>
  );
}
