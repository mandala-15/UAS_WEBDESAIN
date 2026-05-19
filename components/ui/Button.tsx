import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      suppressHydrationWarning
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#0f8f68,#22c55e)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(16,185,129,0.28)] hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(16,185,129,0.34)] disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
