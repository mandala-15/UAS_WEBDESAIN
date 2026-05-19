"use client";

import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function SafeInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input suppressHydrationWarning {...props} />;
}

export function SafeTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea suppressHydrationWarning {...props} />;
}

