import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { PostEditor } from '../components/PostEditor';
import { postApi } from '../lib/api';
import { auth } from '../lib/auth';

export function NewPostPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: postApi.create,
    onSuccess: (post) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate(`/posts/${post.id}`);
    }
  });

  if (!auth.isAuthenticated()) {
    return <p className="text-text2">Please login first.</p>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-3xl font-bold tracking-tight">Create new post</h1>
      <PostEditor submitLabel="Publish post" onSubmit={async (values) => createMutation.mutateAsync(values)} />
    </div>
  );
}