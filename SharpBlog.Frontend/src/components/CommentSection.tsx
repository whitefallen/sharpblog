import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { commentApi } from '../lib/api';
import { auth } from '../lib/auth';

type CommentSectionProps = {
  postId: string;
};

export function CommentSection({ postId }: CommentSectionProps) {
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');
  const currentUserId = auth.getUserId();

  const commentsQuery = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => commentApi.list(postId)
  });

  const addMutation = useMutation({
    mutationFn: () => commentApi.create(postId, { content }),
    onSuccess: () => {
      setContent('');
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId: string) => commentApi.delete(postId, commentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments', postId] })
  });

  return (
    <section className="mt-10 rounded-xl border border-border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold">Comments</h3>
      <div className="space-y-3">
        {commentsQuery.data?.map((comment) => (
          <article key={comment.id} className="rounded-lg border border-border bg-bg2 p-4">
            <div className="mb-2 flex items-center justify-between text-xs text-text3">
              <span>{new Date(comment.createdAt).toLocaleString()}</span>
              {currentUserId === comment.authorId && (
                <button
                  className="text-rose-400 hover:text-rose-300"
                  onClick={() => deleteMutation.mutate(comment.id)}
                >
                  Delete
                </button>
              )}
            </div>
            <p className="text-sm text-text2">{comment.content}</p>
          </article>
        ))}
      </div>
      {auth.isAuthenticated() ? (
        <div className="mt-4 space-y-2">
          <textarea
            className="min-h-24 w-full rounded border border-border bg-bg2 p-2.5"
            value={content}
            maxLength={1000}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Join the discussion..."
          />
          <button
            disabled={!content.trim() || addMutation.isPending}
            onClick={() => addMutation.mutate()}
            className="rounded bg-accent px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-sky-300 disabled:opacity-50"
          >
            Post comment
          </button>
        </div>
      ) : (
        <p className="mt-4 text-sm text-text3">Login to add a comment.</p>
      )}
    </section>
  );
}