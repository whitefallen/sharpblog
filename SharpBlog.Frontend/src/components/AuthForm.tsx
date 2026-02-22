import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  displayName: z.string().min(2).optional()
});

type FormValues = z.infer<typeof schema>;

type AuthFormProps = {
  mode: 'login' | 'register';
  onSubmit: (values: FormValues) => Promise<unknown>;
};

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border border-border bg-card p-6">
      {mode === 'register' && (
        <div>
          <label className="mb-1 block text-sm text-text2">Display name</label>
          <input className="w-full rounded border border-border bg-bg2 p-2.5" {...register('displayName')} />
        </div>
      )}
      <div>
        <label className="mb-1 block text-sm text-text2">Email</label>
        <input className="w-full rounded border border-border bg-bg2 p-2.5" {...register('email')} />
        {errors.email && <p className="mt-1 text-xs text-rose-400">Invalid email.</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm text-text2">Password</label>
        <input type="password" className="w-full rounded border border-border bg-bg2 p-2.5" {...register('password')} />
        {errors.password && <p className="mt-1 text-xs text-rose-400">Password must be at least 8 chars.</p>}
      </div>
      <button disabled={isSubmitting} className="w-full rounded bg-accent px-4 py-2.5 font-semibold text-slate-900 hover:bg-sky-300 disabled:opacity-50">
        {isSubmitting ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create account'}
      </button>
    </form>
  );
}