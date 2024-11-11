interface AvatarProps {
  src?: string;
  alt: string;
  className?: string;
}

export function Avatar({ src, alt, className }: AvatarProps) {
  return (
    <img 
      src={src || '/default-avatar.png'} 
      alt={alt}
      className={className}
    />
  );
} 