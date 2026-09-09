import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "@/context/SettingsContext";
import { ProgressProvider } from "@/context/ProgressContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shinpuru Nihongo · シンプル日本語",
  description:
    "A self-contained JLPT N5→N4 study site: a 90-day planner with built-in lessons, drills, and mock tests.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e11" },
  ],
};

const themeScript = `
(function () {
  try {
    var s = JSON.parse(localStorage.getItem('sn.settings') || '{}');
    var theme = s.theme || 'system';
    var dark = theme === 'dark' || (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
    if (s.furigana === false) document.documentElement.classList.add('no-furigana');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${notoSansJp.variable} antialiased`}>
        <SettingsProvider>
          <ProgressProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
                {children}
              </main>
              <Footer />
            </div>
          </ProgressProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
