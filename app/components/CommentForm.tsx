import { useState } from 'react';
import { Comment } from '../lib/types';

interface CommentFormProps {
  postId: string;
  onSubmit: (comment: Omit<Comment, 'id' | 'date'>) => void;
}

export default function CommentForm({ postId, onSubmit }: CommentFormProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      content,
      postId,
      author: {
        id: 'anonymous',
        name: 'Anonymous',
        avatar: '',
        badge: 'user'
      }
    });
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Write a comment..."
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
} 