import { cn } from '@/lib';
import { icons } from 'lucide-react';

export type IconNameT = keyof typeof icons;

export const FancyIcon = ({
  icon,
  iconClassname,
  containerClassname,
}: {
  icon: IconNameT;
  iconClassname?: string;
  containerClassname?: string;
}) => {
  const Icon = icons[icon];
  return (
    <div className="bg-gradient-to-br from-yellow-600 via-cyan-500 to-sky-700 rounded-full p-0.5">
      <div className={cn('bg-slate-800 rounded-full w-8 h-8 relative', containerClassname)}>
        <Icon
          className={cn(
            'w-5 h-5 text-sky-500',
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            iconClassname,
          )}
        />
      </div>
    </div>
  );
};
