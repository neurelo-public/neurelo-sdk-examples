import { cn } from '@/lib';
import { MoonLoader } from 'react-spinners';

const SpinningLoader = ({ className }: { className?: string }) => {
  return (
    <div className="w-8 h-8 flex items-center justify-center relative">
      <MoonLoader
        className={cn('block border-zinc-100', className)}
        loading
        color="#fff"
        size={20}
        aria-label="Loading Spinner"
      />
    </div>
  );
};

export default SpinningLoader;
