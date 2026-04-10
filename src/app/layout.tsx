// app/layout.tsx
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import type { Metadata } from "next";
import { ThemeRegistry } from "./components/ThemeRegistry";

export const metadata: Metadata = {
  title: "ドコソレ",
  description: "世界地図でうろ覚えの国を探す",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <AppRouterCacheProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
