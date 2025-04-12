import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '@/features/auth/authSlice';

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as 'admin' | 'student';

    if (!username || !password || !role) return alert('Fill all fields');

    dispatch(login({ user: username, role }));
    navigate('/dashboard');
  };

  return { functions: { handleSubmit } };
};
