import { useForm } from 'react-hook-form';

type PostEditorValues = {
  title: string;
  content: string;
};

type PostEditorProps = {
  initial?: PostEditorValues;
  onSubmit: (values: PostEditorValues) => Promise<unknown>;
  submitLabel: string;
};

export function PostEditor({ initial, onSubmit, submitLabel }: PostEditorProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<PostEditorValues>({
    defaultValues: initial ?? { title: '', content: '' }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border border-border bg-card p-6">
      <div>
        <label className="mb-1 block text-sm text-text2">Title</label>
        <input className="w-full rounded border border-border bg-bg2 p-2.5" {...register('title', { required: true, maxLength: 200 })} />
      </div>
      <div>
        <label className="mb-1 block text-sm text-text2">Content</label>
        <textarea
          className="min-h-52 w-full rounded border border-border bg-bg2 p-2.5"
          {...register('content', { required: true, maxLength: 5000 })}
        />
      </div>
      <button disabled={isSubmitting} className="rounded bg-accent px-4 py-2.5 font-semibold text-slate-900 hover:bg-sky-300 disabled:opacity-50">
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}