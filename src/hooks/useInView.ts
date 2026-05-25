import { useEffect, useRef, useState } from 'react';

// IntersectionObserver でスクロール時のフェードイン表示を制御するカスタムフック。
// 既存 Vanilla 版の「軽量フェード」を React のフックとして再実装したもの。
// prefers-reduced-motion の人には即表示してアクセシビリティに配慮する。
export function useInView<T extends HTMLElement = HTMLDivElement>(
  rootMargin = '0px 0px -10% 0px',
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }
    const ob = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
          ob.disconnect();
        }
      },
      { rootMargin, threshold: 0.1 },
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
