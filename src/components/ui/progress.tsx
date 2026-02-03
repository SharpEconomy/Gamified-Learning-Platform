import * as React from "react";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  className?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value = 0, max = 100, className = "", ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div
        ref={ref}
        className={className}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className="h-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"
          style={{
            width: `${percentage}%`,
            transition: "width 0.3s ease-out",
          }}
        ></div>
      </div>
    );
  },
);

Progress.displayName = "Progress";

export { Progress };
