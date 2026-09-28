import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bhuvan Sai — Portfolio",
  description: "Bhuvan Sai — Computer Science Engineering student focused on Software Development, Cloud Computing, DevOps and AI/ML.",
  openGraph: {
    title: "Bhuvan Sai — Portfolio",
    description: "Computer Science Engineering student — Software, Cloud, DevOps, AI/ML.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}