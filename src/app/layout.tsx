import type { Metadata } from "next";
import { Baloo_2, JetBrains_Mono, Quicksand } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FytCyte",
  description: "Build your portfolio through paid and TFP collaborations.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${baloo.variable} ${jetbrainsMono.variable} ${quicksand.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <div className="grain" />
        <SiteHeader />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
