"use client";

import dynamic from "next/dynamic";

export const SafeInputNoSsr = dynamic(
  () => import("./SafeFields").then((mod) => mod.SafeInput),
  { ssr: false },
);

export const SafeTextareaNoSsr = dynamic(
  () => import("./SafeFields").then((mod) => mod.SafeTextarea),
  { ssr: false },
);

