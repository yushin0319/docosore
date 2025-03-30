// app/components/Home.tsx
"use client";
import { Typography } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <Typography variant="h1">ここから作る</Typography>
    </main>
  );
}
