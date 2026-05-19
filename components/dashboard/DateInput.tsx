"use client";

import Flatpickr from "react-flatpickr";

export function DateInput({
  name,
  defaultValue,
  enableTime = false,
}: {
  name: string;
  defaultValue?: string;
  enableTime?: boolean;
}) {
  return (
    <Flatpickr
      name={name}
      defaultValue={defaultValue}
      options={{
        dateFormat: enableTime ? "Y-m-d H:i" : "Y-m-d",
        enableTime,
        time_24hr: true,
      }}
      className="h-[52px] w-full rounded-2xl border border-stone-200 bg-white/85 px-4 py-3 text-sm text-stone-900 shadow-[0_10px_28px_rgba(15,23,42,0.05)] outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10"
    />
  );
}
