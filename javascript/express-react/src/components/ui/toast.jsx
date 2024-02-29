import reactHotToast from "react-hot-toast";
import { cn } from "../../lib";
import { CheckCircle2Icon, AlertCircleIcon, XCircleIcon } from "lucide-react";

function ToastCard({ message, type }) {
  return (
    <div
      className={cn(
        `py-2 px-3.5 rounded-md text-sm font-normal border-[0.75px] gap-3
        flex flex-nowrap items-start`,
        {
          "bg-emerald-900 text-emerald-200 border-emerald-500":
            type === "success",
          "bg-red-900 text-red-200 border-red-500": type === "error",
          "bg-yellow-900 text-yellow-200 border-yellow-500": type === "warning",
        }
      )}
    >
      <div className="h-full flex items-center justify-center">
        {type === "success" && (
          <CheckCircle2Icon className="w-5 h-5 text-emerald-400" />
        )}
        {type === "error" && <XCircleIcon className="w-5 h-5 text-red-400" />}
        {type === "warning" && (
          <AlertCircleIcon className="w-5 h-5 text-yellow-400" />
        )}
      </div>
      {message}
    </div>
  );
}

export const toast = {
  success: (message) =>
    reactHotToast.custom(<ToastCard message={message} type="success" />),
  error: (message) =>
    reactHotToast.custom(<ToastCard message={message} type="error" />),
  warning: (message) =>
    reactHotToast.custom(<ToastCard message={message} type="warning" />),
};
