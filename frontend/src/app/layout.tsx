import { ThemeProvider } from "@/components/custom/theme/Theme-provider";
import { ReactNode } from "react";
import "./globals.css";

//fonts
import { Montserrat, Bebas_Neue, DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import Head from "next/head";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-primary",
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-secondary",
  weight: ["400", "700"],
});
const BebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-logo",
  weight: "400",
});

export const metadata = {
  title: "Arday Bile ",
  description: "Bult by Zuhyb Dev",
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${(dmSans.variable, "antialiased")} ${montserrat.variable} ${BebasNeue.variable}`}>
      <Head>
        <title>Student Portal</title>
        {/* Favicon links */}
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </Head>
      <body className="font-san scroll-smooth">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}

          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
