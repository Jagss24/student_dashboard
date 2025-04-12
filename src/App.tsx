import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { RootState } from './app/store';
import { useEffect } from 'react';

function App() {
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  // useEffect(() => {
  //   if (!user && location.pathname !== '/login') {
  //     window.location.href = '/login';
  //   }
  // }, [user]);
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
