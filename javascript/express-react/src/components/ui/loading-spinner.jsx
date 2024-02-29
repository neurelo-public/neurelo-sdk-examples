import Spinner from "@assets/bars-rotate-fade.svg";
import { cn } from "@lib";

export function LoadingSpinner({ className }) {
  return (
    <div
      className={cn(
        "w-full h-full text-center flex flex-col items-center justify-center select-none gap-6",
        className
      )}
    >
      <p className="w-full text-sm uppercase tracking-wider font-light text-yellow-500 animate-pulse duration-500 ease-in-out">
        LOADING
      </p>

      <img src={Spinner} alt="loading" width="35" height="35" />
    </div>
  );
}
