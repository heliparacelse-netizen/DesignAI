import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DesignAI | Interior Intelligence",
  description: "DesignAI helps you reimagine any room with AI-powered interior design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans">{children}</body>
    </html>
  );
}
