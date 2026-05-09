import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "FlamingoMedia CMS",
    template: "%s | FlamingoMedia CMS"
  },
  description:
    "CMS-getriebenes Multi-Tenant-System für hochwertige Kunden-Websites."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
