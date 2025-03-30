// app/layout.tsx
import { Metadata } from "next";
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
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
