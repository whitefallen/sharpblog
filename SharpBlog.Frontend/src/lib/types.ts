export type AuthResponse = {
  token: string;
  expiresAt: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  authorId: string;
};

export type Comment = {
  id: string;
  postId: string;
  content: string;
  createdAt: string;
  authorId: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  displayName: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};