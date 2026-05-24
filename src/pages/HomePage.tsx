import { Hero } from '@/components/home/Hero';
import { Concept } from '@/components/home/Concept';
import { CoursePreview } from '@/components/home/CoursePreview';
import { ReserveCta } from '@/components/home/ReserveCta';

// トップページ：Hero → こだわり → コース → 予約CTA の縦構成。
export default function HomePage() {
  return (
    <>
      <Hero />
      <Concept />
      <CoursePreview />
      <ReserveCta />
    </>
  );
}
