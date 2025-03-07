import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Dropdown } from './dropdown';

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <StrictMode>
      <Suspense fallback={null}>
        <Dropdown />
      </Suspense>
    </StrictMode>
  );
}
