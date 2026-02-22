import axios from 'axios';
import type { AuthResponse, Comment, LoginRequest, Post, RegisterRequest } from './types';

const api = axios.create({
  baseURL: '/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sharpblog_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  async register(payload: RegisterRequest): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/register', payload);
    return data;
  },
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', payload);
    return data;
  }
};

export const postApi = {
  async list(): Promise<Post[]> {
    const { data } = await api.get<Post[]>('/posts');
    return data;
  },
  async getById(id: string): Promise<Post> {
    const { data } = await api.get<Post>(`/posts/${id}`);
    return data;
  },
  async create(payload: { title: string; content: string }): Promise<Post> {
    const { data } = await api.post<Post>('/posts', payload);
    return data;
  },
  async update(id: string, payload: { title: string; content: string }): Promise<void> {
    await api.put(`/posts/${id}`, payload);
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/posts/${id}`);
  }
};

export const commentApi = {
  async list(postId: string): Promise<Comment[]> {
    const { data } = await api.get<Comment[]>(`/posts/${postId}/comments`);
    return data;
  },
  async create(postId: string, payload: { content: string }): Promise<Comment> {
    const { data } = await api.post<Comment>(`/posts/${postId}/comments`, payload);
    return data;
  },
  async delete(postId: string, commentId: string): Promise<void> {
    await api.delete(`/posts/${postId}/comments/${commentId}`);
  }
};