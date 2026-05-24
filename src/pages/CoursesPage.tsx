import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { CourseCard } from '@/components/course/CourseCard';
import { COURSES } from '@/data/courses';
import styles from './CoursesPage.module.scss';

// コース一覧ページ。トップと同じ CourseCard を再利用し、補足情報を添える。
export default function CoursesPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <SectionHeading
          label="Course Menu"
          title="コースメニュー"
          description={<>桐・竹・松の3コースをご用意。<br />※要予約 / 2名様より / 価格は税込・サービス料別</>}
        />

        <div className={styles.grid}>
          {COURSES.map((course, i) => (
            <Reveal key={course.id} delay={i * 80}>
              <CourseCard course={course} />
            </Reveal>
          ))}
        </div>

        <Reveal className={styles.note}>
          <p>
            コースは2名様より承ります。アレルギーや記念日のご要望は、ご予約時の備考欄、
            またはお電話にてお気軽にお知らせください。単品でのご利用も可能です。
          </p>
          <Button to="/reserve" arrow>このままご予約へ</Button>
        </Reveal>
      </div>
    </div>
  );
}
