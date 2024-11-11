'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import CommentSection from '@/app/components/CommentSection';
import CommentForm from '@/app/components/CommentForm';
import { Comment } from '@/app/lib/types';
import { BLOG_POSTS } from '@/app/data/blogPosts';

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const resolvedParams = use(params);
  const post = BLOG_POSTS[resolvedParams.slug as keyof typeof BLOG_POSTS];

  useEffect(() => {
    if (!post) {
      router.push('/');
    }
  }, [post, router]);

  const addComment = (comment: Omit<Comment, 'id' | 'date'>) => {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setComments([...comments, newComment]);
  };

  if (!post) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-20 lg:pt-28 px-4 min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      <article className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="px-4 py-1.5 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium">
              {post.category}
            </span>
            <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readTime}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center space-x-4 text-gray-500 dark:text-gray-400">
            <time className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose dark:prose-invert prose-lg md:prose-xl mx-auto 
            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
            prose-p:text-gray-600 dark:prose-p:text-gray-300
            prose-a:text-blue-600 dark:prose-a:text-blue-400
            prose-strong:text-gray-900 dark:prose-strong:text-white
            prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20
            prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
            prose-code:text-blue-600 dark:prose-code:text-blue-400
            prose-img:rounded-xl prose-img:shadow-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 border-t dark:border-gray-700 pt-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Join the Discussion
          </h2>
          <div className="max-w-2xl mx-auto">
            <CommentForm postId={resolvedParams.slug} onSubmit={addComment} />
            <CommentSection comments={comments} />
          </div>
        </motion.div>
      </article>
    </motion.div>
  );
} 