import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './styles/global.scss';

// HashRouter を採用：静的ホスティング（GitHub Pages / file://）でも
// ページ更新時に 404 にならず、サーバ設定なしで動くため。
createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
