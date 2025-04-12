import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';

export const useCheckPermissions = () => {
  const { role } = useSelector((state: RootState) => state.auth);

  const isAdmin = role === 'admin';
  console.log({ role });
  return { states: { isAdmin } };
};
