import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Comment, User } from '../lib/types';
import { Heart, MessageSquare, Trash2 } from 'lucide-react';

interface CommentSectionProps {
  comments: Comment[];
  currentUser?: User;
  onDelete?: (commentId: string) => void;
  onLike?: (commentId: string) => void;
  onReply?: (commentId: string, content: string) => void;
}

const getInitialsAvatar = (name?: string) => {
  const initials = name 
    ? name.split(' ').map(word => word[0]).join('').toUpperCase()
    : '?';
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <div className={`${randomColor} w-10 h-10 rounded-full flex items-center justify-center text-white font-medium`}>
      {initials}
    </div>
  );
};

export default function CommentSection({ 
  comments, 
  currentUser,
  onDelete,
  onLike,
  onReply 
}: CommentSectionProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const getTotalComments = (comment: Comment): number => {
    const replyCount = comment.replies?.reduce((acc, reply) => acc + getTotalComments(reply), 0) || 0;
    return 1 + replyCount;
  };

  const totalComments = comments.reduce((acc, comment) => acc + getTotalComments(comment), 0);

  return (
    <div className="space-y-6 mt-8">
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {totalComments} {totalComments === 1 ? 'Comment' : 'Comments'}
      </div>
      {comments.map((comment) => (
        <motion.div
          key={comment.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all hover:shadow-md"
        >
          <div className="flex items-start space-x-4">
            {getInitialsAvatar(comment.author.name)}
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {comment.author.name}
                  </h4>
                  {comment.author.badge && (
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                      {comment.author.badge}
                    </span>
                  )}
                </div>
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(comment.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </time>
              </div>

              <div className="mt-2 prose-sm prose dark:prose-invert">
                {comment.replyTo && (
                  <div className="pl-4 mb-2 border-l-2 border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Replying to <span className="font-medium">{comment.replyTo}</span>
                    </p>
                  </div>
                )}
                <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
              </div>

              <div className="mt-4 flex items-center space-x-4">
                <button
                  onClick={() => onLike?.(comment.id)}
                  className={`flex items-center space-x-1 text-sm ${
                    comment.liked
                      ? 'text-pink-600 dark:text-pink-400'
                      : 'text-gray-500 dark:text-gray-400'
                  } hover:text-pink-600 dark:hover:text-pink-400 transition-colors`}
                >
                  <Heart className="w-4 h-4" />
                  <span>{comment.likes || 0}</span>
                </button>

                <button
                  onClick={() => setReplyingTo(comment.id)}
                  className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Reply</span>
                </button>

                {currentUser?.id === comment.author.id && (
                  <button
                    onClick={() => onDelete?.(comment.id)}
                    className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                )}
              </div>

              <AnimatePresence>
                {replyingTo === comment.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <div className="flex space-x-4">
                      {currentUser && getInitialsAvatar(currentUser.name)}
                      <div className="flex-1">
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Write a reply..."
                          className="w-full px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          rows={3}
                        />
                        <div className="mt-2 flex justify-end space-x-2">
                          <button
                            onClick={() => setReplyingTo(null)}
                            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              onReply?.(comment.id, replyContent);
                              setReplyContent('');
                              setReplyingTo(null);
                            }}
                            disabled={!replyContent.trim()}
                            className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Nested replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 ml-6 space-y-4 border-l-2 border-gray-100 dark:border-gray-700 pl-4">
                  {comment.replies.map((reply) => (
                    // Recursive rendering of nested comments
                    <CommentSection
                      key={reply.id}
                      comments={[reply]}
                      currentUser={currentUser}
                      onDelete={onDelete}
                      onLike={onLike}
                      onReply={onReply}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 