import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';
import { authApi } from '../lib/api';
import { auth } from '../lib/auth';

export function RegisterPage() {
  const navigate = useNavigate();
  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      auth.setToken(data.token);
      navigate('/');
    }
  });

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Create account</h1>
      <AuthForm
        mode="register"
        onSubmit={async (values) =>
          registerMutation.mutateAsync({
            email: values.email,
            password: values.password,
            displayName: values.displayName || values.email
          })
        }
      />
      <p className="text-sm text-text2">Already registered? <Link to="/login" className="text-accent">Login</Link></p>
    </div>
  );
}