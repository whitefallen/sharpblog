import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { CommentSection } from '../components/CommentSection';
import { PostEditor } from '../components/PostEditor';
import { postApi } from '../lib/api';
import { auth } from '../lib/auth';
import { useState } from 'react';

export function PostDetailPage() {
  const { postId = '' } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);

  const postQuery = useQuery({
    queryKey: ['post', postId],
    queryFn: () => postApi.getById(postId),
    enabled: !!postId
  });

  const updateMutation = useMutation({
    mutationFn: (values: { title: string; content: string }) => postApi.update(postId, values),
    onSuccess: () => {
      setEditing(false);
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: () => postApi.delete(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/');
    }
  });

  if (postQuery.isLoading) return <p className="text-text2">Loading...</p>;
  if (postQuery.isError || !postQuery.data) return <p className="text-rose-400">Post not found.</p>;

  const canManage = auth.isAuthenticated() && auth.getUserId() === postQuery.data.authorId;

  return (
    <article className="mx-auto max-w-3xl">
      {!editing ? (
        <>
          <p className="mb-3 text-sm text-text3">{new Date(postQuery.data.createdAt).toLocaleString()}</p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight">{postQuery.data.title}</h1>
          <p className="whitespace-pre-wrap text-base leading-8 text-text2">{postQuery.data.content}</p>
          {canManage && (
            <div className="mt-6 flex gap-3">
              <button className="rounded border border-border bg-card px-3 py-2 text-sm" onClick={() => setEditing(true)}>Edit</button>
              <button className="rounded border border-rose-400/50 bg-rose-500/10 px-3 py-2 text-sm text-rose-300" onClick={() => deleteMutation.mutate()}>
                Delete
              </button>
            </div>
          )}
        </>
      ) : (
        <PostEditor
          initial={{ title: postQuery.data.title, content: postQuery.data.content }}
          submitLabel="Update post"
          onSubmit={async (values) => updateMutation.mutateAsync(values)}
        />
      )}

      <CommentSection postId={postId} />
    </article>
  );
}