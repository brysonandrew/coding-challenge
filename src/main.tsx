import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Dropdown } from './dropdown';
import { MotionConfig } from 'framer-motion';

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <StrictMode>
      <MotionConfig transition={{ duration: 0.2, ease: 'linear' }}>
        <Suspense fallback={null}>
          <Dropdown />
        </Suspense>
      </MotionConfig>
    </StrictMode>
  );
}
