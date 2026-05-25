import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ReservationProvider } from '@/context/ReservationContext';
import HomePage from '@/pages/HomePage';
import CoursesPage from '@/pages/CoursesPage';
import ReservePage from '@/pages/ReservePage';
import ConfirmPage from '@/pages/ConfirmPage';
import CompletePage from '@/pages/CompletePage';

// ルーティング定義。予約の状態（Context）はアプリ全体を包んで保持する。
export default function App() {
  return (
    <ReservationProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="reserve" element={<ReservePage />} />
          <Route path="reserve/confirm" element={<ConfirmPage />} />
          <Route path="reserve/complete" element={<CompletePage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </ReservationProvider>
  );
}
