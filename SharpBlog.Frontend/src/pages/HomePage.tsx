import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { PostCard } from '../components/PostCard';
import { postApi } from '../lib/api';

export function HomePage() {
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: postApi.list
  });

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-border bg-gradient-to-br from-slate-950 via-bg to-bg2 p-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">SharpBlog</p>
        <h1 className="mb-3 max-w-3xl text-4xl font-bold tracking-tight">Modern full-stack blogging with ASP.NET and React</h1>
        <p className="max-w-2xl text-text2">A frontend powered by React + TypeScript + TanStack Query, connected to your .NET 8 API.</p>
        <div className="mt-5">
          <Link to="/new" className="rounded bg-accent px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-sky-300">Write a post</Link>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-text3">Latest Posts</h2>
        {postsQuery.isLoading && <p className="text-text2">Loading posts...</p>}
        {postsQuery.isError && <p className="text-rose-400">Failed to load posts.</p>}
        <div className="grid gap-4 md:grid-cols-2">
          {postsQuery.data?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}