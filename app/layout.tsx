import "./globals.css";
import type { Metadata } from "next";
import { I18nProvider } from "@/components/I18nProvider";

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
    <html lang="fr" className="scroll-smooth">
      <body className="font-sans">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
