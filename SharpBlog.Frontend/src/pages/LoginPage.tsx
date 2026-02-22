import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';
import { authApi } from '../lib/api';
import { auth } from '../lib/auth';

export function LoginPage() {
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      auth.setToken(data.token);
      navigate('/');
    }
  });

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
      <AuthForm
        mode="login"
        onSubmit={async (values) => loginMutation.mutateAsync({ email: values.email, password: values.password })}
      />
      <p className="text-sm text-text2">No account yet? <Link to="/register" className="text-accent">Register</Link></p>
    </div>
  );
}