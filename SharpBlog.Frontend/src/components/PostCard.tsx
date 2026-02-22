import { Link } from 'react-router-dom';
import type { Post } from '../lib/types';

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-xl border border-border bg-card p-5 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:border-accent/40">
      <p className="mb-2 text-xs text-text3">{new Date(post.createdAt).toLocaleString()}</p>
      <h2 className="mb-3 text-xl font-semibold tracking-tight text-text">{post.title}</h2>
      <p className="mb-4 line-clamp-3 text-sm leading-7 text-text2">{post.content}</p>
      <Link to={`/posts/${post.id}`} className="text-sm font-semibold text-accent hover:text-sky-300">
        Read article →
      </Link>
    </article>
  );
}