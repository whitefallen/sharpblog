import { Link, NavLink } from 'react-router-dom';
import { auth } from '../lib/auth';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const isAuthed = auth.isAuthenticated();

  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-bg/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight">
            <span className="rounded-md bg-gradient-to-br from-sky-400 to-indigo-500 px-2 py-1 text-xs">S</span>
            SharpBlog
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <NavLink to="/" className="rounded px-3 py-2 text-text2 hover:bg-bg2 hover:text-text">Posts</NavLink>
            {isAuthed && <NavLink to="/new" className="rounded px-3 py-2 text-text2 hover:bg-bg2 hover:text-text">Write</NavLink>}
            {!isAuthed && (
              <>
                <NavLink to="/login" className="rounded px-3 py-2 text-text2 hover:bg-bg2 hover:text-text">Login</NavLink>
                <NavLink to="/register" className="rounded border border-accent/40 bg-accent/10 px-3 py-2 text-accent hover:bg-accent/20">Register</NavLink>
              </>
            )}
            {isAuthed && (
              <button
                className="rounded border border-border bg-card px-3 py-2 text-text2 hover:text-text"
                onClick={() => {
                  auth.logout();
                  window.location.href = '/';
                }}
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}