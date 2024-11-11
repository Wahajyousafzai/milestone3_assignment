export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  content: string;
  date: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    badge?: string;
  };
  likes?: number;
  liked?: boolean;
  replyTo?: string;
  replies?: Comment[];
  postId: string;
} 