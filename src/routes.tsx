import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { lazy, Suspense } from 'react';
import { UIPageFullLoader } from './ui/UiPageFullLoader';

const LoginPageLazy = lazy(() => import('./pages/login/Login'));
const DashboardPageLazy = lazy(() => import('./pages/dashboard/Dashboard'));

const baseRoutes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: (
          <Suspense fallback={<UIPageFullLoader />}>
            <LoginPageLazy />
          </Suspense>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <Suspense fallback={<UIPageFullLoader />}>
            <DashboardPageLazy />
          </Suspense>
        ),
      },
    ],
  },
]);

export { baseRoutes };
