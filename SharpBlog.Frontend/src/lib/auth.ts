import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  sub?: string;
  nameid?: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'?: string;
  email?: string;
  role?: string | string[];
};

const TOKEN_KEY = 'sharpblog_token';

export const auth = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },
  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = jwtDecode<JwtPayload>(token);
      return payload.nameid ?? payload.sub ?? payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ?? null;
    } catch {
      return null;
    }
  },
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
};