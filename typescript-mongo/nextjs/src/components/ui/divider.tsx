import { cn } from '@/lib';

export const Divider = ({
  orientation = 'horizontal',
  className,
}: {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}) => {
  return (
    <hr
      className={cn(
        'border-zinc-300 border-none',
        {
          'w-full h-px': orientation === 'horizontal',
          'h-full w-px': orientation === 'vertical',
        },
        className,
      )}
    />
  );
};
