import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navigation } from "@/components/layout/navigation";
import { Chatbot } from "@/components/chatbot";
import Footer from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "AI-Native Driven Development",
  description: "Master the art of building AI-native applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          {children}
          <Chatbot />
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
