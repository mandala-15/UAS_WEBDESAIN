"use client";

import dynamic from "next/dynamic";

export const LogoutButtonNoSsr = dynamic(
  () => import("./LogoutButton").then((mod) => mod.LogoutButton),
  { ssr: false },
);

